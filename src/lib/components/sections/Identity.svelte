<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.identity);
</script>

<Section id="identity" index="01" label={copy.label}>
	<div class="identity">
		<h2 class="identity__title" use:reveal>{copy.title}</h2>

		<div class="identity__body">
			{#each copy.body as paragraph, index (index)}
				<p class="prose" use:reveal={{ delay: 80 * index }}>{paragraph}</p>
			{/each}

			<div class="identity__action" use:reveal={{ delay: 160 }}>
				<ActionLink href="/about">{i18n.t.nav.about}</ActionLink>
			</div>
		</div>

		<dl class="identity__principles" use:reveal={{ delay: 120 }}>
			{#each copy.principles as principle (principle.term)}
				<div class="principle">
					<dt class="principle__term">{principle.term}</dt>
					<dd class="principle__gloss">{principle.gloss}</dd>
				</div>
			{/each}
		</dl>
	</div>
</Section>

<style>
	.identity {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(1rem, 2vw, 2rem);
		row-gap: var(--space-xl);
	}

	.identity__title {
		grid-column: 1 / 9;
		max-width: 18ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.identity__body {
		grid-column: 1 / 7;
	}

	.identity__action {
		margin-top: var(--space-l);
	}

	.identity__principles {
		grid-column: 9 / 13;
		grid-row: 1 / 3;
		align-self: end;
		margin: 0;
	}

	.principle {
		padding-block: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.principle:last-child {
		padding-bottom: 0;
	}

	.principle__term {
		font-family: var(--font-mono);
		font-size: var(--type-small);
		font-weight: 500;
		letter-spacing: 0.02em;
		color: var(--text-primary);
	}

	.principle__gloss {
		margin: 0.6rem 0 0;
		font-size: var(--type-small);
		line-height: 1.55;
		color: var(--text-muted);
	}

	@media (max-width: 1024px) {
		.identity__title {
			grid-column: 1 / -1;
		}

		.identity__body {
			grid-column: 1 / 8;
		}

		.identity__principles {
			grid-column: 9 / -1;
			grid-row: auto;
			align-self: start;
		}
	}

	@media (max-width: 820px) {
		.identity {
			grid-template-columns: minmax(0, 1fr);
			row-gap: var(--space-l);
		}

		.identity__title,
		.identity__body,
		.identity__principles {
			grid-column: 1;
		}

		.identity__principles {
			margin-top: var(--space-s);
		}
	}
</style>
