<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { departmentIds } from '$lib/content/departments';
	import { resolveText } from '$lib/content/localized';
	import { projects } from '$lib/content/projects';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.robotics);
</script>

<Seo title={i18n.t.seo.robotics.title} description={i18n.t.seo.robotics.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<!--
	The page opens by saying where the team actually is: pre-season, no
	competition robot yet. Everything below describes the structure that robot
	will be built inside — not a machine that does not exist.
-->
<Section index="01" rule={false}>
	<div class="status" use:reveal>
		<div class="status__state">
			<p class="label">{copy.status.label}</p>
			<p class="status__value">
				<span class="status__dot" aria-hidden="true"></span>
				{copy.status.value}
			</p>
		</div>
		<p class="status__note">{copy.status.note}</p>
	</div>

	<div class="intro intro--spaced" use:reveal>
		<h2 class="intro__title">{copy.disciplines.title}</h2>
		<p class="lede">{copy.disciplines.lede}</p>
	</div>

	<ul class="disciplines">
		{#each departmentIds as id, index (id)}
			<li class="discipline" use:reveal={{ delay: index * 55 }}>
				<span class="discipline__index" aria-hidden="true">
					{String(index + 1).padStart(2, '0')}
				</span>
				<h3 class="discipline__name">{i18n.t.departments[id].name}</h3>
				<p class="discipline__text">{i18n.t.departments[id].description}</p>
			</li>
		{/each}
	</ul>

	<div class="workshop">
		<MediaFrame id="robotics.build" sizes="(max-width: 900px) 100vw, 55vw" />
		<MediaFrame id="robotics.detail" sizes="(max-width: 900px) 100vw, 30vw" />
	</div>
</Section>

<Section index="02">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.subsystems.title}</h2>
		<p class="lede">{copy.subsystems.lede}</p>
	</div>

	<!-- Layers of the machine, indented step by step like an assembly stack. -->
	<ul class="stack">
		{#each copy.subsystems.items as item, index (item.name)}
			<li class="layer" style="--depth: {index}" use:reveal={{ delay: index * 60 }}>
				<h3 class="layer__name">{item.name}</h3>
				<p class="layer__text">{item.description}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section index="03" tone="void">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.process.title}</h2>
		<p class="lede">{copy.process.lede}</p>
	</div>

	<ol class="process">
		{#each copy.process.steps as step, index (step.name)}
			<li class="step" use:reveal={{ delay: index * 50 }}>
				<span class="step__index">{String(index + 1).padStart(2, '0')}</span>
				<div class="step__body">
					<h3 class="step__name">{step.name}</h3>
					<p class="step__text">{step.description}</p>
				</div>
			</li>
		{/each}
	</ol>
</Section>

<Section index="04">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.archive.title}</h2>
		<p class="lede">{copy.archive.lede}</p>
	</div>

	{#if projects.length > 0}
		<ul class="projects">
			{#each projects as project (project.slug)}
				<li class="project" use:reveal>
					<h3 class="project__title">{resolveText(project.title, i18n.locale)}</h3>
					<p class="project__summary">{resolveText(project.summary, i18n.locale)}</p>

					<dl class="project__meta">
						<div>
							<dt class="label">{copy.archive.meta.season}</dt>
							<dd>{project.season}</dd>
						</div>
						<div>
							<dt class="label">{copy.archive.meta.discipline}</dt>
							<dd>{i18n.t.departments[project.discipline].name}</dd>
						</div>
						<div>
							<dt class="label">{copy.archive.meta.status}</dt>
							<dd>{copy.archive.status[project.status]}</dd>
						</div>
					</dl>
				</li>
			{/each}
		</ul>
	{:else}
		<EmptyState title={copy.archive.empty.title} body={copy.archive.empty.body} />
	{/if}
</Section>

<style>
	/* -------------------------------------------------------------- status */

	.status {
		display: grid;
		grid-template-columns: minmax(0, auto) minmax(0, 1fr);
		gap: var(--space-m) clamp(2rem, 6vw, 5rem);
		align-items: start;

		padding-bottom: var(--space-xl);
		border-bottom: 1px solid var(--edge-faint);
	}

	.status__value {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: var(--space-s);

		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.status__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--signal-warm);
		box-shadow: 0 0 0 4px var(--signal-warm-dim);
	}

	.status__note {
		max-width: 56ch;
		font-size: var(--type-body);
		line-height: 1.6;
		color: var(--text-secondary);
	}

	/* --------------------------------------------------------- disciplines */

	.disciplines {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0 clamp(2rem, 6vw, 5rem);
	}

	.discipline {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.35rem 1rem;
		align-items: baseline;

		padding-block: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.discipline__index {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.12em;
		color: var(--signal);
		opacity: 0.8;
	}

	.discipline__name {
		font-size: var(--type-body-lg);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.discipline__text {
		grid-column: 2;
		max-width: 46ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.workshop {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: clamp(0.75rem, 2vw, 1.5rem);
		margin-top: var(--space-2xl);
		align-items: start;
	}

	.intro--spaced {
		margin-top: var(--space-2xl);
	}

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: var(--space-2xl);
	}

	.intro__title {
		max-width: 16ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.03;
	}

	/* ------------------------------------------------------------ subsystems */

	.layer {
		display: grid;
		grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
		gap: 0.5rem clamp(1.5rem, 4vw, 4rem);
		align-items: baseline;

		margin-left: calc(var(--depth) * clamp(0rem, 1.6vw, 2.25rem));
		padding-block: clamp(1rem, 2vw, 1.6rem);
		border-top: 1px solid var(--edge-faint);
	}

	.layer__name {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.layer__text {
		max-width: 50ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	/* --------------------------------------------------------------- process */

	.process {
		display: grid;
		gap: 0;
		max-width: 60rem;
		margin-left: auto;
	}

	.step {
		display: grid;
		grid-template-columns: 4.5rem minmax(0, 1fr);
		gap: clamp(1rem, 3vw, 2.5rem);

		padding-block: clamp(1.1rem, 2.4vw, 1.75rem);
		border-top: 1px solid var(--edge-faint);
	}

	.step:last-child {
		border-bottom: 1px solid var(--edge-faint);
	}

	.step__index {
		font-family: var(--font-mono);
		font-size: var(--type-small);
		letter-spacing: 0.08em;
		color: var(--text-muted);
	}

	.step__name {
		font-size: var(--type-body-lg);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.step__text {
		max-width: 56ch;
		margin-top: 0.5rem;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	/* -------------------------------------------------------------- projects */

	.projects {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(22rem, 100%), 1fr));
		gap: clamp(1.5rem, 3vw, 2.5rem);
	}

	.project {
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge);
	}

	.project__title {
		font-size: var(--type-h3);
		font-weight: 500;
	}

	.project__summary {
		max-width: 46ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.project__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s) var(--space-m);
		margin: var(--space-m) 0 0;
	}

	.project__meta dd {
		margin: 0.4rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	@media (max-width: 900px) {
		.status,
		.disciplines,
		.workshop {
			grid-template-columns: minmax(0, 1fr);
		}

		.intro {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.layer {
			grid-template-columns: minmax(0, 1fr);
			margin-left: 0;
		}

		.step {
			grid-template-columns: 3rem minmax(0, 1fr);
		}
	}
</style>
