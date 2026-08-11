<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.about);
</script>

<Seo title={i18n.t.seo.about.title} description={i18n.t.seo.about.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<!--
	Inner pages carry the chapter number only: the section's own h2 is the
	title, so the marker never repeats the heading next to it.
-->
<Section index="01" rule={false}>
	<h2 class="story__title" use:reveal>{copy.story.title}</h2>

	<div class="story">
		{#each copy.story.body as paragraph, index (index)}
			<p class="story__paragraph" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
		{/each}
	</div>
</Section>

<Section index="02">
	<div class="frc">
		<h2 class="frc__title" use:reveal>{copy.frc.title}</h2>

		<div class="frc__body">
			{#each copy.frc.body as paragraph, index (index)}
				<p class="prose" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
			{/each}
		</div>
	</div>
</Section>

<Section index="03" tone="void">
	<h2 class="principles__title" use:reveal>{copy.principles.title}</h2>

	<ol class="principles">
		{#each copy.principles.items as item, index (item.name)}
			<li class="principle" use:reveal={{ delay: index * 55 }}>
				<span class="principle__index" aria-hidden="true">
					{String(index + 1).padStart(2, '0')}
				</span>
				<h3 class="principle__name">{item.name}</h3>
				<p class="principle__text">{item.description}</p>
			</li>
		{/each}
	</ol>
</Section>

<Section index="04">
	<div class="organisation" use:reveal>
		<h2 class="organisation__title">{copy.organisation.title}</h2>
		<div>
			<p class="lede">{copy.organisation.body}</p>
			<div class="organisation__action">
				<ActionLink href="/team">{copy.organisation.cta}</ActionLink>
			</div>
		</div>
	</div>
</Section>

<style>
	.story__title {
		max-width: 16ch;
		margin-bottom: var(--space-l);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.04;
	}

	/* Long-form copy set as two columns of comfortable measure. */
	.story {
		columns: 2;
		column-gap: clamp(2rem, 6vw, 5rem);
		max-width: 62rem;
	}

	.story__paragraph {
		break-inside: avoid;
		margin-bottom: var(--space-m);
		font-size: var(--type-body-lg);
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.story__paragraph:first-child {
		color: var(--text-primary);
	}

	.frc {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.frc__title {
		max-width: 14ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.04;
	}

	.frc__body .prose {
		max-width: 56ch;
	}

	.principles__title {
		max-width: 18ch;
		margin-bottom: var(--space-xl);
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0 clamp(2rem, 6vw, 5rem);
	}

	.principle {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		gap: 0.35rem 1rem;
		align-items: baseline;

		padding-block: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.principle__index {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.12em;
		color: var(--signal);
		opacity: 0.75;
	}

	.principle__name {
		font-size: var(--type-body-lg);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.principle__text {
		grid-column: 2;
		max-width: 44ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.organisation {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.organisation__title {
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.organisation__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 900px) {
		.story {
			columns: 1;
		}

		.frc,
		.organisation {
			grid-template-columns: minmax(0, 1fr);
		}

		.principles {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
