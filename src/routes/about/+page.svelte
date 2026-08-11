<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import TimelineTrack from '$lib/components/ui/TimelineTrack.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.about);
</script>

<Seo title={i18n.t.seo.about.title} description={i18n.t.seo.about.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<Section index="01" rule={false}>
	<h2 class="story__title" use:reveal>{copy.story.title}</h2>

	<div class="story">
		{#each copy.story.body as paragraph, index (index)}
			<p class="story__paragraph" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
		{/each}
	</div>

	<div class="story__timeline">
		<TimelineTrack />
	</div>
</Section>

<Section index="02" tone="navy">
	<div class="home">
		<div class="home__copy">
			<h2 class="home__title" use:reveal>{copy.home.title}</h2>

			{#each copy.home.body as paragraph, index (index)}
				<p class="prose home__paragraph" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
			{/each}

			<dl class="home__facts" use:reveal={{ delay: 140 }}>
				<div>
					<dt class="label">{i18n.t.home.origin.schoolLabel}</dt>
					<dd>{site.school}</dd>
				</div>
				<div>
					<dt class="label">{i18n.t.footer.identity}</dt>
					<dd>{site.legalName}</dd>
				</div>
				<div>
					<dt class="label">{i18n.t.contact.channels.locationLabel}</dt>
					<dd>{site.location}</dd>
				</div>
			</dl>
		</div>

		<div class="home__media">
			<MediaFrame id="about.school" sizes="(max-width: 900px) 100vw, 45vw" />
			<MediaFrame id="about.protocol" sizes="(max-width: 900px) 100vw, 45vw" />
		</div>
	</div>
</Section>

<Section index="03">
	<div class="frc">
		<h2 class="frc__title" use:reveal>{copy.frc.title}</h2>

		<div class="frc__body">
			{#each copy.frc.body as paragraph, index (index)}
				<p class="prose" use:reveal={{ delay: index * 70 }}>{paragraph}</p>
			{/each}
		</div>
	</div>
</Section>

<Section index="04" tone="void">
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

<Section index="05">
	<div class="next" use:reveal>
		<h2 class="next__title">{copy.next.title}</h2>
		<div>
			<p class="lede">{copy.next.body}</p>
			<div class="next__action">
				<ActionLink href="/team">{copy.next.cta}</ActionLink>
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

	.story__timeline {
		margin-top: var(--space-3xl);
	}

	.home {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 6vw, 5rem);
		align-items: start;
	}

	.home__title {
		max-width: 12ch;
		margin-bottom: var(--space-l);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.04;
	}

	.home__paragraph + .home__paragraph {
		margin-top: var(--space-m);
	}

	.home__facts {
		display: grid;
		gap: var(--space-m);
		margin: var(--space-l) 0 0;
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.home__facts dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.home__media {
		display: grid;
		gap: clamp(0.75rem, 2vw, 1.5rem);
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

	.frc__body .prose + .prose {
		margin-top: var(--space-m);
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
		opacity: 0.8;
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

	.next {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
	}

	.next__title {
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.next__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 900px) {
		.story {
			columns: 1;
		}

		.home,
		.frc,
		.next,
		.principles {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
