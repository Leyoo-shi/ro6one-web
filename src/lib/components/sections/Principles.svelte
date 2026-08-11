<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.principles);
</script>

<Section id="principles" index="07" label={copy.label}>
	<h2 class="title" use:reveal>{copy.title}</h2>

	<!--
		Two axes rather than two cards: each principle is a line drawn across the
		page, one reading left, one reading right, so the pair feels like a set of
		coordinates the team works inside.
	-->
	<div class="axes">
		<article class="axis axis--first" use:reveal>
			<h3 class="axis__term">{copy.steam.term}</h3>
			<span class="axis__rule" aria-hidden="true"></span>
			<p class="axis__body">{copy.steam.body}</p>
		</article>

		<article class="axis axis--second" use:reveal={{ delay: 100 }}>
			<h3 class="axis__term">{copy.people.term}</h3>
			<span class="axis__rule" aria-hidden="true"></span>
			<p class="axis__body">{copy.people.body}</p>
		</article>
	</div>

	<div class="action" use:reveal>
		<ActionLink href="/impact">{copy.link}</ActionLink>
	</div>
</Section>

<style>
	.title {
		max-width: 20ch;
		margin-bottom: var(--space-2xl);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.axes {
		display: grid;
		gap: var(--space-2xl);
	}

	.axis {
		display: grid;
		grid-template-columns: minmax(0, auto) minmax(2rem, 1fr) minmax(0, 34rem);
		gap: clamp(1rem, 3vw, 2.5rem);
		align-items: center;
	}

	.axis__term {
		font-size: clamp(1.6rem, 3.4vw, 2.9rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1;
		white-space: nowrap;
	}

	.axis__rule {
		height: 1px;
		transform: scaleX(0);
		transition: transform 1.1s var(--ease-material) 120ms;
	}

	:global([data-reveal='visible']) .axis__rule {
		transform: scaleX(1);
	}

	.axis--first .axis__rule {
		background: linear-gradient(to right, var(--edge-burgundy), var(--edge-faint));
		transform-origin: left;
	}

	.axis--second .axis__rule {
		background: linear-gradient(to left, var(--edge-navy), var(--edge-faint));
		transform-origin: right;
	}

	.axis__body {
		font-size: var(--type-body);
		line-height: 1.65;
		color: var(--text-secondary);
	}

	/* The second axis mirrors the first: term on the right, text on the left. */
	.axis--second {
		grid-template-columns: minmax(0, 34rem) minmax(2rem, 1fr) minmax(0, auto);
		text-align: right;
	}

	.axis--second .axis__term {
		order: 3;
	}

	.axis--second .axis__rule {
		order: 2;
	}

	.axis--second .axis__body {
		order: 1;
	}

	.action {
		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	@media (max-width: 900px) {
		.axis,
		.axis--second {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-s);
			text-align: left;
		}

		.axis__term {
			white-space: normal;
		}

		.axis--second .axis__term {
			order: 1;
		}

		.axis--second .axis__rule {
			order: 2;
		}

		.axis--second .axis__body {
			order: 3;
		}

		.axis__rule {
			width: 4rem;
			margin-block: var(--space-2xs);
			transform-origin: left !important;
		}

		.axis--second .axis__rule {
			background: linear-gradient(to right, var(--edge-navy), var(--edge-faint));
		}
	}
</style>
