<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.impact);
</script>

<div class="band">
	<Section id="impact" index="04" label={copy.label} tone="void" rule={false}>
		<div class="impact">
			<h2 class="impact__title" use:reveal>{copy.title}</h2>

			<div class="impact__body" use:reveal={{ delay: 90 }}>
				<p>{copy.body}</p>
				<div class="impact__action">
					<ActionLink href="/impact" size="large">{copy.link}</ActionLink>
				</div>
			</div>
		</div>
	</Section>
</div>

<style>
	/*
	 * The one full-bleed chapter on the page. A light-catching hairline across
	 * the top edge echoes the hero surface without repeating the canvas.
	 */
	.band {
		position: relative;
	}

	.band::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 1px;

		background: linear-gradient(
			to right,
			transparent,
			rgb(244 244 242 / 0.03) 12%,
			rgb(223 230 238 / 0.26) 48%,
			rgb(244 244 242 / 0.03) 82%,
			transparent
		);
	}

	.impact {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 7vw, 7rem);
		align-items: start;
	}

	.impact__title {
		max-width: 13ch;
		font-size: clamp(2.2rem, 4.6vw, 4.25rem);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.04em;
	}

	.impact__body p {
		max-width: 46ch;
		font-size: var(--type-body-lg);
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.impact__action {
		margin-top: var(--space-l);
	}

	@media (max-width: 900px) {
		.impact {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
