<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.partners);
</script>

<Section id="partners" index="05" label={copy.label}>
	<div class="partners">
		<div class="partners__lead" use:reveal>
			<h2 class="partners__title">{copy.title}</h2>
			<p class="lede">{copy.body}</p>
		</div>

		<!-- Support types as an inline rail: a list of openings, not a logo wall. -->
		<ul class="rail" use:reveal={{ delay: 100 }}>
			{#each i18n.t.partners.support.items as item (item.name)}
				<li>{item.name}</li>
			{/each}
		</ul>

		<div class="partners__action" use:reveal={{ delay: 140 }}>
			<ActionLink href="/partners">{copy.link}</ActionLink>
		</div>
	</div>
</Section>

<style>
	.partners__title {
		max-width: 20ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.04;
		margin-bottom: var(--space-m);
	}

	.rail {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 0;
		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.rail li {
		display: flex;
		align-items: center;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.rail li:not(:last-child)::after {
		content: '';
		width: 1px;
		height: 0.7rem;
		margin-inline: clamp(0.75rem, 2vw, 1.75rem);
		background: var(--edge);
	}

	.partners__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 640px) {
		.rail {
			gap: 0.85rem 0;
		}

		.rail li:not(:last-child)::after {
			margin-inline: 0.85rem;
		}
	}
</style>
