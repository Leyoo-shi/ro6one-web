<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import EmptyState from '$lib/components/ui/EmptyState.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import SupporterCard from '$lib/components/ui/SupporterCard.svelte';
	import { institutions, partnershipDocument, supporters } from '$lib/content/partners';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.partners);

	const club = institutions.find((entry) => entry.id === 'trabzonspor');
	const school = institutions.find((entry) => entry.id === 'school');
</script>

<Seo title={i18n.t.seo.partners.title} description={i18n.t.seo.partners.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} tone="claret" figure="01" />

<!--
	The institutional relationship gets a chapter, not a logo tile — and the
	chapter is written in RO6ONE's voice about what the relationship made
	possible, so the team stays the subject of every sentence.
-->
<Section index="01" rule={false} tone="claret">
	<!--
		The signing itself, official club photography, as a wide band. It was a
		narrow side column and an empty aperture before; this is the one moment
		on the page that earns full width.
	-->
	<div class="protocol" use:reveal>
		<MediaFrame id="about.protocol" sizes="(max-width: 1024px) 100vw, 90vw" />
	</div>

	<div class="institution">
		<div class="institution__copy">
			<h2 class="institution__title" use:reveal>{copy.institutional.title}</h2>

			{#each copy.institutional.body as paragraph, index (index)}
				<p class="prose institution__paragraph" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
			{/each}

			<dl class="institution__facts" use:reveal={{ delay: 140 }}>
				<div>
					<dt class="label">{copy.institutional.since}</dt>
					<dd><time datetime="2026-03">03 · 2026</time></dd>
				</div>
				<div>
					<dt class="label">{i18n.t.footer.identity}</dt>
					<dd>{site.legalName}</dd>
				</div>
				{#if club?.url}
					<div>
						<dt class="label">{club.name}</dt>
						<dd>
							<a href={club.url} target="_blank" rel="noopener">trabzonspor.org.tr</a>
						</dd>
					</div>
				{/if}
			</dl>
		</div>
	</div>

	<div class="school" use:reveal>
		<div>
			<h3 class="school__title">{copy.institutional.schoolTitle}</h3>
			<p class="school__body">{copy.institutional.schoolBody}</p>

			<!-- A line and a small portrait. Deliberately not a tribute block. -->
			<div class="principal">
				<div class="principal__portrait">
					<MediaFrame id="about.principal" sizes="88px" showCaption={false} />
				</div>
				<p class="principal__note">
					<span class="label">{copy.institutional.principalLabel}</span>
					{copy.institutional.principalNote}
				</p>
			</div>
		</div>

		{#if school?.url}
			<a class="school__link" href={school.url} target="_blank" rel="noopener">
				trabzonfenlisesi.meb.k12.tr
			</a>
		{/if}
	</div>
</Section>

<Section index="02">
	<div class="why">
		<h2 class="why__title" use:reveal>{copy.why.title}</h2>

		<div class="why__body">
			{#each copy.why.body as paragraph, index (index)}
				<p class="prose why__paragraph" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
			{/each}
		</div>
	</div>
</Section>

<Section index="03" tone="void">
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

<!--
	Two supporters, given the room two real relationships deserve. Not a logo
	wall: each record says what the support actually is, in the organization's
	own terms, and links somewhere the reader can check it.
-->
<Section index="04" tone="steel">
	<div class="intro" use:reveal>
		<h2 class="intro__title">{copy.current.title}</h2>
		<p class="lede">{copy.current.lede}</p>
	</div>

	{#if supporters.length > 0}
		<ul class="supporters">
			{#each supporters as supporter, index (supporter.id)}
				<SupporterCard {supporter} delay={index * 90} />
			{/each}
		</ul>
	{:else}
		<!-- Kept: the list is published, not padded, and may be empty again. -->
		<EmptyState title={copy.current.empty.title} body={copy.current.empty.body} />
	{/if}
</Section>

<!--
	The document is its own short chapter. Sitting inside the supporters section
	made the two read as one pitch; they are different things.
-->
<Section index="05">
	<div class="pack" use:reveal>
		<h2 class="pack__title">{copy.pack.title}</h2>

		<div>
			{#if partnershipDocument}
				<ActionLink href={partnershipDocument}>{copy.pack.title}</ActionLink>
			{:else}
				<p class="pack__body">{copy.pack.body}</p>
			{/if}
		</div>
	</div>
</Section>

<Section index="06">
	<div class="cta" use:reveal>
		<h2 class="cta__title">{copy.cta.title}</h2>
		<div>
			<p class="lede">{copy.cta.body}</p>

			<div class="cta__channel">
				<p class="label">{copy.cta.action}</p>
				<a class="cta__mail" href="mailto:{site.contact.sponsorship}">
					{site.contact.sponsorship}
				</a>
			</div>
		</div>
	</div>
</Section>

<style>
	.protocol {
		margin-bottom: var(--space-2xl);
	}

	.protocol :global(.frame__image) {
		border: 1px solid var(--edge-burgundy);
	}

	/* ----------------------------------------------------------- principal */

	.principal {
		display: flex;
		align-items: center;
		gap: var(--space-m);

		margin-top: var(--space-l);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-burgundy);
	}

	.principal__portrait {
		flex: 0 0 auto;
		width: 5.5rem;
	}

	.principal__portrait :global(.frame__image) {
		border-radius: var(--radius-s);
	}

	.principal__note {
		max-width: 46ch;
		font-size: var(--type-small);
		line-height: 1.55;
		color: var(--text-secondary);
	}

	.principal__note .label {
		display: block;
		margin-bottom: 0.3rem;
		color: var(--claret-bright);
	}

	.institution {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 6vw, 5rem);
		align-items: start;
	}

	.institution__title {
		max-width: 14ch;
		margin-bottom: var(--space-l);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.03;
	}

	.institution__paragraph {
		max-width: 56ch;
	}

	.institution__paragraph + .institution__paragraph {
		margin-top: var(--space-m);
	}

	.institution__facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m) clamp(1.5rem, 4vw, 3rem);

		margin: var(--space-l) 0 0;
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-burgundy);
	}

	.institution__facts dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.institution__facts a,
	.school__link {
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.institution__facts a:hover,
	.school__link:hover {
		border-color: var(--signal-warm);
	}

	.school {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m) var(--space-l);

		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.school__title {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.school__body {
		max-width: 54ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	.school__link {
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	/* -------------------------------------------------------------------- why */

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

	.why__paragraph + .why__paragraph {
		margin-top: var(--space-m);
	}

	/* ---------------------------------------------------------------- support */

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

	/* ------------------------------------------------------------- supporters */

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
	 * Two columns at most, and never narrower than a card that can hold a logo
	 * stage comfortably. With two supporters this is a 2-up on a laptop and a
	 * full-width stack on a phone — no third column waiting to be filled.
	 */
	.supporters {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(22rem, 100%), 1fr));
		gap: clamp(1.25rem, 2.5vw, 2rem);
	}

	.pack {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
		gap: var(--space-m) clamp(2rem, 6vw, 6rem);
		align-items: start;
	}

	.pack__title {
		max-width: 14ch;
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.pack__body {
		max-width: 56ch;
		font-size: var(--type-small);
		line-height: 1.65;
		color: var(--text-muted);
	}

	/* -------------------------------------------------------------------- cta */

	.cta {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.cta__title {
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.cta__channel {
		margin-top: var(--space-l);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.cta__mail {
		display: inline-block;
		margin-top: 0.6rem;

		font-size: var(--type-body-lg);
		letter-spacing: -0.015em;
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.cta__mail:hover {
		border-color: var(--signal-warm);
	}

	@media (max-width: 1024px) {
		.institution {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 900px) {
		.why,
		.intro,
		.pack,
		.cta {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.support__row {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
