<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import { press, syndicatedCount } from '$lib/content/press';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { events, offSeasonOrigins, steamFestSchools } from '$lib/content/events';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.impact);
	const [steamfest, offseason] = events;
</script>

<Seo title={i18n.t.seo.impact.title} description={i18n.t.seo.impact.description} />

<PageHeader
	eyebrow={copy.eyebrow}
	title={copy.title}
	lede={copy.lede}
	tone="arena"
	media="home.offseason.wide"
/>

<Section index="01" rule={false} tone="arena">
	<div class="phrase" use:reveal>
		<h2 class="phrase__term">{copy.steam.title}</h2>
		<p class="phrase__body">{copy.steam.body}</p>
	</div>

	<div class="phrase phrase--offset" use:reveal={{ delay: 90 }}>
		<h2 class="phrase__term">{copy.people.title}</h2>
		<p class="phrase__body">{copy.people.body}</p>
	</div>
</Section>

<!-- The two projects, each given a full chapter with its verified record. -->
<Section index="02" tone="paper">
	<article class="project">
		<header class="project__head" use:reveal>
			<div>
				<p class="label">{i18n.t.events.steamfest.label}</p>
				<h2 class="project__title">{i18n.t.events.steamfest.title}</h2>
			</div>
			<time class="project__date" datetime={steamfest.date}>28.04.2026</time>
		</header>

		<div class="project__grid">
			<div class="project__copy">
				<p class="lede">{i18n.t.events.steamfest.lede}</p>
				<p class="prose project__prose">{i18n.t.events.steamfest.merge.body}</p>

				<div class="lists">
					<div>
						<p class="label">{i18n.t.events.steamfest.court.title}</p>
						<ul>
							{#each i18n.t.events.steamfest.court.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="label">{i18n.t.events.steamfest.lab.title}</p>
						<ul>
							{#each i18n.t.events.steamfest.lab.items as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="label">{i18n.t.events.steamfest.schoolsLabel}</p>
						<ul>
							{#each steamFestSchools as school (school)}
								<li>{school}</li>
							{/each}
						</ul>
					</div>
				</div>

				<p class="project__support">{i18n.t.events.steamfest.support}</p>

				<p class="coverage">
					<span class="label">{i18n.t.events.coverageLabel}</span>
					{#each steamfest.coverage as source (source.href)}
						<a href={source.href} target="_blank" rel="noopener">{source.outlet}</a>
					{/each}
				</p>
			</div>

			<div class="project__media">
				<MediaFrame id="impact.steamfest.wide" sizes="(max-width: 1024px) 100vw, 40vw" />
			</div>
		</div>
	</article>
</Section>

<Section index="03" tone="arena">
	<article class="project">
		<header class="project__head" use:reveal>
			<div>
				<p class="label">{i18n.t.events.offseason.label}</p>
				<h2 class="project__title">{i18n.t.events.offseason.title}</h2>
			</div>
			<time class="project__date" datetime={offseason.date}>10–12.07.2026</time>
		</header>

		<div class="project__grid">
			<div class="project__copy">
				<p class="lede">{i18n.t.events.offseason.lede}</p>

				{#each i18n.t.events.offseason.body as paragraph, index (index)}
					<p class="prose project__prose" use:reveal={{ delay: index * 60 }}>{paragraph}</p>
				{/each}

				<div class="lists">
					<div>
						<p class="label">{i18n.t.events.offseason.originsLabel}</p>
						<ul>
							{#each offSeasonOrigins as origin (origin)}
								<li>{origin}</li>
							{/each}
						</ul>
					</div>
					<div>
						<p class="label">{i18n.t.events.facts.venue}</p>
						<ul>
							<li>{offseason.venue}</li>
							<li>{offseason.city}</li>
						</ul>
					</div>
					<div>
						<p class="label">{i18n.t.events.facts.teams}</p>
						<ul>
							<li>21</li>
						</ul>
					</div>
				</div>

				<div class="proof">
					<h3 class="proof__title">{i18n.t.events.offseason.proof.title}</h3>
					<p class="proof__body">{i18n.t.events.offseason.proof.body}</p>
				</div>

				<p class="coverage">
					<span class="label">{i18n.t.events.coverageLabel}</span>
					{#each offseason.coverage as source (source.href)}
						<a href={source.href} target="_blank" rel="noopener">{source.outlet}</a>
					{/each}
				</p>
			</div>

			<div class="project__media">
				<MediaFrame id="impact.offseason.stands" sizes="(max-width: 1024px) 100vw, 40vw" />
			</div>
		</div>
	</article>
</Section>

<!--
	04 — coverage, as spread rather than volume.

	Deliberately not a row of article cards with thumbnails. The interesting,
	checkable fact is that an agency wire carried the same report to newsrooms
	with no connection to the Black Sea, so the section is a wall of mastheads:
	the papers that wrote their own piece set large, the wire pickups set small
	and packed. Every name is a real link to the piece it names.

	The note under it is load-bearing — the press credits Trabzonspor and the
	school, not RO6ONE, and the copy says so rather than quietly implying the
	coverage was about the team.
-->
<Section index="04" label={copy.coverage.label} tone="paper">
	<div class="press">
		<div class="press__lead">
			<h2 class="press__title" use:reveal>{copy.coverage.title}</h2>
			<p class="prose" use:reveal={{ delay: 70 }}>{copy.coverage.body}</p>
			<p class="press__note" use:reveal={{ delay: 120 }}>{copy.coverage.note}</p>
		</div>

		<div class="press__wall">
			<p class="label press__kind" use:reveal>{copy.coverage.original}</p>
			<ul class="mastheads mastheads--original">
				{#each press.filter((item) => !item.syndicated) as item, index (item.url)}
					<li use:reveal={{ delay: index * 45 }}>
						<a href={item.url} target="_blank" rel="noopener">{item.outlet}</a>
					</li>
				{/each}
			</ul>

			<p class="label press__kind press__kind--wire" use:reveal>
				{copy.coverage.wire}
				<span class="press__count">{syndicatedCount}</span>
			</p>
			<ul class="mastheads mastheads--wire">
				{#each press.filter((item) => item.syndicated) as item, index (item.url)}
					<li use:reveal={{ delay: index * 35 }}>
						<a href={item.url} target="_blank" rel="noopener">{item.outlet}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</Section>

<Section index="05">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.focus.title}</h2>
		<p class="lede">{copy.focus.lede}</p>
	</div>

	<ul class="focus">
		{#each copy.focus.items as item, index (item.name)}
			<li class="focus__item" use:reveal={{ delay: index * 60 }}>
				<span class="focus__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
				<h3 class="focus__name">{item.name}</h3>
				<p class="focus__text">{item.description}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section index="06">
	<div class="closing">
		<div use:reveal>
			<h2 class="closing__title">{copy.record.title}</h2>
			<p class="prose">{copy.record.body}</p>
		</div>

		<div use:reveal={{ delay: 90 }}>
			<h2 class="closing__title">{copy.collaborate.title}</h2>
			<p class="prose">{copy.collaborate.body}</p>
			<div class="closing__action">
				<ActionLink href="/contact">{copy.collaborate.cta}</ActionLink>
			</div>
		</div>
	</div>
</Section>

<style>
	/* ------------------------------------------------------------- coverage */

	.press {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
		gap: var(--space-xl) clamp(2rem, 6vw, 5rem);
	}

	.press__title {
		max-width: 16ch;
		margin-bottom: var(--space-m);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.press__note {
		max-width: 42ch;
		margin-top: var(--space-l);
		padding-top: var(--space-s);
		border-top: 1px solid var(--ink-edge-faint);

		font-size: var(--type-small);
		line-height: 1.5;
		color: var(--text-muted);
	}

	.press__kind {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		color: var(--claret);
	}

	.press__kind--wire {
		margin-top: var(--space-xl);
		color: var(--blue-deep);
	}

	.press__count {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-muted);
	}

	/*
	 * Mastheads, not cards. Original reporting is set at heading scale because
	 * somebody went and wrote it; the wire pickups are set small and packed,
	 * because the point of them is how many there are and how far they reach.
	 */
	.mastheads {
		display: flex;
		flex-wrap: wrap;
		margin-top: var(--space-m);
	}

	.mastheads a {
		display: inline-block;
		border-bottom: 1px solid transparent;
		transition:
			border-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.mastheads--original {
		gap: 0.3rem clamp(1.25rem, 3vw, 2.25rem);
	}

	.mastheads--original a {
		font-size: var(--type-h3);
		font-weight: 550;
		letter-spacing: -0.025em;
		line-height: 1.15;
		color: var(--ink-text);
	}

	.mastheads--original a:hover {
		border-color: var(--claret);
		color: var(--claret);
	}

	.mastheads--wire {
		gap: 0.35rem clamp(0.9rem, 2vw, 1.5rem);
		max-width: 34rem;
	}

	.mastheads--wire a {
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.mastheads--wire a:hover {
		border-color: var(--blue-deep);
		color: var(--blue-deep);
	}

	@media (max-width: 900px) {
		.press {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.phrase {
		max-width: 52rem;
		padding-block: clamp(1.75rem, 4vw, 3rem);
		border-top: 1px solid var(--edge-faint);
	}

	.phrase--offset {
		margin-left: auto;
	}

	.phrase__term {
		font-size: clamp(1.9rem, 4vw, 3.5rem);
		font-weight: 550;
		letter-spacing: -0.04em;
		line-height: 1;
	}

	.phrase__body {
		max-width: 54ch;
		margin-top: var(--space-m);
		font-size: var(--type-body-lg);
		line-height: 1.6;
		color: var(--text-secondary);
	}

	/* ---------------------------------------------------------------- project */

	.project__head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-s) var(--space-l);

		padding-bottom: var(--space-m);
		border-bottom: 1px solid var(--edge-faint);
	}

	.project__title {
		max-width: 22ch;
		margin-top: var(--space-s);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.03;
	}

	.project__date {
		font-family: var(--font-mono);
		font-size: var(--type-small);
		letter-spacing: 0.06em;
		color: var(--text-muted);
	}

	.project__grid {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 5vw, 4rem);
		margin-top: var(--space-xl);
		align-items: start;
	}

	.project__prose {
		max-width: 58ch;
		margin-top: var(--space-m);
	}

	.lists {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-m) clamp(1rem, 3vw, 2.5rem);
		margin-top: var(--space-xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.lists ul {
		display: grid;
		gap: 0.4rem;
		margin-top: var(--space-s);
	}

	.lists li {
		font-size: var(--type-small);
		line-height: 1.45;
		color: var(--text-muted);
	}

	.project__support {
		margin-top: var(--space-l);
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.proof {
		margin-top: var(--space-l);
		padding-left: var(--space-m);
		border-left: 1px solid var(--edge-navy);
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
		max-width: 48ch;
		margin-top: var(--space-s);
		font-size: var(--type-body);
		line-height: 1.6;
		color: var(--text-primary);
	}

	.coverage {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.75rem;
		margin-top: var(--space-l);
	}

	.coverage a {
		font-size: var(--type-small);
		color: var(--text-secondary);
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.coverage a:hover {
		border-color: var(--signal);
	}

	/* ------------------------------------------------------------------ focus */

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: var(--space-2xl);
	}

	.intro__title {
		max-width: 14ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.03;
	}

	.focus {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0 clamp(2rem, 6vw, 5rem);
	}

	.focus__item {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.4rem 1rem;
		align-items: baseline;

		padding-block: var(--space-l);
		border-top: 1px solid var(--edge-faint);
	}

	.focus__index {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.12em;
		color: var(--signal);
		opacity: 0.8;
	}

	.focus__name {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.focus__text {
		grid-column: 2;
		max-width: 44ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.closing {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-xl) clamp(2rem, 6vw, 6rem);
	}

	.closing__title {
		margin-bottom: var(--space-s);
		font-size: var(--type-h3);
		font-weight: 550;
	}

	.closing__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 1024px) {
		.project__grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 900px) {
		.intro,
		.focus,
		.closing {
			grid-template-columns: minmax(0, 1fr);
		}

		.intro {
			align-items: start;
		}

		.lists {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
