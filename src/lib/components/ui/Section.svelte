<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		id?: string;
		/** Chapter number, e.g. '02'. Rendered in the section head. */
		index?: string;
		label?: string;
		tone?: 'base' | 'void';
		/** Hairline above the section head; on by default. */
		rule?: boolean;
		class?: string;
		children: Snippet;
	};

	let {
		id,
		index,
		label,
		tone = 'base',
		rule = true,
		class: className = '',
		children
	}: Props = $props();
</script>

<section {id} class="section section--{tone} {className}">
	<div class="shell">
		{#if label || index}
			<header class="section__head" class:section__head--rule={rule} use:reveal>
				{#if index}
					<span class="section__index">{index}</span>
				{/if}
				<!-- A chapter marker, not a heading: each section supplies its own h2. -->
				{#if label}
					<p class="section__label">{label}</p>
				{/if}
			</header>
		{/if}

		{@render children()}
	</div>
</section>

<style>
	.section {
		position: relative;
		padding-block: var(--space-3xl);
	}

	.section--void {
		background: var(--surface-void);
	}

	.section__head {
		display: flex;
		align-items: baseline;
		gap: clamp(1.25rem, 4vw, 3rem);
		margin-bottom: var(--space-xl);
	}

	.section__head--rule {
		padding-top: var(--space-s);
		border-top: 1px solid var(--edge-faint);
	}

	.section__index,
	.section__label {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		line-height: 1;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
	}

	.section__index {
		color: var(--text-muted);
	}

	.section__label {
		color: var(--text-secondary);
	}
</style>
