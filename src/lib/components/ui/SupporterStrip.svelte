<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SupporterLogo from '$lib/components/ui/SupporterLogo.svelte';
	import { resolveText } from '$lib/content/localized';
	import { supporters } from '$lib/content/partners';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		label: string;
		/** Internal route to the full treatment, if the strip should offer one. */
		href?: string;
		linkLabel?: string;
		/** Reveal stagger, measured from the block it sits under. */
		delay?: number;
	};

	let { label, href, linkLabel, delay = 0 }: Props = $props();

	const i18n = useI18n();
	const withLogos = supporters.filter((supporter) => supporter.logo);
</script>

<!--
	The compact homepage reading of the same records the Partners page uses.

	Deliberately smaller than the full treatment and deliberately underneath the
	institutional record: this chapter is about Trabzonspor, the school and the
	team, and the season supporters sit beneath that story rather than replacing
	it. The data comes from content/partners.ts — nothing here is duplicated.
-->
{#if withLogos.length > 0}
	<div class="strip" use:reveal={{ delay }}>
		<div class="strip__head">
			<p class="label strip__label">{label}</p>

			{#if href && linkLabel}
				<a class="strip__link" {href}>{linkLabel}</a>
			{/if}
		</div>

		<ul class="strip__list">
			{#each withLogos as supporter (supporter.id)}
				<li class="strip__item">
					<SupporterLogo {supporter} size="strip" />

					<p class="strip__name">{resolveText(supporter.name, i18n.locale)}</p>
					<p class="strip__relationship">
						{resolveText(supporter.relationship, i18n.locale)}
					</p>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.strip {
		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.strip__head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem var(--space-m);

		max-width: 46rem;
	}

	.strip__label {
		color: var(--text-secondary);
	}

	.strip__link {
		font-size: var(--type-small);
		color: var(--text-secondary);
		border-bottom: 1px solid var(--edge);
		transition:
			color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out);
	}

	.strip__link:hover {
		color: var(--text-primary);
		border-color: var(--signal-warm);
	}

	.strip__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
		gap: var(--space-l) clamp(1.5rem, 4vw, 3rem);

		margin-top: var(--space-l);
		/* Two supporters should not stretch to the full width of a 1400px page. */
		max-width: 46rem;
	}

	.strip__name {
		margin-top: 0.85rem;
		font-size: var(--type-small);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--text-primary);
	}

	.strip__relationship {
		margin-top: 0.2rem;
		font-size: var(--type-micro);
		line-height: 1.5;
		color: var(--text-faint);
	}
</style>
