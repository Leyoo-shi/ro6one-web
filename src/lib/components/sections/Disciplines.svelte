<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { departmentIds } from '$lib/content/departments';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.machine);
</script>

<Section id="machine" index="05" label={copy.label}>
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.title}</h2>
		<p class="lede intro__lede">{copy.lede}</p>
	</div>

	<div class="layout">
		<!-- A drawn index rather than a card grid: rows on hairlines. -->
		<ol class="index">
			{#each departmentIds as id, position (id)}
				<li class="row" use:reveal={{ delay: position * 60 }}>
					<span class="row__index" aria-hidden="true">{String(position + 1).padStart(2, '0')}</span>
					<h3 class="row__name">{i18n.t.departments[id].name}</h3>
					<p class="row__text">{i18n.t.departments[id].description}</p>
				</li>
			{/each}
		</ol>

		<!--
			The honest counterweight to the list: this team has not built a
			competition robot yet, and the page says so where it matters.
		-->
		<aside class="status" use:reveal={{ delay: 120 }}>
			<p class="label">{i18n.t.robotics.status.label}</p>
			<p class="status__value">
				<span class="status__dot" aria-hidden="true"></span>
				{i18n.t.robotics.status.value}
			</p>
			<p class="status__note">{i18n.t.robotics.status.note}</p>

			<div class="status__action">
				<ActionLink href="/robotics">{copy.link}</ActionLink>
			</div>
		</aside>
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

	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 4rem);
		align-items: start;
	}

	.row {
		display: grid;
		grid-template-columns: 3rem minmax(0, 11rem) minmax(0, 1fr);
		gap: clamp(1rem, 2.5vw, 2.5rem);
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
		max-width: 46ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.status {
		padding: clamp(1.25rem, 2.5vw, 1.75rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(109 39 57 / 0.1), transparent 65%);
	}

	.status__value {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: var(--space-s);

		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.status__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--signal-warm);
		box-shadow: 0 0 0 4px var(--signal-warm-dim);
	}

	.status__note {
		max-width: 34ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.status__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 1024px) {
		.layout {
			grid-template-columns: minmax(0, 1fr);
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
	}
</style>
