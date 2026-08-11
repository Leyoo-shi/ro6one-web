<script lang="ts">
	import { page } from '$app/state';
	import { allNav } from '$lib/content/navigation';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';
	import LanguageSwitcher from '../ui/LanguageSwitcher.svelte';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	const i18n = useI18n();

	/*
	 * A native <dialog> is used on purpose: focus containment, Escape-to-close
	 * and inertness of the page behind it come from the platform instead of a
	 * hand-rolled focus trap.
	 */
	let dialog = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		if (!dialog) return;

		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	});

	$effect(() => {
		if (!open) return;

		const previous = document.documentElement.style.overflow;
		document.documentElement.style.overflow = 'hidden';

		return () => {
			document.documentElement.style.overflow = previous;
		};
	});

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
	}
</script>

<dialog
	bind:this={dialog}
	class="menu"
	aria-label={i18n.t.common.menuTitle}
	oncancel={() => (open = false)}
	onclose={() => (open = false)}
>
	<div class="menu__inner">
		<div class="menu__top">
			<p class="label">{i18n.t.common.menuTitle}</p>

			<button type="button" class="menu__close" onclick={() => (open = false)}>
				<span class="menu__close-label">{i18n.t.common.menuClose}</span>
				<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
					<path d="M2 2 L14 14 M14 2 L2 14" stroke="currentColor" stroke-width="1.2" fill="none" />
				</svg>
			</button>
		</div>

		<nav class="menu__nav" aria-label={i18n.t.common.primaryNavLabel}>
			<ul>
				{#each allNav as item, index (item.href)}
					<li style="--item-index: {index}">
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							onclick={() => (open = false)}
						>
							<span class="menu__index">{String(index + 1).padStart(2, '0')}</span>
							<span class="menu__label">{i18n.t.nav[item.key]}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="menu__foot">
			<div class="menu__identity">
				<p class="label">{site.teamLabel}</p>
				<p class="menu__location">{site.location}</p>
			</div>

			<LanguageSwitcher variant="stacked" />
		</div>
	</div>
</dialog>

<style>
	.menu {
		width: 100%;
		max-width: none;
		height: 100dvh;
		max-height: none;
		margin: 0;
		padding: 0;
		border: 0;

		background: var(--surface-base);
		color: var(--text-primary);
	}

	.menu::backdrop {
		background: rgb(8 9 11 / 0.7);
		backdrop-filter: blur(6px);
	}

	.menu[open] {
		animation: menu-enter var(--duration-base) var(--ease-out);
	}

	.menu__inner {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0 var(--shell-gutter) calc(var(--space-l) + env(safe-area-inset-bottom));
	}

	.menu__top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--header-height);
		border-bottom: 1px solid var(--edge-faint);
	}

	.menu__close {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: var(--text-muted);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.menu__close:hover {
		color: var(--text-primary);
	}

	.menu__close-label {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
	}

	.menu__nav {
		flex: 1;
		display: flex;
		align-items: center;
		padding-block: var(--space-l);
	}

	.menu__nav ul {
		width: 100%;
	}

	.menu__nav li {
		border-bottom: 1px solid var(--edge-faint);
		opacity: 0;
		animation: menu-item-enter 0.5s var(--ease-material) forwards;
		animation-delay: calc(80ms + var(--item-index) * 45ms);
	}

	.menu__nav a {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		padding-block: clamp(0.75rem, 2.4vh, 1.1rem);

		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: var(--tracking-tight);
		color: var(--text-secondary);

		transition: color var(--duration-fast) var(--ease-out);
	}

	.menu__nav a:hover,
	.menu__nav a[aria-current='page'] {
		color: var(--text-primary);
	}

	.menu__index {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-muted);
	}

	.menu__nav a[aria-current='page'] .menu__index {
		color: var(--signal);
	}

	.menu__foot {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.menu__location {
		margin-top: 0.35rem;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	@keyframes menu-enter {
		from {
			opacity: 0;
			transform: translateY(-0.75rem);
		}
	}

	@keyframes menu-item-enter {
		from {
			opacity: 0;
			transform: translateY(0.6rem);
		}

		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.menu__nav li {
			opacity: 1;
			animation: none;
		}
	}
</style>
