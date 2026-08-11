<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { departmentIds } from '$lib/content/departments';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.disciplines);
</script>

<Section id="disciplines" index="02" label={copy.label}>
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.title}</h2>
		<p class="lede intro__lede">{copy.lede}</p>
	</div>

	<ol class="index">
		{#each departmentIds as id, position (id)}
			<li class="row" use:reveal={{ delay: position * 60 }}>
				<span class="row__index" aria-hidden="true">{String(position + 1).padStart(2, '0')}</span>
				<h3 class="row__name">{i18n.t.departments[id].name}</h3>
				<p class="row__text">{i18n.t.departments[id].description}</p>
			</li>
		{/each}
	</ol>

	<div class="coda" use:reveal>
		<h3 class="coda__title">{i18n.t.home.team.title}</h3>
		<p class="coda__body">{i18n.t.home.team.body}</p>
		<ActionLink href="/team">{i18n.t.home.team.link}</ActionLink>
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
		max-width: 16ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.intro__lede {
		padding-bottom: 0.35rem;
	}

	/* A drawn index rather than a card grid: rows on hairlines. */
	.row {
		display: grid;
		grid-template-columns: 3rem minmax(0, 15rem) minmax(0, 1fr);
		gap: clamp(1rem, 3vw, 3rem);
		align-items: baseline;

		padding-block: clamp(1.1rem, 2.4vw, 1.9rem);
		border-top: 1px solid var(--edge-faint);

		transition: background-color var(--duration-base) var(--ease-out);
	}

	.index li:last-child {
		border-bottom: 1px solid var(--edge-faint);
	}

	.row:hover {
		background: rgb(244 244 242 / 0.02);
	}

	.row__index {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.12em;
		color: var(--text-muted);
		transition: color var(--duration-base) var(--ease-out);
	}

	.row:hover .row__index {
		color: var(--signal);
	}

	.row__name {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
		transition: transform var(--duration-base) var(--ease-out);
	}

	.row:hover .row__name {
		transform: translateX(0.35rem);
	}

	.row__text {
		max-width: 52ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.coda {
		max-width: 34rem;
		margin-top: var(--space-2xl);
		margin-left: auto;
		text-align: right;
	}

	.coda__title {
		font-size: var(--type-h3);
		font-weight: 550;
	}

	.coda__body {
		margin: var(--space-s) 0 var(--space-m);
		color: var(--text-secondary);
	}

	@media (max-width: 1024px) {
		.row {
			grid-template-columns: 2.5rem minmax(0, 12rem) minmax(0, 1fr);
		}
	}

	@media (max-width: 820px) {
		.intro {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.row {
			grid-template-columns: 2.25rem minmax(0, 1fr);
			gap: 0.5rem 1rem;
		}

		.row__text {
			grid-column: 2;
		}

		.coda {
			margin-left: 0;
			text-align: left;
		}
	}
</style>
