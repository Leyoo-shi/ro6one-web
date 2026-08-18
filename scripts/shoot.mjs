#!/usr/bin/env node
/**
 * Rendered screenshots at chosen scroll positions.
 *
 *   node scripts/shoot.mjs <url> <outDir> [--w 1440] [--h 900] [--at 0,600,1800]
 *                          [--wait 2500] [--full] [--motion] [--label name]
 *
 * Drives the installed Chrome over the DevTools protocol using Node's built-in
 * WebSocket — no Playwright, no Puppeteer, nothing added to the project.
 * Development tool only; it is not imported by the app.
 *
 * --motion keeps animations running (default freezes them after settling so the
 * capture is deterministic); --full captures the whole page height.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const args = process.argv.slice(2);
const url = args[0];
const outDir = args[1];

if (!url || !outDir) {
	console.error('usage: node scripts/shoot.mjs <url> <outDir> [options]');
	process.exit(1);
}

const flag = (name, fallback) => {
	const index = args.indexOf(`--${name}`);
	return index === -1 ? fallback : args[index + 1];
};
const has = (name) => args.includes(`--${name}`);

const width = Number(flag('w', 1440));
const height = Number(flag('h', 900));
const wait = Number(flag('wait', 2500));
const label = flag('label', 'shot');
const positions = String(flag('at', '0'))
	.split(',')
	.map((value) => (value.trim().startsWith('el:') ? value.trim() : Number(value.trim())));

const PORT = 9222 + Math.floor(Math.random() * 400);

const chrome = spawn(
	'google-chrome',
	[
		'--headless=new',
		'--disable-gpu',
		'--no-sandbox',
		'--hide-scrollbars',
		'--force-color-profile=srgb',
		'--force-device-scale-factor=1',
		`--remote-debugging-port=${PORT}`,
		`--user-data-dir=/tmp/claude-1000/chrome-shoot-${PORT}`,
		`--window-size=${width},${height}`,
		'about:blank'
	],
	{ stdio: 'ignore' }
);

const endpoint = await (async () => {
	for (let attempt = 0; attempt < 60; attempt++) {
		try {
			const response = await fetch(`http://127.0.0.1:${PORT}/json/version`);
			return (await response.json()).webSocketDebuggerUrl;
		} catch {
			await sleep(250);
		}
	}
	throw new Error('Chrome did not expose a debugging endpoint');
})();

const socket = new WebSocket(endpoint);
await new Promise((resolve, reject) => {
	socket.addEventListener('open', resolve, { once: true });
	socket.addEventListener('error', reject, { once: true });
});

let messageId = 0;
const pending = new Map();

socket.addEventListener('message', (event) => {
	const message = JSON.parse(event.data);
	const entry = pending.get(message.id);

	if (entry) {
		pending.delete(message.id);
		if (message.error) entry.reject(new Error(message.error.message));
		else entry.resolve(message.result);
	}
});

const send = (method, params = {}, sessionId) =>
	new Promise((resolve, reject) => {
		const id = ++messageId;
		pending.set(id, { resolve, reject });
		socket.send(JSON.stringify({ id, method, params, sessionId }));
	});

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

const call = (method, params) => send(method, params, sessionId);

await call('Page.enable');
await call('Runtime.enable');
await call('Emulation.setDeviceMetricsOverride', {
	width,
	height,
	deviceScaleFactor: 1,
	mobile: width < 700
});

await call('Page.navigate', { url });
await sleep(wait);

const evaluateRaw = async (expression) => {
	const { result } = await call('Runtime.evaluate', { expression, returnByValue: true });
	return result.value;
};

const evaluate = evaluateRaw;

await evaluate("document.documentElement.style.scrollBehavior = 'auto'");

/*
 * Freeze animation by default: a screenshot of a page mid-transition tells you
 * nothing reliable about the design. --motion opts out when the entrance itself
 * is what is being inspected.
 */
if (!has('motion')) {
	await evaluate(`
		document.querySelectorAll('*').forEach((node) => {
			node.style.animationPlayState = 'paused';
		});
	`);
}

/* --js runs an expression before capturing, so interaction states can be shot. */
const script = flag('js', '');

if (script) {
	await evaluate(script);
	await sleep(700);
}

await mkdir(outDir, { recursive: true });

const pageHeight = await evaluate('document.documentElement.scrollHeight');
console.log(`page height: ${pageHeight}px`);

const capture = async (name) => {
	const { data } = await call('Page.captureScreenshot', {
		format: 'png',
		captureBeyondViewport: false
	});
	const file = `${outDir}/${name}.png`;
	await writeFile(file, Buffer.from(data, 'base64'));
	console.log(`  ${file}`);
};

if (has('full')) {
	await call('Emulation.setDeviceMetricsOverride', {
		width,
		height: Math.min(pageHeight, 16000),
		deviceScaleFactor: 1,
		mobile: width < 700
	});
	await sleep(800);
	await capture(`${label}-full`);
} else {
	for (const position of positions) {
		/* `--at el:.selector` scrolls to an element instead of a pixel offset. */
		if (typeof position === 'string' && position.startsWith('el:')) {
			await evaluate(
				`(() => { const el = document.querySelector(${JSON.stringify(position.slice(3))});` +
					` if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 110); })()`
			);
		} else {
			await evaluate(`window.scrollTo(0, ${position})`);
		}
		await sleep(has('motion') ? 900 : 650);
		await capture(`${label}-${String(position).replace(/[^\w-]/g, '')}`);
	}
}

socket.close();
chrome.kill();
process.exit(0);
