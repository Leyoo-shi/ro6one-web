<script lang="ts">
	import '$lib/styles/app.css';

	import { onNavigate } from '$app/navigation';
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
