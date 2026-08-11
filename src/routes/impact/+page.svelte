<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.impact);
</script>

<Seo title={i18n.t.seo.impact.title} description={i18n.t.seo.impact.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<Section index="01" rule={false}>
	<!--
		The two phrases carry the section: large type, generous space, the second
		one stepped to the right so the pair reads as a sequence, not a grid.
	-->
	<div class="phrase" use:reveal>
		<h2 class="phrase__term">{copy.steam.title}</h2>
		<p class="phrase__body">{copy.steam.body}</p>
	</div>

	<div class="phrase phrase--offset" use:reveal={{ delay: 90 }}>
		<h2 class="phrase__term">{copy.people.title}</h2>
		<p class="phrase__body">{copy.people.body}</p>
	</div>
</Section>

<Section index="02" tone="void">
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

<Section index="03">
	<div class="closing">
		<div class="closing__record" use:reveal>
			<h2 class="closing__title">{copy.record.title}</h2>
			<p class="prose">{copy.record.body}</p>
		</div>

		<div class="closing__collaborate" use:reveal={{ delay: 90 }}>
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
		text-align: left;
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
		opacity: 0.75;
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

	@media (max-width: 900px) {
		.intro,
		.focus,
		.closing {
			grid-template-columns: minmax(0, 1fr);
		}

		.intro {
			align-items: start;
		}
	}
</style>
