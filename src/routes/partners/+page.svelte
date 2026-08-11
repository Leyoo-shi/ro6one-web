<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { resolveText } from '$lib/content/localized';
	import { partners, partnershipDocument } from '$lib/content/partners';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.partners);
</script>

<Seo title={i18n.t.seo.partners.title} description={i18n.t.seo.partners.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<Section index="01" rule={false}>
	<div class="why">
		<h2 class="why__title" use:reveal>{copy.why.title}</h2>

		<div class="why__body">
			{#each copy.why.body as paragraph, index (index)}
				<p class="prose why__paragraph" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
			{/each}
		</div>
	</div>
</Section>

<Section index="02" tone="void">
	<h2 class="support__title" use:reveal>{copy.support.title}</h2>

	<!-- A datasheet, not a pricing table: what is needed, in plain rows. -->
	<dl class="support">
		{#each copy.support.items as item (item.name)}
			<div class="support__row" use:reveal>
				<dt class="support__name">{item.name}</dt>
				<dd class="support__text">{item.description}</dd>
			</div>
		{/each}
	</dl>
</Section>

<Section index="03">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.current.title}</h2>
		<p class="lede">{copy.current.lede}</p>
	</div>

	{#if partners.length > 0}
		<ul class="partners">
			{#each partners as partner (partner.name)}
				<li class="partner" class:partner--lead={partner.tier === 'lead'} use:reveal>
					{#if partner.logo}
						<img class="partner__logo" src={partner.logo} alt={partner.name} />
					{:else}
						<p class="partner__name">{partner.name}</p>
					{/if}

					{#if partner.description}
						<p class="partner__text">{resolveText(partner.description, i18n.locale)}</p>
					{/if}

					{#if partner.url}
						<a class="partner__link" href={partner.url} target="_blank" rel="noopener">
							{partner.name}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<EmptyState title={copy.current.empty.title} body={copy.current.empty.body} />
	{/if}

	<div class="pack" use:reveal>
		<h3 class="pack__title">{copy.pack.title}</h3>
		{#if partnershipDocument}
			<ActionLink href={partnershipDocument}>{copy.pack.title}</ActionLink>
		{:else}
			<p class="pack__body">{copy.pack.body}</p>
		{/if}
	</div>
</Section>

<Section index="04">
	<div class="cta" use:reveal>
		<h2 class="cta__title">{copy.cta.title}</h2>
		<div>
			<p class="lede">{copy.cta.body}</p>
			<div class="cta__action">
				<ActionLink href="/contact" size="large">{copy.cta.action}</ActionLink>
			</div>
		</div>
	</div>
</Section>

<style>
	.why {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.why__title {
		max-width: 14ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.04;
	}

	.why__paragraph {
		max-width: 58ch;
		font-size: var(--type-body-lg);
		line-height: 1.6;
	}

	.support__title {
		max-width: 16ch;
		margin-bottom: var(--space-xl);
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.support {
		margin: 0;
	}

	.support__row {
		display: grid;
		grid-template-columns: minmax(0, 16rem) minmax(0, 1fr);
		gap: 0.35rem clamp(1.5rem, 4vw, 4rem);
		align-items: baseline;

		padding-block: clamp(0.9rem, 1.8vw, 1.35rem);
		border-top: 1px solid var(--edge-faint);
	}

	.support__row:last-child {
		border-bottom: 1px solid var(--edge-faint);
	}

	.support__name {
		font-size: var(--type-body);
		font-weight: 500;
		letter-spacing: -0.015em;
	}

	.support__text {
		margin: 0;
		max-width: 56ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: var(--space-xl);
	}

	.intro__title {
		max-width: 14ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.03;
	}

	/*
	 * Partners get room rather than a dense logo strip: each entry is a panel
	 * with its own space, so a single supporter still looks intentional.
	 */
	.partners {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr));
		gap: clamp(1rem, 2vw, 1.75rem);
	}

	.partner {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);

		padding: clamp(1.5rem, 3vw, 2.25rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(244 244 242 / 0.02), transparent);
	}

	.partner--lead {
		grid-column: span 2;
	}

	.partner__logo {
		max-height: 3rem;
		width: auto;
		object-fit: contain;
	}

	.partner__name {
		font-size: var(--type-h3);
		font-weight: 500;
	}

	.partner__text {
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.partner__link {
		margin-top: auto;
		font-size: var(--type-small);
		color: var(--text-secondary);
		border-bottom: 1px solid var(--edge);
		align-self: flex-start;
	}

	.pack {
		margin-top: var(--space-xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.pack__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.pack__body {
		max-width: 52ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.cta {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.cta__title {
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.cta__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 900px) {
		.why,
		.intro,
		.cta {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.support__row {
			grid-template-columns: minmax(0, 1fr);
		}

		.partner--lead {
			grid-column: auto;
		}
	}
</style>
