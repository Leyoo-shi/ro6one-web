<script lang="ts">
	import '$lib/styles/app.css';

	import { afterNavigate, onNavigate } from '$app/navigation';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import { createI18n } from '$lib/i18n/context.svelte';

	let { data, children } = $props();

	/*
	 * One i18n instance per layout render, seeded from the server-resolved
	 * locale. Every component below reads it through context.
	 */
	const i18n = createI18n(() => data.locale);

	/*
	 * Analytics page views.
	 *
	 * The Google tag in app.html loads with send_page_view disabled, so this is
	 * the single place a view is counted. `afterNavigate` fires for the first
	 * render as well as for every client-side navigation, which means the first
	 * page is counted here rather than twice, and subsequent route changes — which
	 * never reload the document — are not silently lost.
	 *
	 * It runs after the DOM and <svelte:head> have been updated, so the title and
	 * URL read here belong to the page that was actually navigated to.
	 */
	afterNavigate(({ to }) => {
		if (!to || typeof window.gtag !== 'function') return;

		window.gtag('event', 'page_view', {
			page_location: to.url.href,
			page_path: to.url.pathname + to.url.search,
			page_title: document.title
		});
	});

	/*
	 * Cross-fade between routes using the platform's view transitions when they
	 * exist. Feature-detected, motion-preference aware, and a no-op elsewhere —
	 * navigation never waits on it.
	 */
	onNavigate((navigation) => {
		const start = (
			document as Document & {
				startViewTransition?: (callback: () => Promise<void>) => unknown;
			}
		).startViewTransition;

		if (!start) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			start.call(document, async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<a class="skip-link" href="#main">{i18n.t.common.skipToContent}</a>

<Header />

<main id="main">
	{@render children()}
</main>

<Footer />
