<script lang="ts">
	import HeroLightCanvas from '$lib/components/ui/HeroLightCanvas.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
</script>

<section class="hero">
	<HeroLightCanvas />

	<div class="hero__reveal" aria-hidden="true"></div>

	<div class="hero__grid">
		<div class="hero__eyebrow-mask">
			<p class="hero__eyebrow">
				<span>{site.location}</span>
				<span class="hero__eyebrow-divider" aria-hidden="true"></span>
				<span>{i18n.t.hero.eyebrow}</span>
			</p>
		</div>

		<span class="hero__rule" aria-hidden="true"></span>

		<h1 class="hero__title">
			<span class="hero__title-mask">
				<span class="hero__title-line">{i18n.t.hero.titleTop}</span>
			</span>

			<span class="hero__title-mask hero__title-mask--offset">
				<span class="hero__title-line">{i18n.t.hero.titleBottom}</span>
			</span>
		</h1>

		<div class="hero__description-mask">
			<p class="hero__description">{i18n.t.hero.description}</p>
		</div>

		<div class="hero__foot">
			<a class="hero__scroll" href="#origin">
				<span>{i18n.t.hero.scroll}</span>
				<span class="hero__scroll-line" aria-hidden="true"></span>
			</a>

			<dl class="hero__meta">
				<div class="hero__meta-item">
					<dt class="label">{i18n.t.hero.meta.founded}</dt>
					<dd>{i18n.t.hero.meta.foundedValue}</dd>
				</div>

				<div class="hero__meta-item">
					<dt class="label">{i18n.t.hero.meta.home}</dt>
					<dd>{site.school}</dd>
				</div>

				<div class="hero__meta-item hero__meta-item--next">
					<dt class="label">{i18n.t.hero.meta.next}</dt>
					<dd>{i18n.t.hero.meta.nextValue}</dd>
				</div>
			</dl>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		isolation: isolate;

		min-height: 100svh;
		padding: calc(var(--header-height) + clamp(1rem, 2vw, 2rem)) var(--shell-gutter)
			clamp(1.75rem, 3.5vw, 3rem);

		background: var(--surface-base);
		color: var(--text-primary);
	}

	.hero__grid {
		position: relative;
		z-index: var(--z-content);

		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-rows: auto auto 1fr auto;
		column-gap: clamp(1rem, 1.5vw, 1.75rem);

		width: 100%;
		max-width: var(--shell-max);
		margin-inline: auto;
		min-height: calc(100svh - var(--header-height) - clamp(2.75rem, 5.5vw, 5rem));
	}

	/* --------------------------------------------------------------- eyebrow */

	.hero__eyebrow-mask {
		grid-column: 1 / -1;
		grid-row: 1;
		overflow: hidden;
	}

	.hero__eyebrow {
		display: flex;
		align-items: center;
		gap: 0.75rem;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		line-height: 1;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);

		opacity: 0;
		transform: translateY(120%);
		animation: hero-copy-enter 0.72s var(--ease-out) 0.38s forwards;
	}

	.hero__eyebrow-divider {
		width: 1.75rem;
		height: 1px;
		background: var(--edge-strong);
	}

	/* Drafting rule under the identity row: structure, not decoration. */
	.hero__rule {
		grid-column: 1 / -1;
		grid-row: 2;

		height: 1px;
		margin-top: clamp(1rem, 1.8vw, 1.5rem);
		background: var(--edge-faint);

		transform: scaleX(0);
		transform-origin: left;
		animation: hero-rule-enter 1.1s var(--ease-material) 0.5s forwards;
	}

	/* ---------------------------------------------------------------- title */

	.hero__title {
		grid-column: 1 / 10;
		grid-row: 3;
		align-self: center;

		max-width: 11ch;
		padding-block: clamp(2rem, 5vh, 4rem);

		font-size: var(--type-display);
		font-weight: 600;
		line-height: 0.87;
		letter-spacing: -0.06em;
	}

	.hero__title-mask {
		display: block;
		overflow: hidden;
	}

	.hero__title-mask--offset {
		margin-left: 0.38em;
	}

	.hero__title-line {
		display: block;

		opacity: 0;
		transform: translateY(112%);
		animation: hero-title-enter 0.88s var(--ease-material) forwards;
	}

	.hero__title-mask:first-child .hero__title-line {
		animation-delay: 0.44s;
	}

	.hero__title-mask--offset .hero__title-line {
		animation-delay: 0.54s;
	}

	/* ---------------------------------------------------------- description */

	.hero__description-mask {
		grid-column: 8 / 13;
		grid-row: 3;
		align-self: end;

		padding-bottom: clamp(2rem, 6vh, 4.5rem);
		overflow: hidden;
	}

	.hero__description {
		max-width: 30rem;

		font-size: var(--type-body-lg);
		line-height: 1.55;
		color: var(--text-secondary);

		opacity: 0;
		transform: translateY(1rem);
		animation: hero-description-enter 0.72s var(--ease-out) 0.72s forwards;
	}

	/* ----------------------------------------------------------------- foot */

	.hero__foot {
		grid-column: 1 / -1;
		grid-row: 4;

		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m);
	}

	.hero__scroll {
		display: flex;
		align-items: center;
		gap: 1rem;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		line-height: 1;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);

		opacity: 0;
		transform: translateY(0.8rem);
		animation: hero-description-enter 0.72s var(--ease-out) 0.94s forwards;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.hero__scroll:hover {
		color: var(--text-secondary);
	}

	.hero__scroll-line {
		width: 3.5rem;
		height: 1px;

		background: var(--edge-strong);
		transform-origin: left;
		animation: scroll-line-pulse 2.8s ease-in-out 1.4s infinite;
	}

	.hero__meta {
		display: flex;
		gap: clamp(1.5rem, 3vw, 3.5rem);
		margin: 0;

		opacity: 0;
		transform: translateY(0.8rem);
		animation: hero-description-enter 0.72s var(--ease-out) 0.86s forwards;
	}

	.hero__meta-item dd {
		margin: 0.45rem 0 0;

		font-size: var(--type-small);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--text-secondary);
	}

	/* The one forward-looking fact in the strip gets the live marker. */
	.hero__meta-item--next dd {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.hero__meta-item--next dd::before {
		content: '';
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--signal);
		box-shadow: 0 0 0 3px var(--signal-dim);
	}

	/* ------------------------------------------------------------- entrance */

	/*
	 * The surface wipe reads as the panel being lit rather than a loading
	 * screen: it never blocks interaction and is gone in under a second.
	 */
	.hero__reveal {
		position: absolute;
		inset: 0;
		z-index: 2;

		pointer-events: none;
		background: var(--surface-void);

		transform-origin: top;
		animation: reveal-surface 1.05s var(--ease-in-out) forwards;
	}

	@keyframes reveal-surface {
		0% {
			opacity: 1;
			transform: scaleY(1);
		}

		55% {
			opacity: 1;
		}

		100% {
			opacity: 0;
			transform: scaleY(0);
			visibility: hidden;
		}
	}

	@keyframes hero-title-enter {
		from {
			opacity: 0;
			transform: translateY(112%);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes hero-copy-enter {
		from {
			opacity: 0;
			transform: translateY(120%);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes hero-description-enter {
		from {
			opacity: 0;
			transform: translateY(1rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes hero-rule-enter {
		to {
			transform: scaleX(1);
		}
	}

	@keyframes scroll-line-pulse {
		0%,
		100% {
			transform: scaleX(0.45);
			opacity: 0.4;
		}

		50% {
			transform: scaleX(1);
			opacity: 0.85;
		}
	}

	/* ----------------------------------------------------------- responsive */

	@media (max-width: 960px) {
		.hero__grid {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto auto 1fr auto;
		}

		.hero__title {
			grid-column: 1;
			max-width: none;
			font-size: clamp(3.4rem, 13vw, 7rem);
		}

		.hero__description-mask {
			grid-column: 1;
			grid-row: 3;
			align-self: start;
			padding-bottom: 0;
		}

		.hero__description {
			max-width: 34rem;
		}
	}

	@media (max-width: 640px) {
		.hero__title {
			padding-block: clamp(1.5rem, 4vh, 2.5rem);
			line-height: 0.92;
			letter-spacing: -0.05em;
		}

		.hero__foot {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-m);
		}

		.hero__meta {
			width: 100%;
			justify-content: space-between;
		}

		.hero__eyebrow {
			flex-wrap: wrap;
			gap: 0.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero__reveal {
			display: none;
		}

		.hero__eyebrow,
		.hero__title-line,
		.hero__description,
		.hero__meta,
		.hero__scroll {
			opacity: 1;
			transform: none;
			animation: none;
		}

		.hero__rule {
			transform: scaleX(1);
			animation: none;
		}

		.hero__scroll-line {
			animation: none;
		}
	}
</style>
