<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import OrgNetwork from '$lib/components/ui/OrgNetwork.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { departmentIds } from '$lib/content/departments';
	import { resolveText } from '$lib/content/localized';
	import { members } from '$lib/content/members';
	import { domains, prPipeline } from '$lib/content/organization';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.team);
	const platform = $derived(i18n.t.organization.platform);
	const pipeline = $derived(i18n.t.organization.pipeline);

	/** Members are authored as a flat list and grouped here, in domain order. */
	const grouped = $derived(
		domains
			.map((domain) => ({
				id: domain.id,
				people: members.filter((member) => member.primary === domain.id)
			}))
			.filter((group) => group.people.length > 0)
	);
</script>

<Seo title={i18n.t.seo.team.title} description={i18n.t.seo.team.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<Section index="01" rule={false}>
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.structure.title}</h2>
		<p class="lede">{copy.structure.lede}</p>
	</div>

	<OrgNetwork />
</Section>

<Section index="02">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.engineering.title}</h2>
		<p class="lede">{copy.engineering.lede}</p>
	</div>

	<ul class="disciplines">
		{#each departmentIds as id, index (id)}
			<li class="discipline" use:reveal={{ delay: index * 55 }}>
				<h3 class="discipline__name">{i18n.t.departments[id].name}</h3>
				<p class="discipline__text">{i18n.t.departments[id].description}</p>
			</li>
		{/each}
	</ul>

	<!-- How work reaches a person: the PR pipeline, drawn as a chain. -->
	<div class="pipeline" use:reveal>
		<h3 class="pipeline__title">{pipeline.title}</h3>

		<ol class="chain">
			{#each prPipeline as stage, index (stage)}
				<li class="chain__stage">
					<span class="chain__index" aria-hidden="true">{index + 1}</span>
					<span class="chain__label">
						{pipeline.stages[
							stage === 'hand-over' ? 'handOver' : (stage as keyof typeof pipeline.stages)
						]}
					</span>
				</li>
			{/each}
		</ol>

		<p class="pipeline__note">{pipeline.note}</p>
	</div>
</Section>

<Section index="03" tone="void">
	<div class="platform">
		<div class="platform__copy">
			<p class="label">{platform.kicker}</p>
			<h2 class="platform__name" use:reveal>{platform.name}</h2>
			<p class="prose platform__body" use:reveal={{ delay: 70 }}>{platform.description}</p>

			<ul class="platform__facts" use:reveal={{ delay: 120 }}>
				{#each Object.entries(platform.facts) as [key, value] (key)}
					<li>{value}</li>
				{/each}
			</ul>
		</div>

		<div class="platform__media">
			<MediaFrame id="team.infrastructure" sizes="(max-width: 1024px) 100vw, 42vw" />
		</div>
	</div>
</Section>

<Section index="04">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.roster.title}</h2>
		<p class="lede">{copy.roster.lede}</p>
	</div>

	{#if grouped.length > 0}
		{#each grouped as group (group.id)}
			<div class="roster">
				<h3 class="roster__title">{i18n.t.organization.domains[group.id].name}</h3>

				<ul class="roster__list">
					{#each group.people as person (person.name)}
						<li class="person">
							{#if person.photo}
								<img class="person__photo" src={person.photo} alt={person.name} />
							{:else}
								<span class="person__photo person__photo--empty" aria-hidden="true"></span>
							{/if}

							<p class="person__name">{person.name}</p>
							<p class="person__role">{resolveText(person.role, i18n.locale)}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	{:else}
		<div class="roster__empty">
			<EmptyState title={copy.roster.empty.title} body={copy.roster.empty.body} />
			<MediaFrame id="team.group" sizes="(max-width: 1024px) 100vw, 55vw" />
		</div>
	{/if}
</Section>

<Section index="05">
	<div class="join" use:reveal>
		<h2 class="join__title">{copy.join.title}</h2>
		<div>
			<p class="lede">{copy.join.body}</p>
			<div class="join__action">
				<ActionLink href="/contact">{copy.join.cta}</ActionLink>
			</div>
		</div>
	</div>
</Section>

<style>
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

	/* ----------------------------------------------------------- disciplines */

	.disciplines {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(1.5rem, 3vw, 2.5rem) 0;
	}

	.discipline {
		padding: 0 clamp(1.25rem, 2.5vw, 2rem);
		border-left: 1px solid var(--edge-faint);
	}

	.discipline:first-child {
		padding-left: 0;
		border-left: 0;
	}

	.discipline__name {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.discipline__text {
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	/* -------------------------------------------------------------- pipeline */

	.pipeline {
		margin-top: var(--space-2xl);
		padding-top: var(--space-l);
		border-top: 1px solid var(--edge-faint);
	}

	.pipeline__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.chain {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		gap: 0.75rem 0;
		margin-top: var(--space-m);
	}

	.chain__stage {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding-right: clamp(0.75rem, 2vw, 1.5rem);
		position: relative;
	}

	.chain__stage:not(:last-child)::after {
		content: '';
		width: clamp(0.75rem, 2vw, 1.5rem);
		height: 1px;
		margin-left: 0;
		background: var(--edge);
	}

	.chain__index {
		display: grid;
		place-items: center;
		width: 1.35rem;
		height: 1.35rem;

		border: 1px solid var(--edge);
		border-radius: 50%;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-muted);
	}

	.chain__label {
		font-size: var(--type-small);
		color: var(--text-secondary);
		white-space: nowrap;
	}

	.pipeline__note {
		max-width: 52ch;
		margin-top: var(--space-m);
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	/* -------------------------------------------------------------- platform */

	.platform {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 5vw, 4rem);
		align-items: start;
	}

	.platform__name {
		margin: var(--space-s) 0 var(--space-m);
		font-size: var(--type-h2);
		font-weight: 550;
		letter-spacing: -0.03em;
	}

	.platform__body {
		max-width: 58ch;
	}

	.platform__facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 0;
		margin-top: var(--space-l);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.platform__facts li {
		display: flex;
		align-items: center;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.platform__facts li:not(:last-child)::after {
		content: '';
		width: 1px;
		height: 0.7rem;
		margin-inline: clamp(0.6rem, 1.5vw, 1rem);
		background: var(--edge);
	}

	/* ---------------------------------------------------------------- roster */

	.roster__empty {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		align-items: center;
	}

	.roster + .roster {
		margin-top: var(--space-xl);
	}

	.roster__title {
		padding-bottom: var(--space-s);
		border-bottom: 1px solid var(--edge-faint);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.roster__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(11rem, 100%), 1fr));
		gap: clamp(1.25rem, 2.5vw, 2rem);
		margin-top: var(--space-m);
	}

	.person__photo {
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		border-radius: var(--radius-m);
	}

	.person__photo--empty {
		display: block;
		background: linear-gradient(160deg, rgb(244 244 242 / 0.05), transparent);
		border: 1px solid var(--edge-faint);
	}

	.person__name {
		margin-top: var(--space-s);
		font-size: var(--type-small);
		font-weight: 500;
	}

	.person__role {
		margin-top: 0.2rem;
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	/* ------------------------------------------------------------------ join */

	.join {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.join__title {
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.join__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 1024px) {
		.disciplines {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.discipline:nth-child(2n + 1) {
			padding-left: 0;
			border-left: 0;
		}

		.platform,
		.roster__empty {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 720px) {
		.intro,
		.join {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.disciplines {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}

		.discipline,
		.discipline:nth-child(2n + 1) {
			padding: var(--space-m) 0;
			border-left: 0;
			border-top: 1px solid var(--edge-faint);
		}

		.chain__label {
			white-space: normal;
		}
	}
</style>
