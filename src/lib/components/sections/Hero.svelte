<script lang="ts">
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.hero);

	/*
	 * FIRST LIGHT.
	 *
	 * The mark is a wildcat head built out of waves. The hero treats it as a
	 * physical object in a dark room: the room lights, a sweep of light crosses
	 * the metal of the mark, the sentence assembles around it, and the facts
	 * strike in along the floor.
	 *
	 * Then the first scroll docks it: the mark shrinks and travels to the top
	 * left, arriving exactly where the header lockup lives. The page does not
	 * "end and reveal the next rectangle" — the hero hands its own logo to the
	 * navigation and opens behind it.
	 */
	let hero = $state<HTMLElement | null>(null);
	let dock = $state(0);

	$effect(() => {
		const element = hero;

		if (!element) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;

		const update = () => {
			frame = 0;
			const travel = element.offsetHeight * 0.72;
			dock = Math.min(Math.max(window.scrollY / travel, 0), 1);
		};

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', update, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', update);
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<section bind:this={hero} class="hero" style="--dock: {dock}">
	<!-- The room: a claret floor, a blue key light, both moving on their own. -->
	<div class="hero__field" aria-hidden="true">
		<span class="hero__glow hero__glow--blue"></span>
		<span class="hero__glow hero__glow--claret"></span>
		<span class="hero__grain"></span>
	</div>

	<!-- The object. Decorative: the wordmark below carries the name. -->
	<div class="hero__object" aria-hidden="true">
		<img class="hero__mark" src="/media/brand/mark-256.png" alt="" width="256" height="256" />
		<span class="hero__sweep"></span>
	</div>

	<div class="shell hero__content">
		<p class="hero__eyebrow">
			<span class="hero__dot" aria-hidden="true"></span>
			{site.legalName}
			<span class="hero__eyebrow-rule" aria-hidden="true"></span>
			{site.teamLabel}
		</p>

		<h1 class="hero__title">
			<span class="hero__line hero__line--one">
				<span>{copy.titleTop}</span>
			</span>
			<span class="hero__line hero__line--two">
				<span class="hero__accent">{copy.titleBottom}</span>
			</span>
		</h1>

		<p class="hero__description">{copy.description}</p>
	</div>

	<!-- The floor: three struck facts and the way down. -->
	<div class="shell hero__strip">
		<dl class="strip">
			<div class="strip__cell" style="--cell: 0">
				<dt>{copy.meta.founded}</dt>
				<dd>{copy.meta.foundedValue}</dd>
			</div>
			<div class="strip__cell" style="--cell: 1">
				<dt>{copy.meta.home}</dt>
				<dd>{site.school}</dd>
			</div>
			<div class="strip__cell strip__cell--live" style="--cell: 2">
				<dt>{copy.meta.next}</dt>
				<dd>{copy.meta.nextValue}</dd>
			</div>
		</dl>

		<a class="hero__scroll" href="#today">
			<span>{copy.scroll}</span>
			<span class="hero__scroll-rail" aria-hidden="true"><span></span></span>
		</a>
	</div>
</section>

<style>
	.hero {
		position: relative;
		display: grid;
		grid-template-rows: 1fr auto;
		align-content: end;

		min-height: 100svh;
		padding: calc(var(--header-height) + clamp(1.5rem, 4vh, 3rem)) 0 clamp(1.25rem, 3vh, 2rem);
		overflow: hidden;
		isolation: isolate;

		background: var(--ink-blue);
		color: var(--text-primary);
	}

	/* ---------------------------------------------------------------- room */

	.hero__field {
		position: absolute;
		inset: 0;
		z-index: -2;
	}

	.hero__glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0;
		animation: glow-in 1.6s var(--ease-out) forwards;
	}

	/* Key light: the logo's blue, top left, wide. */
	.hero__glow--blue {
		inset: -30% 30% 20% -25%;
		background: radial-gradient(closest-side, rgb(63 143 216 / 0.55), transparent 72%);
	}

	/* Floor light: claret, low right, the warmer half of the club's colours. */
	.hero__glow--claret {
		inset: 35% -25% -35% 25%;
		background: radial-gradient(closest-side, rgb(160 40 72 / 0.72), transparent 72%);
		animation-delay: 0.25s;
	}

	.hero__grain {
		position: absolute;
		inset: 0;
		opacity: 0.6;
		background-image: repeating-linear-gradient(
			122deg,
			rgb(244 244 242 / 0.014) 0 1px,
			transparent 1px 3px
		);
	}

	/* -------------------------------------------------------------- object */

	.hero__object {
		position: absolute;
		z-index: -1;

		/*
		 * Docking: from the right of the room to the header lockup at the top
		 * left. One interpolation drives position and size.
		 *
		 * With translate(50%, -50%) the centre lands at (100% - right, top), so
		 * both endpoints are written as the centre we actually want:
		 *
		 *   start  right: 21%  -> the whole head sits inside the viewport.
		 *          At 9% the frame cut straight through the open jaw and fangs,
		 *          which is the whole character of the mark, and read as the
		 *          object sliding off the page rather than being placed.
		 *   dock   100% - gutter - 0.9rem  -> the centre of the header's own
		 *          logo (gutter + half of its 1.85rem width), and top at half
		 *          the header height. Previously it converged ~250px to the
		 *          right of the lockup and travelled straight through the nav.
		 */
		top: calc(41% - (41% - var(--header-height) / 2) * var(--dock));
		right: calc(21% + (79% - var(--shell-gutter) - 0.9rem) * var(--dock));
		width: clamp(18rem, 37vw, 33rem);

		/* 1.85rem / 33rem — the docked mark ends the size of the header logo. */
		transform: translate(50%, -50%) scale(calc(1 - 0.944 * var(--dock)));
		/* Fades as it arrives, so the header logo takes over instead of doubling. */
		opacity: calc(1 - 0.85 * var(--dock));

		animation: object-in 1.5s var(--ease-material) 0.25s both;
	}

	.hero__mark {
		width: 100%;
		height: auto;
		filter: drop-shadow(0 30px 60px rgb(4 8 18 / 0.75));
	}

	/* A single pass of light across the object, once, as the room comes up. */
	.hero__sweep {
		position: absolute;
		inset: -10%;
		background: linear-gradient(
			104deg,
			transparent 38%,
			rgb(116 186 244 / 0.5) 48%,
			rgb(255 255 255 / 0.42) 52%,
			transparent 62%
		);
		mix-blend-mode: screen;
		opacity: 0;
		transform: translateX(-40%);
		animation: sweep 1.5s var(--ease-in-out) 0.75s;
	}

	/* ------------------------------------------------------------- content */

	.hero__content {
		position: relative;
		display: grid;
		align-content: end;
		gap: clamp(1rem, 2vw, 1.75rem);
		padding-bottom: clamp(2rem, 6vh, 5rem);
	}

	.hero__eyebrow {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);

		opacity: 0;
		animation: rise 0.9s var(--ease-out) 0.9s forwards;
	}

	.hero__dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--blue-bright);
		box-shadow: 0 0 12px rgb(116 186 244 / 0.9);
	}

	.hero__eyebrow-rule {
		width: clamp(1.5rem, 4vw, 3.5rem);
		height: 1px;
		background: linear-gradient(to right, var(--blue), transparent);
	}

	/*
	 * Two voices in one sentence: the statement in the site's grotesque, the
	 * turn of the sentence in a display serif and in the logo's blue.
	 */
	.hero__title {
		max-width: 14ch;
		font-size: clamp(3.2rem, 9.5vw, 9rem);
		font-weight: 600;
		line-height: 0.88;
		letter-spacing: var(--tracking-display);
	}

	.hero__line {
		display: block;
		overflow: hidden;
	}

	.hero__line > span {
		display: block;
		transform: translateY(110%);
		animation: line-up 1.15s var(--ease-material) forwards;
	}

	.hero__line--one > span {
		animation-delay: 1.05s;
	}

	.hero__line--two {
		margin-left: 0.3em;
	}

	.hero__line--two > span {
		animation-delay: 1.2s;
	}

	.hero__accent {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		letter-spacing: -0.02em;

		background: linear-gradient(100deg, var(--blue-bright), #b9dcff 55%, var(--blue));
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	.hero__description {
		max-width: 34rem;
		font-size: var(--type-body-lg);
		line-height: 1.55;
		color: var(--text-secondary);

		opacity: 0;
		animation: rise 0.9s var(--ease-out) 1.75s forwards;
	}

	/* --------------------------------------------------------------- floor */

	.hero__strip {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m);

		padding-top: clamp(1rem, 2vw, 1.5rem);
	}

	.hero__strip::before {
		content: '';
		position: absolute;
		inset: 0 var(--shell-gutter) auto;
		height: 1px;
		background: linear-gradient(to right, var(--blue), rgb(141 36 64 / 0.7) 60%, transparent);

		transform: scaleX(0);
		transform-origin: left;
		animation: draw 1.4s var(--ease-material) 1.9s forwards;
	}

	.strip {
		display: flex;
		margin: 0;
	}

	.strip__cell {
		padding-inline: clamp(0.85rem, 2.2vw, 2rem);
		border-left: 1px solid var(--edge-faint);

		opacity: 0;
		animation: rise 0.7s var(--ease-out) forwards;
		animation-delay: calc(2.05s + var(--cell) * 0.09s);
	}

	.strip__cell:first-child {
		padding-left: 0;
		border-left: 0;
	}

	.strip__cell dt {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.strip__cell dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		font-weight: 500;
		color: var(--text-primary);
	}

	.strip__cell--live dd {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--blue-bright);
	}

	.strip__cell--live dd::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: currentColor;
		box-shadow: 0 0 10px currentColor;
	}

	.hero__scroll {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding-bottom: 0.15rem;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);

		opacity: 0;
		animation: rise 0.7s var(--ease-out) 2.35s forwards;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.hero__scroll:hover {
		color: var(--text-primary);
	}

	.hero__scroll-rail {
		position: relative;
		width: 3.5rem;
		height: 1px;
		background: var(--edge);
		overflow: hidden;
	}

	.hero__scroll-rail span {
		position: absolute;
		inset: 0 auto 0 0;
		width: 40%;
		background: var(--blue-bright);
		animation: travel 2.6s var(--ease-in-out) infinite;
	}

	/* ------------------------------------------------------------ entrance */

	@keyframes glow-in {
		to {
			opacity: 1;
		}
	}

	@keyframes object-in {
		from {
			opacity: 0;
			transform: translate(50%, -50%) scale(1.14);
			filter: blur(14px);
		}
	}

	@keyframes sweep {
		0% {
			opacity: 0;
			transform: translateX(-45%);
		}

		35% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: translateX(45%);
		}
	}

	@keyframes line-up {
		to {
			transform: translateY(0);
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(0.9rem);
		}

		to {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes draw {
		to {
			transform: scaleX(1);
		}
	}

	@keyframes travel {
		0% {
			transform: translateX(-100%);
		}

		60%,
		100% {
			transform: translateX(250%);
		}
	}

	/* ---------------------------------------------------------- responsive */

	@media (max-width: 900px) {
		/*
		 * Mobile is its own composition, not the desktop one scaled. At right:
		 * -8% roughly seventy percent of the mark hung off the screen and all
		 * that survived was a few mane curls, which read as a rendering fault.
		 * It now sits whole in the upper right above the statement, smaller so
		 * it never competes with the headline for the same space.
		 */
		.hero__object {
			top: calc(27% - (27% - var(--header-height) / 2) * var(--dock));
			right: calc(29% + (71% - var(--shell-gutter) - 0.75rem) * var(--dock));
			width: clamp(11rem, 47vw, 18rem);
			/* 1.5rem / 18rem — the header logo's floor size on small screens. */
			transform: translate(50%, -50%) scale(calc(1 - 0.917 * var(--dock)));
			opacity: calc(0.92 - 0.8 * var(--dock));
		}

		.hero__title {
			max-width: none;
		}

		.hero__strip {
			flex-direction: column-reverse;
			align-items: flex-start;
			gap: var(--space-m);
		}

		.strip {
			width: 100%;
			justify-content: space-between;
		}

		.strip__cell {
			padding-inline: 0 clamp(0.5rem, 3vw, 1.25rem);
			border-left: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero__glow,
		.hero__object,
		.hero__eyebrow,
		.hero__description,
		.strip__cell,
		.hero__scroll {
			opacity: 1;
			animation: none;
		}

		.hero__object {
			transform: translate(50%, -50%);
		}

		.hero__line > span {
			transform: none;
			animation: none;
		}

		.hero__sweep,
		.hero__scroll-rail span {
			display: none;
		}

		.hero__strip::before {
			transform: scaleX(1);
			animation: none;
		}
	}
</style>
