<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { events, offSeasonOrigins, steamFestSchools } from '$lib/content/events';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.impact);
	const [steamfest, offseason] = events;
</script>

<Seo title={i18n.t.seo.impact.title} description={i18n.t.seo.impact.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<Section index="01" rule={false}>
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
<Section index="02" tone="void">
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

<Section index="03" tone="navy">
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

<Section index="04">
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

<Section index="05">
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
