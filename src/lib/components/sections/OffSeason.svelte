<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { getEvent, offSeasonOrigins } from '$lib/content/events';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.events.offseason);
	const event = getEvent('offseason');
	const teams = event.facts.find((fact) => fact.key === 'teams')?.value ?? '21';
</script>

<Section id="offseason" index="03" label={copy.label} tone="navy">
	<!-- The widest moment on the page: the event gets the full measure. -->
	<div class="banner">
		<MediaFrame id="home.offseason.wide" sizes="100vw" />
	</div>

	<div class="head">
		<p class="count" use:reveal>
			<span class="count__value">{teams}</span>
			<span class="count__unit">{i18n.t.events.facts.teams}</span>
		</p>

		<div class="head__copy">
			<h2 class="head__title" use:reveal>{copy.title}</h2>
			<p class="lede" use:reveal={{ delay: 80 }}>{copy.lede}</p>
		</div>
	</div>

	<div class="story">
		<div class="story__text">
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

		<div class="story__media">
			<MediaFrame id="home.offseason.detail" sizes="(max-width: 900px) 50vw, 22vw" />
			<MediaFrame id="home.offseason.people" sizes="(max-width: 900px) 50vw, 22vw" />
		</div>
	</div>

	<div class="proof" use:reveal>
		<div class="proof__statement">
			<h3 class="proof__title">{copy.proof.title}</h3>
			<p class="proof__body">{copy.proof.body}</p>
		</div>

		<dl class="proof__facts">
			{#each event.facts as fact (fact.key)}
				<div>
					<dt class="label">{i18n.t.events.facts[fact.key as keyof typeof i18n.t.events.facts]}</dt>
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
</Section>

<style>
	.banner {
		margin-bottom: var(--space-2xl);
	}

	.head {
		display: grid;
		grid-template-columns: minmax(0, auto) minmax(0, 1fr);
		gap: clamp(1.5rem, 5vw, 4.5rem);
		align-items: start;
	}

	/* A number this large is the fact; the sentence beside it is the context. */
	.count {
		display: grid;
		gap: 0.35rem;
		padding-right: clamp(1rem, 3vw, 2.5rem);
		border-right: 1px solid var(--edge-faint);
	}

	.count__value {
		font-size: clamp(4.5rem, 11vw, 10rem);
		font-weight: 600;
		line-height: 0.8;
		letter-spacing: -0.06em;
		font-variant-numeric: tabular-nums;

		background: linear-gradient(160deg, var(--text-primary), rgb(159 188 208 / 0.65));
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	.count__unit {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.head__title {
		max-width: 14ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
		margin-bottom: var(--space-m);
	}

	/* ----------------------------------------------------------------- story */

	.story {
		display: grid;
		grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 6vw, 5rem);
		margin-top: var(--space-2xl);
	}

	.story__text .prose {
		max-width: 54ch;
	}

	.origins {
		margin-top: var(--space-l);
		padding-top: var(--space-s);
		border-top: 1px solid var(--edge-faint);
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
		background: var(--edge);
	}

	.story__media {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(0.75rem, 1.5vw, 1.25rem);
		align-content: start;
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
		color: var(--signal);
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
		.head {
			grid-template-columns: minmax(0, 1fr);
		}

		.count {
			padding-right: 0;
			padding-bottom: var(--space-m);
			border-right: 0;
			border-bottom: 1px solid var(--edge-faint);
		}

		.story,
		.proof {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
