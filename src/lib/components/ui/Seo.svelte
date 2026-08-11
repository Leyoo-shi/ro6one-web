<script lang="ts">
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { site } from '$lib/content/site';
	import { localeMeta } from '$lib/i18n';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		title: string;
		description: string;
		/** The home page owns its full title; every other page gets the suffix. */
		exactTitle?: boolean;
	};

	let { title, description, exactTitle = false }: Props = $props();

	const i18n = useI18n();

	/*
	 * Canonicals are built from a configured origin rather than the request URL:
	 * behind a reverse proxy the inbound host is not something we want to trust
	 * for indexing. Set PUBLIC_SITE_URL to override the default domain.
	 */
	const origin = $derived((env.PUBLIC_SITE_URL || site.url).replace(/\/+$/, ''));
	const canonical = $derived(origin + page.url.pathname);
	const documentTitle = $derived(exactTitle ? title : `${title} — ${site.fullName}`);
	const imageUrl = $derived(site.ogImage ? origin + site.ogImage : '');
</script>

<svelte:head>
	<title>{documentTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.fullName} />
	<meta property="og:title" content={documentTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={localeMeta[i18n.locale].og} />

	<meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={documentTitle} />
	<meta name="twitter:description" content={description} />

	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:image" content={imageUrl} />
	{/if}
</svelte:head>
