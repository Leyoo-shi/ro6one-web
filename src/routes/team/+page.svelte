<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { departmentIds } from '$lib/content/departments';
	import { resolveText } from '$lib/content/localized';
	import { members } from '$lib/content/members';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.team);

	/** Members are authored as a flat list and grouped here, in department order. */
	const grouped = $derived(
		departmentIds
			.map((id) => ({ id, people: members.filter((member) => member.department === id) }))
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

	<ul class="departments">
		{#each departmentIds as id, index (id)}
			<li class="department" use:reveal={{ delay: index * 55 }}>
				<h3 class="department__name">{i18n.t.departments[id].name}</h3>
				<p class="department__text">{i18n.t.departments[id].description}</p>
			</li>
		{/each}
	</ul>
</Section>

<Section index="02" tone="void">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.roster.title}</h2>
		<p class="lede">{copy.roster.lede}</p>
	</div>

	{#if grouped.length > 0}
		{#each grouped as group (group.id)}
			<div class="roster">
				<h3 class="roster__title">{i18n.t.departments[group.id].name}</h3>

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
		<EmptyState title={copy.roster.empty.title} body={copy.roster.empty.body} />
	{/if}
</Section>

<Section index="03">
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

	/* Departments as a plan view: equal blocks, hairline gutters. */
	.departments {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1.5rem, 3vw, 2.5rem) 0;
	}

	.department {
		padding: 0 clamp(1.25rem, 2.5vw, 2rem);
		border-left: 1px solid var(--edge-faint);
	}

	.department:nth-child(3n + 1) {
		padding-left: 0;
		border-left: 0;
	}

	.department__name {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.department__text {
		max-width: 34ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	/* ---------------------------------------------------------------- roster */

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
		.departments {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.department:nth-child(3n + 1) {
			padding-left: clamp(1.25rem, 2.5vw, 2rem);
			border-left: 1px solid var(--edge-faint);
		}

		.department:nth-child(2n + 1) {
			padding-left: 0;
			border-left: 0;
		}
	}

	@media (max-width: 720px) {
		.intro,
		.join {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.departments {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}

		.department,
		.department:nth-child(3n + 1),
		.department:nth-child(2n + 1) {
			padding: var(--space-m) 0;
			border-left: 0;
			border-top: 1px solid var(--edge-faint);
		}
	}
</style>
