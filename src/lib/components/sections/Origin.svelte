<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import TimelineTrack from '$lib/components/ui/TimelineTrack.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.origin);
</script>

<Section id="origin" index="01" label={copy.label}>
	<div class="origin">
		<h2 class="origin__title" use:reveal>{copy.title}</h2>

		<div class="origin__body">
			{#each copy.body as paragraph, index (index)}
				<p class="prose" use:reveal={{ delay: 70 * index }}>{paragraph}</p>
			{/each}

			<dl class="origin__home" use:reveal={{ delay: 140 }}>
				<dt class="label">{copy.schoolLabel}</dt>
				<dd>{site.school}</dd>
			</dl>

			<div class="origin__action" use:reveal={{ delay: 180 }}>
				<ActionLink href="/about">{i18n.t.nav.about}</ActionLink>
			</div>
		</div>

		<div class="origin__media">
			<MediaFrame id="home.origin.workshop" sizes="(max-width: 900px) 100vw, 30vw" />
		</div>
	</div>

	<div class="origin__timeline">
		<TimelineTrack />
	</div>
</Section>

<style>
	.origin {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(1rem, 2vw, 2rem);
		row-gap: var(--space-xl);
	}

	.origin__title {
		grid-column: 1 / 8;
		max-width: 17ch;

		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.origin__body {
		grid-column: 1 / 7;
	}

	.origin__home {
		margin: var(--space-l) 0 0;
		padding-top: var(--space-s);
		border-top: 1px solid var(--edge-faint);
	}

	.origin__home dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.origin__action {
		margin-top: var(--space-l);
	}

	.origin__media {
		grid-column: 9 / 13;
		grid-row: 1 / 3;
		align-self: end;
	}

	.origin__timeline {
		margin-top: var(--space-3xl);
	}

	@media (max-width: 1024px) {
		.origin__title,
		.origin__body {
			grid-column: 1 / 9;
		}

		.origin__media {
			grid-column: 9 / -1;
			grid-row: 1 / 3;
		}
	}

	@media (max-width: 820px) {
		.origin {
			grid-template-columns: minmax(0, 1fr);
			row-gap: var(--space-l);
		}

		.origin__title,
		.origin__body,
		.origin__media {
			grid-column: 1;
			grid-row: auto;
		}

		.origin__media {
			max-width: 22rem;
		}
	}
</style>
