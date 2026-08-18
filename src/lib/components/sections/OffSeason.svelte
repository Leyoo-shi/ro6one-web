<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { getEvent, offSeasonOrigins } from '$lib/content/events';
	import { getMediaSlot } from '$lib/content/media';
	import { resolveText } from '$lib/content/localized';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.events.offseason);
	const event = getEvent('offseason');
	const teams = event.facts.find((fact) => fact.key === 'teams')?.value ?? '21';

	/* Rendered directly rather than through MediaFrame: this one bleeds. */
	const wide = getMediaSlot('home.offseason.wide');
</script>

<!--
	04 — the arena.

	This chapter used to open with an empty 21:9 aperture, which meant the
	loudest moment on the page was a black box. Now the photograph *is* the
	chapter opening: full-bleed, with the team count set into it, so the first
	thing you get is the size of the room rather than a number floating on
	charcoal. Everything after it happens in a genuinely blue room.
-->
<Section id="offseason" index="04" label={copy.label} tone="arena" bleed>
	<figure class="scene" use:reveal>
		{#if wide.src}
			<img
				class="scene__image"
				src={wide.src}
				srcset={wide.srcset}
				sizes="100vw"
				alt={resolveText(wide.alt, i18n.locale)}
				loading="lazy"
				decoding="async"
			/>
		{/if}

		<div class="scene__wash" aria-hidden="true"></div>

		<figcaption class="scene__plate">
			<p class="count">
				<span class="count__value">{teams}</span>
				<span class="count__unit">{i18n.t.events.facts.teams}</span>
			</p>

			<h2 class="scene__title">{copy.title}</h2>
		</figcaption>
	</figure>

	<div class="shell offseason__body">
		<div class="story">
			<div class="story__text">
				<p class="lede" use:reveal>{copy.lede}</p>

				{#each copy.body as paragraph, index (index)}
					<p class="prose" use:reveal={{ delay: 60 * index }}>{paragraph}</p>
				{/each}

				<div class="origins" use:reveal>
					<p class="label">{copy.originsLabel}</p>
					<ul>
						{#each offSeasonOrigins as origin (origin)}
							<li>{origin}</li>
						{/each}
					</ul>
				</div>
			</div>

			<!--
				A staggered field rather than a grid: three photographs at three
				sizes sitting at three heights, the way they would be laid out on
				a page instead of dropped into equal boxes.
			-->
			<div class="plates">
				<div class="plates__tall">
					<MediaFrame id="home.offseason.people" sizes="(max-width: 900px) 50vw, 24vw" />
				</div>
				<div class="plates__square">
					<MediaFrame id="home.offseason.detail" sizes="(max-width: 900px) 50vw, 20vw" />
				</div>
			</div>
		</div>

		<div class="wide-pair">
			<MediaFrame id="home.offseason.field" sizes="(max-width: 900px) 100vw, 52vw" />
			<MediaFrame id="home.offseason.drivers" sizes="(max-width: 900px) 100vw, 34vw" />
		</div>

		<div class="proof" use:reveal>
			<div class="proof__statement">
				<h3 class="proof__title">{copy.proof.title}</h3>
				<p class="proof__body">{copy.proof.body}</p>
			</div>

			<dl class="proof__facts">
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
		</div>

		<div class="foot" use:reveal>
			<p class="foot__mascot">{copy.mascot}</p>
			<ActionLink href="/impact">{i18n.t.home.principles.link}</ActionLink>
		</div>
	</div>
</Section>

<style>
	/* ----------------------------------------------------------------- scene */

	.scene {
		position: relative;
		margin: 0 0 var(--space-2xl);
		min-height: clamp(22rem, 46vw, 40rem);
		overflow: hidden;
		background: var(--room-arena-deep);
	}

	.scene__image {
		display: block;
		width: 100%;
		height: 100%;
		min-height: clamp(22rem, 46vw, 40rem);
		object-fit: cover;
		object-position: 50% 52%;

		/* The archive is one camera on one day; a light grade keeps it there. */
		filter: saturate(1.04) contrast(1.03);
	}

	/*
	 * Legibility wash. Weighted to the bottom-left where the plate sits, so the
	 * stands and the tent at the top of the frame stay in full colour.
	 */
	.scene__wash {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(to top, rgb(5 14 30 / 0.92) 0%, rgb(5 14 30 / 0.45) 26%, transparent 58%),
			linear-gradient(to right, rgb(5 14 30 / 0.6), transparent 55%);
	}

	.scene__plate {
		position: absolute;
		inset: auto 0 0;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: clamp(1rem, 3vw, 3rem);
		padding: var(--shell-gutter);
		padding-bottom: clamp(1.5rem, 3vw, 3rem);
	}

	.count {
		display: grid;
		gap: 0.3rem;
	}

	.count__value {
		font-size: clamp(5rem, 13vw, 12rem);
		font-weight: 600;
		line-height: 0.78;
		letter-spacing: -0.06em;
		font-variant-numeric: tabular-nums;
		color: var(--text-primary);
		text-shadow: 0 0.15em 1.4rem rgb(5 14 30 / 0.6);
	}

	.count__unit {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--blue-bright);
	}

	.scene__title {
		flex: 1 1 22ch;
		max-width: 26ch;
		padding-bottom: 0.5rem;

		font-size: var(--type-h3);
		font-weight: 500;
		line-height: 1.15;
		color: var(--text-primary);
		text-shadow: 0 0.1em 1rem rgb(5 14 30 / 0.7);
	}

	/* ------------------------------------------------------------------ body */

	.story {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 6vw, 5rem);
	}

	.story__text .prose {
		max-width: 54ch;
	}

	.origins {
		margin-top: var(--space-l);
		padding-top: var(--space-s);
		border-top: 1px solid var(--edge-navy);
	}

	.origins ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 0;
		margin-top: var(--space-s);
	}

	.origins li {
		display: flex;
		align-items: center;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.origins li:not(:last-child)::after {
		content: '';
		width: 1px;
		height: 0.7rem;
		margin-inline: clamp(0.6rem, 1.6vw, 1.1rem);
		background: var(--edge-navy);
	}

	.plates {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(0.75rem, 1.6vw, 1.4rem);
		align-content: start;
	}

	/* The offset is what stops two photographs reading as a pair of boxes. */
	.plates__square {
		margin-top: clamp(2rem, 6vw, 5rem);
	}

	.wide-pair {
		display: grid;
		grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
		gap: clamp(0.75rem, 1.6vw, 1.4rem);
		margin-top: var(--space-2xl);
		align-items: end;
	}

	/* ----------------------------------------------------------------- proof */

	.proof {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 5rem);

		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-navy);
	}

	.proof__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--blue-bright);
	}

	.proof__body {
		max-width: 46ch;
		margin-top: var(--space-s);
		font-size: var(--type-body-lg);
		line-height: 1.55;
		color: var(--text-primary);
	}

	.proof__facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m) clamp(1.5rem, 4vw, 3rem);
		margin: 0;
		align-content: start;
	}

	.proof__facts dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		font-weight: 500;
		color: var(--text-secondary);
	}

	/* ------------------------------------------------------------------ foot */

	.foot {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-m);
		margin-top: var(--space-xl);
	}

	.foot__mascot {
		max-width: 44ch;
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.scene__plate {
			gap: 0.75rem;
		}

		.scene__title {
			flex-basis: 100%;
			max-width: 30ch;
			font-size: var(--type-body-lg);
		}

		.story,
		.proof,
		.wide-pair {
			grid-template-columns: minmax(0, 1fr);
		}

		.plates__square {
			margin-top: 0;
		}
	}
</style>
