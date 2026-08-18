<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import TimelineTrack from '$lib/components/ui/TimelineTrack.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.origin);
</script>

<!--
	02 — the daylight room.

	Everything before this is a dark room: the hero, the birthday band, the
	claret people scene. Origin turns the lights on. It is the one chapter that
	is genuinely a document rather than a scene — a printed page with a year set
	as structure, a measured column of text, and the timeline drawn to scale
	underneath it. The contrast is the point: the page has to prove early that
	it changes rooms, or the reader stops expecting it to.
-->
<Section id="origin" index="02" label={copy.label} tone="paper">
	<div class="origin">
		<header class="origin__head">
			<p class="origin__month" use:reveal>{copy.month}</p>

			<h2 class="origin__title">
				<span class="origin__year" use:reveal={{ delay: 60 }}>{copy.year}</span>
				<span class="origin__after" use:reveal={{ delay: 140 }}>{copy.title}</span>
			</h2>
		</header>

		<div class="origin__body">
			{#each copy.body as paragraph, index (index)}
				<p class="prose" use:reveal={{ delay: 70 * index }}>{paragraph}</p>
			{/each}

			<div class="origin__action" use:reveal={{ delay: 180 }}>
				<ActionLink href="/about">{i18n.t.nav.about}</ActionLink>
			</div>
		</div>

		<dl class="origin__home" use:reveal={{ delay: 140 }}>
			<dt class="label">{copy.schoolLabel}</dt>
			<dd>{site.school}</dd>
		</dl>
	</div>

	<div class="origin__timeline">
		<TimelineTrack />
	</div>
</Section>

<style>
	/*
	 * A faint ruled grid, the way a drawing sheet has one. It is barely visible
	 * and that is deliberate — it gives the paper a surface without becoming a
	 * decorative pattern.
	 */
	.origin {
		position: relative;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(1rem, 2vw, 2rem);
		row-gap: var(--space-xl);
	}

	.origin__head {
		grid-column: 1 / 13;
	}

	.origin__month {
		margin: 0 0 0.4rem;
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--claret);
	}

	/*
	 * Year and sentence sit side by side rather than stacked: stacked, the year
	 * left the whole right half of the room empty, and an empty right half is
	 * what the old graphite chapters already did nine times.
	 */
	.origin__title {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: end;
		column-gap: clamp(1.5rem, 4vw, 4rem);
		margin: 0;
	}

	/* The year is architecture, not text: it sets the scale of the whole room. */
	.origin__year {
		font-size: var(--type-mega);
		font-weight: 600;
		line-height: 0.82;
		letter-spacing: var(--tracking-mega);
		color: var(--ink-text);
	}

	.origin__after {
		max-width: 16ch;
		padding-bottom: clamp(0.4rem, 1.2vw, 1.4rem);
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--type-h2);
		font-weight: 400;
		line-height: 1.05;
		letter-spacing: -0.015em;
		color: var(--blue-deep);
	}

	.origin__body {
		grid-column: 1 / 7;
		max-width: 44ch;
	}

	.origin__action {
		margin-top: var(--space-l);
	}

	/*
	 * The school sits in the margin like a printed marginal note rather than in
	 * the text column — it is a fact about the document, not part of the story.
	 */
	.origin__home {
		grid-column: 9 / 13;
		align-self: start;
		margin: 0;
		padding-top: var(--space-s);
		border-top: 2px solid var(--claret);
	}

	.origin__home dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-body-lg);
		font-weight: 500;
		line-height: 1.25;
		color: var(--ink-text);
	}

	.origin__timeline {
		margin-top: var(--space-3xl);
		padding-top: var(--space-xl);
		border-top: 1px solid var(--ink-edge-faint);
	}

	@media (max-width: 1024px) {
		.origin__body {
			grid-column: 1 / 9;
		}

		.origin__home {
			grid-column: 9 / -1;
		}
	}

	@media (max-width: 820px) {
		.origin {
			grid-template-columns: minmax(0, 1fr);
			row-gap: var(--space-l);
		}

		.origin__head,
		.origin__body,
		.origin__home {
			grid-column: 1;
		}

		/* Side by side stops working long before the year stops being legible. */
		.origin__title {
			grid-template-columns: minmax(0, 1fr);
			row-gap: 0.6rem;
		}

		.origin__after {
			max-width: 22ch;
			padding-bottom: 0;
			font-size: var(--type-h3);
		}
	}
</style>
