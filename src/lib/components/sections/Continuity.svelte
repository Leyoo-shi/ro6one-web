<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.continuity);
</script>

<Section id="continuity" index="03" label={copy.label}>
	<div class="statement">
		<h2 class="statement__title" use:reveal>{copy.title}</h2>

		<div class="statement__body" use:reveal={{ delay: 90 }}>
			<p class="lede">{copy.body}</p>
			<div class="statement__action">
				<ActionLink href="/robotics">{i18n.t.nav.robotics}</ActionLink>
			</div>
		</div>
	</div>

	<ul class="tracks">
		{#each copy.items as item, index (item.name)}
			<li class="track" use:reveal={{ delay: 80 * index }}>
				<h3 class="track__name">{item.name}</h3>
				<p class="track__text">{item.description}</p>
			</li>
		{/each}
	</ul>
</Section>

<style>
	.statement {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 8vw, 8rem);
		align-items: end;
	}

	.statement__title {
		max-width: 11ch;
		font-size: clamp(2.4rem, 5.2vw, 4.75rem);
		font-weight: 600;
		line-height: 0.98;
		letter-spacing: -0.045em;
	}

	.statement__action {
		margin-top: var(--space-l);
	}

	/* Three parallel tracks divided by rules — deliberately not cards. */
	.tracks {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1.5rem, 4vw, 4rem);
		margin-top: var(--space-2xl);
		padding-top: var(--space-l);
		border-top: 1px solid var(--edge-faint);
	}

	.track {
		padding-left: clamp(1rem, 2vw, 1.75rem);
		border-left: 1px solid var(--edge-faint);
	}

	.track:first-child {
		padding-left: 0;
		border-left: 0;
	}

	.track__name {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.track__text {
		margin-top: var(--space-s);
		max-width: 34ch;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.statement {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.tracks {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}

		.track {
			padding: var(--space-m) 0;
			border-left: 0;
			border-top: 1px solid var(--edge-faint);
		}

		.track:first-child {
			padding-top: 0;
			border-top: 0;
		}

		.track:last-child {
			padding-bottom: 0;
		}
	}
</style>
