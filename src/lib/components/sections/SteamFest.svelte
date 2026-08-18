<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { getEvent, steamFestSchools } from '$lib/content/events';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.events.steamfest);
	const event = getEvent('steamfest');
</script>

<!--
	03 — the collision.

	STEAMFest is not a science fair standing next to a tournament, so the
	chapter is not one room: it is two, meeting down the middle. The court half
	stands in claret, the lab half in blue, and each photograph runs to the
	outer edge of its own field. The composition makes the argument the copy
	makes, and the seam down the centre is where the event actually happened.
-->
<Section id="steamfest" index="03" label={copy.label} bleed>
	<div class="shell">
		<header class="intro">
			<h2 class="intro__title" use:reveal>{copy.title}</h2>
			<p class="lede intro__lede" use:reveal={{ delay: 80 }}>{copy.lede}</p>
		</header>
	</div>

	<div class="halves">
		<div class="half half--court" use:reveal>
			<div class="half__text">
				<h3 class="half__title">{copy.court.title}</h3>
				<ul class="half__list">
					{#each copy.court.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<MediaFrame
				id="home.steamfest.court"
				sizes="(max-width: 900px) 100vw, 50vw"
				showCaption={false}
			/>
		</div>

		<span class="halves__rule" aria-hidden="true"></span>

		<div class="half half--lab" use:reveal={{ delay: 90 }}>
			<div class="half__text">
				<h3 class="half__title">{copy.lab.title}</h3>
				<ul class="half__list">
					{#each copy.lab.items as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
			<MediaFrame
				id="home.steamfest.lab"
				sizes="(max-width: 900px) 100vw, 50vw"
				showCaption={false}
			/>
		</div>
	</div>

	<div class="shell">
		<div class="merge" use:reveal>
			<span class="merge__mark" aria-hidden="true"></span>
			<h3 class="merge__title">{copy.merge.title}</h3>
			<p class="merge__body">{copy.merge.body}</p>
		</div>

		<div class="meta" use:reveal>
			<dl class="facts">
				{#each event.facts as fact (fact.key)}
					<div>
						<dt class="label">
							{i18n.t.events.facts[fact.key as keyof typeof i18n.t.events.facts]}
						</dt>
						<dd>
							{fact.localized
								? i18n.t.events.facts[fact.value as keyof typeof i18n.t.events.facts]
								: fact.value}
						</dd>
					</div>
				{/each}
			</dl>

			<div class="schools">
				<p class="label">{copy.schoolsLabel}</p>
				<ul>
					{#each steamFestSchools as school (school)}
						<li>{school}</li>
					{/each}
				</ul>
			</div>

			<p class="meta__support">{copy.support}</p>
		</div>
	</div>
</Section>

<style>
	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: var(--space-2xl);
	}

	.intro__title {
		max-width: 15ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	/* ---------------------------------------------------------------- halves */

	/*
	 * Two colour fields running the full width of the viewport, meeting at a
	 * seam in the middle. No gap between them: the whole point is that the two
	 * halves touch.
	 */
	.halves {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		margin-top: var(--space-2xl);
	}

	.halves__rule {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;
		z-index: 1;

		background: linear-gradient(
			to bottom,
			transparent,
			rgb(244 244 242 / 0.4) 30%,
			rgb(244 244 242 / 0.4) 70%,
			transparent
		);
	}

	.half {
		display: grid;
		gap: var(--space-l);
		align-content: start;
		padding-block: clamp(2rem, 5vw, 4rem);
	}

	.half--court {
		background: linear-gradient(200deg, var(--claret-deep), var(--room-claret-deep));
		padding-left: var(--shell-gutter);
		padding-right: clamp(1.25rem, 3vw, 3rem);
	}

	.half--lab {
		background: linear-gradient(160deg, var(--blue-deep), var(--room-arena-deep));
		padding-right: var(--shell-gutter);
		padding-left: clamp(1.25rem, 3vw, 3rem);
	}

	.half__text {
		display: grid;
		gap: var(--space-m);
	}

	.half__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.half--court .half__title {
		color: var(--claret-bright);
	}

	.half--lab .half__title {
		color: var(--blue-bright);
	}

	/*
	 * Each photograph runs off the outer edge of its own field, so the two
	 * images push in towards the seam from opposite sides and face each other
	 * across it. Squared corners, because these are fields rather than cards.
	 */
	.half :global(.frame__image) {
		border-radius: 0;
		aspect-ratio: 4 / 3;
	}

	.half--court :global(.frame) {
		margin-left: calc(-1 * var(--shell-gutter));
	}

	.half--lab :global(.frame) {
		margin-right: calc(-1 * var(--shell-gutter));
	}

	.half__list {
		display: grid;
		gap: 0.65rem;
	}

	.half__list li {
		padding-left: 1rem;
		position: relative;

		font-size: var(--type-body);
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.half__list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.72em;

		width: 5px;
		height: 1px;
		background: var(--edge-strong);
	}

	/* ----------------------------------------------------------------- merge */

	.merge {
		position: relative;
		max-width: 44rem;
		margin: var(--space-2xl) auto 0;
		padding-top: var(--space-xl);
		text-align: center;
	}

	/* The centre rule continues down into the statement, then stops. */
	.merge__mark {
		position: absolute;
		top: 0;
		left: 50%;
		width: 1px;
		height: var(--space-l);
		background: linear-gradient(to bottom, var(--edge-strong), transparent);
	}

	.merge__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.merge__body {
		margin-top: var(--space-m);
		font-size: var(--type-body-lg);
		line-height: 1.6;
		color: var(--text-primary);
		text-wrap: pretty;
	}

	/* ------------------------------------------------------------------ meta */

	.meta {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 5rem);

		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m) clamp(1.5rem, 4vw, 3rem);
		margin: 0;
	}

	.facts dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		font-weight: 500;
		color: var(--text-secondary);
	}

	.schools ul {
		display: grid;
		gap: 0.4rem;
		margin-top: var(--space-s);
	}

	.schools li {
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.meta__support {
		grid-column: 1 / -1;
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.intro,
		.meta {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		/*
		 * Stacked, the two fields become two bands one above the other — the
		 * collision reads vertically instead of horizontally, and the seam
		 * becomes the horizontal edge where the colours meet.
		 */
		.halves {
			grid-template-columns: minmax(0, 1fr);
		}

		.halves__rule {
			display: none;
		}

		.half--court,
		.half--lab {
			padding-inline: var(--shell-gutter);
		}

		/* Stacked, both photographs bleed the same way — full width of the band. */
		.half--court :global(.frame),
		.half--lab :global(.frame) {
			margin-inline: calc(-1 * var(--shell-gutter));
		}

		.merge {
			text-align: left;
			margin-inline: 0;
		}

		.merge__mark {
			left: 0;
		}
	}
</style>
