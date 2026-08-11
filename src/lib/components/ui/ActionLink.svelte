<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		/** `large` is for section-closing calls to action. */
		size?: 'default' | 'large';
		external?: boolean;
		children: Snippet;
	};

	let { href, size = 'default', external = false, children }: Props = $props();
</script>

<a
	class="action action--{size}"
	{href}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
>
	<span class="action__label">{@render children()}</span>

	<span class="action__glyph" aria-hidden="true">
		<svg viewBox="0 0 22 8" width="22" height="8" preserveAspectRatio="none">
			<path d="M0 4h20M17 1l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1" />
		</svg>
	</span>
</a>

<style>
	.action {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;

		color: var(--text-primary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.action__label {
		position: relative;
		font-size: var(--type-small);
		font-weight: 500;
		letter-spacing: 0.005em;
	}

	.action--large .action__label {
		font-size: var(--type-body);
	}

	.action__label::after {
		content: '';
		position: absolute;
		inset: auto 0 -0.35rem;
		height: 1px;

		background: currentColor;
		opacity: 0.28;
		transform-origin: left;
		transition:
			opacity var(--duration-base) var(--ease-out),
			transform var(--duration-base) var(--ease-out);
	}

	.action__glyph {
		display: flex;
		color: var(--text-muted);
		transition:
			transform var(--duration-base) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.action:hover .action__label::after {
		opacity: 0.75;
	}

	.action:hover .action__glyph {
		transform: translateX(0.3rem);
		color: var(--text-primary);
	}
</style>
