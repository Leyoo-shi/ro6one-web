<script lang="ts">
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.monolith);

	/*
	 * The team number cast into the page as a block of dark material: the
	 * numerals are cut *into* the surface (light under the edge, shadow above),
	 * and a slow sheen passes over them as the pointer moves.
	 *
	 * The last four digits carry a fractionally brighter edge. Nothing in the
	 * copy points at it — the number was assigned, not chosen, and any further
	 * meaning is for the reader to notice or not.
	 */
	let band = $state<HTMLElement | null>(null);
	let x = $state(50);
	let y = $state(38);

	$effect(() => {
		const element = band;

		if (!element) return;
		if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		let pendingX = x;
		let pendingY = y;

		const apply = () => {
			frame = 0;
			x = pendingX;
			y = pendingY;
		};

		const onMove = (event: PointerEvent) => {
			const rect = element.getBoundingClientRect();

			pendingX = ((event.clientX - rect.left) / rect.width) * 100;
			pendingY = ((event.clientY - rect.top) / rect.height) * 100;

			if (!frame) frame = requestAnimationFrame(apply);
		};

		element.addEventListener('pointermove', onMove, { passive: true });

		return () => {
			element.removeEventListener('pointermove', onMove);
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<section class="monolith" bind:this={band} style="--mx: {x}%; --my: {y}%">
	<div class="shell monolith__inner">
		<!-- Chapter 04 of the homepage: the hinge between history and system. -->
		<p class="label monolith__label">
			<span class="monolith__index">04</span>
			<span>{copy.label}</span>
		</p>

		<div class="monolith__stage">
			<span class="digits digits--cut" aria-hidden="true">
				1<span class="digits__echo">1919</span>
			</span>
			<span class="digits digits--sheen" aria-hidden="true">
				1<span class="digits__echo">1919</span>
			</span>
			<p class="monolith__reader">FRC {site.teamNumber}</p>
		</div>

		<div class="monolith__foot">
			<p class="monolith__assigned">{copy.assigned}</p>
			<p class="monolith__pivot">{copy.pivot}</p>
		</div>
	</div>
</section>

<style>
	.monolith {
		position: relative;
		overflow: hidden;
		isolation: isolate;

		padding-block: var(--space-3xl);
		background:
			radial-gradient(140% 90% at var(--mx) 0%, rgb(35 64 95 / 0.16), transparent 60%),
			linear-gradient(180deg, var(--surface-void), #0a0a0c 55%, var(--surface-void));
	}

	/* Light caught on the top edge of the block: burgundy one side, navy the other. */
	.monolith::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 1px;

		background: linear-gradient(
			to right,
			transparent,
			var(--edge-burgundy) 22%,
			rgb(244 244 242 / 0.16) 50%,
			var(--edge-navy) 78%,
			transparent
		);
	}

	/* A single seam across the cast surface. Not a crack — a mould line. */
	.monolith::after {
		content: '';
		position: absolute;
		inset: -20% -10%;
		z-index: 1;
		pointer-events: none;

		background: linear-gradient(
			104deg,
			transparent calc(50% - 0.5px),
			rgb(244 244 242 / 0.05) 50%,
			transparent calc(50% + 0.5px)
		);
	}

	.monolith__inner {
		position: relative;
		z-index: 2;
	}

	.monolith__label {
		display: flex;
		align-items: baseline;
		gap: clamp(1.25rem, 4vw, 3rem);
		margin-bottom: var(--space-m);
	}

	.monolith__index {
		color: var(--text-faint);
	}

	.monolith__stage {
		position: relative;
		/* The numerals run wider than the shell and are cropped by the band. */
		margin-inline: calc(var(--shell-gutter) * -0.5);
	}

	.digits {
		display: block;
		font-family: var(--font-sans);
		font-size: clamp(5.5rem, 25vw, 22rem);
		font-weight: 700;
		line-height: 0.82;
		letter-spacing: -0.055em;
		text-align: center;
		white-space: nowrap;

		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	/* The recess: dark fill, a shadow above the edge and a light lip below it. */
	.digits--cut {
		background-image: linear-gradient(180deg, #0a0b0e 20%, #141519 70%, #0d0e11);
		text-shadow:
			0 -1px 1px rgb(0 0 0 / 0.85),
			0 1px 0 rgb(244 244 242 / 0.07),
			0 2px 3px rgb(0 0 0 / 0.5);
	}

	/* The pass of light, following the pointer across the surface. */
	.digits--sheen {
		position: absolute;
		inset: 0;

		background-image: radial-gradient(
			38% 120% at var(--mx) var(--my),
			rgb(244 244 242 / 0.5),
			rgb(159 188 208 / 0.16) 42%,
			transparent 72%
		);
		mix-blend-mode: screen;
		transition: background-position var(--duration-base) linear;
	}

	/* The last four digits keep a fractionally brighter edge. */
	.digits__echo {
		text-shadow:
			0 -1px 1px rgb(0 0 0 / 0.85),
			0 1px 0 rgb(244 244 242 / 0.1);
	}

	.monolith__reader {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.monolith__foot {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m) var(--space-xl);

		margin-top: var(--space-l);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.monolith__assigned {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.monolith__pivot {
		max-width: 42ch;
		font-size: var(--type-body);
		line-height: 1.55;
		color: var(--text-secondary);
		text-align: right;
	}

	@media (max-width: 820px) {
		.monolith__pivot {
			text-align: left;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.digits--sheen {
			background-image: radial-gradient(
				40% 120% at 34% 30%,
				rgb(244 244 242 / 0.42),
				transparent 70%
			);
		}
	}
</style>
