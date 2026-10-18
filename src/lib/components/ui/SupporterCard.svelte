<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import SupporterLogo from '$lib/components/ui/SupporterLogo.svelte';
	import { resolveText } from '$lib/content/localized';
	import type { Supporter } from '$lib/content/partners';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		supporter: Supporter;
		/** Reveal stagger, so a row of cards does not all arrive at once. */
		delay?: number;
	};

	let { supporter, delay = 0 }: Props = $props();

	const i18n = useI18n();
	const name = $derived(resolveText(supporter.name, i18n.locale));
	const relationship = $derived(resolveText(supporter.relationship, i18n.locale));
	const description = $derived(resolveText(supporter.description, i18n.locale));
	/* Shown next to the link so the destination is legible before the click. */
	const host = $derived(supporter.url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''));
</script>

<!--
	A supporter record, not a sponsor tile.

	The order is deliberate: the mark, then what the relationship actually is,
	then who it is, then what it means, then where to verify it. Everything a
	reader needs is in text — nothing important lives in a hover state.
-->
<li class="supporter" use:reveal={{ delay }}>
	{#if supporter.logo}
		<SupporterLogo {supporter} />
	{/if}

	<div class="supporter__body">
		<p class="label supporter__relationship">{relationship}</p>
		<h3 class="supporter__name">{name}</h3>

		{#if description}
			<p class="supporter__text">{description}</p>
		{/if}
	</div>

	{#if supporter.url}
		<a class="supporter__link" href={supporter.url} target="_blank" rel="noopener">
			<span class="supporter__linkLabel">{i18n.t.partners.current.visit}</span>
			{#if host}
				<span class="supporter__host">{host}</span>
			{/if}
			<svg
				class="supporter__glyph"
				viewBox="0 0 10 10"
				width="10"
				height="10"
				aria-hidden="true"
				focusable="false"
			>
				<path
					d="M2.5 7.5 7.5 2.5M3.4 2.5h4.1v4.1"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
				/>
			</svg>
			<span class="supporter__srOnly">({name})</span>
		</a>
	{/if}
</li>

<style>
	.supporter {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);

		padding: clamp(1.5rem, 3vw, 2.5rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(244 244 242 / 0.025), transparent 70%);
	}

	.supporter__body {
		flex: 1 1 auto;
	}

	.supporter__relationship {
		color: var(--signal);
	}

	.supporter__name {
		margin-top: var(--space-s);
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
	}

	.supporter__text {
		max-width: 46ch;
		margin-top: 0.75rem;
		font-size: var(--type-small);
		line-height: 1.65;
		color: var(--text-muted);
	}

	.supporter__link {
		display: inline-flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 0.3rem 0.6rem;
		align-self: flex-start;

		/* A comfortable target on a phone without turning into a button. */
		padding-block: 0.4rem;
		font-size: var(--type-small);
		color: var(--text-secondary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.supporter__linkLabel {
		font-weight: 500;
		color: var(--text-primary);
		border-bottom: 1px solid var(--edge-strong);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.supporter__host {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.02em;
		color: var(--text-faint);
	}

	.supporter__glyph {
		align-self: center;
		color: var(--text-muted);
		transition:
			transform var(--duration-base) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.supporter__link:hover .supporter__linkLabel {
		border-color: var(--signal-warm);
	}

	.supporter__link:hover .supporter__glyph {
		transform: translate(0.15rem, -0.15rem);
		color: var(--text-primary);
	}

	/* The name is already on the card; screen readers get it on the link too. */
	.supporter__srOnly {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
</style>
