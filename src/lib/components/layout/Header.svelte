<script lang="ts">
	import { page } from '$app/state';
	import { contactNav, primaryNav } from '$lib/content/navigation';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';
	import LanguageSwitcher from '../ui/LanguageSwitcher.svelte';
	import MobileMenu from './MobileMenu.svelte';

	const i18n = useI18n();

	let scrolled = $state(false);
	let menuOpen = $state(false);

	/*
	 * The header is transparent over the hero surface and only picks up a
	 * material of its own once content is scrolling underneath it.
	 */
	$effect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			scrolled = window.scrollY > 28;
		};

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	});

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
	}
</script>

<header class="header" class:header--scrolled={scrolled}>
	<div class="shell header__inner">
		<a class="brand" href="/">
			<span class="brand__mark">{site.name}</span>
			<span class="brand__rule" aria-hidden="true"></span>
			<span class="brand__number">{site.teamNumber}</span>
		</a>

		<nav class="nav" aria-label={i18n.t.common.primaryNavLabel}>
			<ul>
				{#each primaryNav as item (item.href)}
					<li>
						<a
							class="nav__link"
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
						>
							{i18n.t.nav[item.key]}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header__aside">
			<LanguageSwitcher />

			<span class="header__divider" aria-hidden="true"></span>

			<a
				class="header__action"
				href={contactNav.href}
				aria-current={isActive(contactNav.href) ? 'page' : undefined}
			>
				{i18n.t.nav[contactNav.key]}
			</a>
		</div>

		<button
			type="button"
			class="header__menu"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = true)}
		>
			<span class="header__menu-label">{i18n.t.common.menuTitle}</span>
			<span class="header__menu-icon" aria-hidden="true">
				<span></span>
				<span></span>
			</span>
			<span class="visually-hidden">{i18n.t.common.menuOpen}</span>
		</button>

		<span class="header__rule" aria-hidden="true"></span>
	</div>
</header>

<MobileMenu bind:open={menuOpen} />

<style>
	.header {
		position: fixed;
		inset: 0 0 auto;
		z-index: var(--z-header);
	}

	/* Material appears on scroll only; over the hero the header is glass-free. */
	.header::before {
		content: '';
		position: absolute;
		inset: 0;

		background: rgb(13 14 17 / 0.68);
		backdrop-filter: blur(16px) saturate(120%);
		-webkit-backdrop-filter: blur(16px) saturate(120%);

		opacity: 0;
		transition: opacity var(--duration-base) var(--ease-out);
	}

	.header--scrolled::before {
		opacity: 1;
	}

	.header__inner {
		position: relative;
		display: flex;
		align-items: center;
		gap: clamp(1rem, 3vw, 2.75rem);
		height: var(--header-height);
	}

	/* Hairline stops at the content gutters — a drawn rule, not a UI bar. */
	.header__rule {
		position: absolute;
		bottom: 0;
		left: var(--shell-gutter);
		right: var(--shell-gutter);
		height: 1px;

		background: var(--edge-faint);
		opacity: 0;
		transition: opacity var(--duration-base) var(--ease-out);
	}

	.header--scrolled .header__rule {
		opacity: 1;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-right: auto;
	}

	.brand__mark {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--text-primary);
	}

	.brand__rule {
		width: 1.25rem;
		height: 1px;
		background: var(--edge-strong);
	}

	.brand__number {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.14em;
		color: var(--text-muted);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.brand:hover .brand__number {
		color: var(--text-secondary);
	}

	.nav ul {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.2vw, 2rem);
	}

	.nav__link {
		position: relative;
		display: block;
		padding-block: 0.35rem;

		font-size: var(--type-small);
		font-weight: 450;
		letter-spacing: 0.005em;
		color: var(--text-muted);

		transition: color var(--duration-fast) var(--ease-out);
	}

	.nav__link::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 1px;

		background: currentColor;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--duration-base) var(--ease-out);
	}

	.nav__link:hover {
		color: var(--text-primary);
	}

	.nav__link:hover::after {
		transform: scaleX(1);
	}

	.nav__link[aria-current='page'] {
		color: var(--text-primary);
	}

	.nav__link[aria-current='page']::after {
		background: var(--signal);
		transform: scaleX(1);
	}

	.header__aside {
		display: flex;
		align-items: center;
		gap: clamp(0.85rem, 1.6vw, 1.4rem);
	}

	.header__divider {
		width: 1px;
		height: 1rem;
		background: var(--edge);
	}

	.header__action {
		padding: 0.5rem 0.9rem;
		border: 1px solid var(--edge);
		border-radius: var(--radius-s);

		font-size: var(--type-small);
		letter-spacing: 0.005em;
		color: var(--text-secondary);

		transition:
			border-color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.header__action:hover {
		border-color: var(--edge-strong);
		background: rgb(244 244 242 / 0.05);
		color: var(--text-primary);
	}

	.header__action[aria-current='page'] {
		border-color: var(--signal-dim);
		color: var(--text-primary);
	}

	.header__menu {
		display: none;
		align-items: center;
		gap: 0.6rem;
		color: var(--text-secondary);
	}

	.header__menu-label {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
	}

	.header__menu-icon {
		display: grid;
		gap: 4px;
		width: 1.1rem;
	}

	.header__menu-icon span {
		height: 1px;
		background: currentColor;
	}

	.header__menu-icon span:last-child {
		width: 65%;
		margin-left: auto;
		transition: width var(--duration-fast) var(--ease-out);
	}

	.header__menu:hover .header__menu-icon span:last-child {
		width: 100%;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	@media (max-width: 960px) {
		.nav,
		.header__aside {
			display: none;
		}

		.header__menu {
			display: flex;
		}
	}
</style>
