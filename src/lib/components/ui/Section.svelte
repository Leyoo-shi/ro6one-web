<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		id?: string;
		/** Chapter number, e.g. '02'. Rendered in the section head. */
		index?: string;
		label?: string;
		/**
		 * The room this chapter happens in.
		 *
		 * `base|void|navy|burgundy` are the original near-black surfaces, kept
		 * so nothing that still asks for them breaks. `paper|arena|claret|steel`
		 * are real rooms with their own light, and `paper` additionally flips
		 * the text ramp so every child component inverts with it.
		 */
		tone?: 'base' | 'void' | 'navy' | 'burgundy' | 'paper' | 'arena' | 'claret' | 'steel';
		/** Hairline above the section head; on by default. */
		rule?: boolean;
		/** Drops the vertical padding — for scenes that manage their own height. */
		flush?: boolean;
		/** Lets content out of the shell so a scene can bleed to the viewport edge. */
		bleed?: boolean;
		class?: string;
		children: Snippet;
	};

	let {
		id,
		index,
		label,
		tone = 'base',
		rule = true,
		flush = false,
		bleed = false,
		class: className = '',
		children
	}: Props = $props();
</script>

<section
	{id}
	class="section section--{tone} room--{tone} {className}"
	class:section--flush={flush}
	class:section--bleed={bleed}
>
	<div class="section__inner" class:shell={!bleed}>
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
		/* Colour and the text ramp come from the shared .room--* class. */
		position: relative;
		/*
		 * Asymmetric on purpose. The chapter marker already carries its own
		 * space underneath it, so a symmetric --space-3xl left roughly 250px of
		 * undifferentiated nothing above every single chapter — the largest
		 * single cause of the page feeling like nine identical slabs.
		 */
		padding-block: var(--space-2xl) var(--space-3xl);
	}

	.section--flush {
		padding-block: 0;
	}

	/*
	 * The same-room adjacency collapse lives in styles/app.css, not here:
	 * Svelte scopes styles per component and prunes a sibling combinator it
	 * cannot statically prove, so `.section + .section` written in this block
	 * compiles away as an unused selector and silently does nothing.
	 */

	/*
	 * A bleeding scene supplies its own presence, so it does not also need a
	 * hundred-odd pixels of empty room above the chapter marker.
	 */
	.section--bleed {
		padding-top: var(--space-xl);
	}

	.section--bleed > .section__inner {
		width: 100%;
	}

	.section__head {
		display: flex;
		align-items: baseline;
		gap: clamp(1.25rem, 4vw, 3rem);
		margin-bottom: var(--space-xl);
	}

	.section--bleed .section__head {
		padding-inline: var(--shell-gutter);
	}

	.section__head--rule {
		padding-top: var(--space-s);
		border-top: 1px solid var(--edge-faint);
	}

	.section--bleed .section__head--rule {
		margin-inline: var(--shell-gutter);
		padding-inline: 0;
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
		color: var(--signal);
	}

	.section__label {
		color: var(--text-secondary);
	}
</style>
