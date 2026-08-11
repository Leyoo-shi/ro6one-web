<script lang="ts">
	import { page } from '$app/state';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();

	const copy = $derived(page.status === 404 ? i18n.t.error.notFound : i18n.t.error.generic);
</script>

<svelte:head>
	<title>{copy.title} — {site.fullName}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="error">
	<div class="shell error__inner">
		<p class="error__status">{page.status}</p>

		<div class="error__body">
			<h1>{copy.title}</h1>
			<p class="lede">{copy.body}</p>

			<div class="error__action">
				<ActionLink href="/">{i18n.t.error.cta}</ActionLink>
			</div>
		</div>

		<p class="error__path">{page.url.pathname}</p>
	</div>
</section>

<style>
	.error {
		display: flex;
		align-items: center;
		min-height: 78svh;
		padding-block: calc(var(--header-height) + var(--space-2xl)) var(--space-2xl);
	}

	.error__inner {
		display: grid;
		grid-template-columns: minmax(0, auto) minmax(0, 1fr);
		gap: clamp(1.5rem, 6vw, 5rem);
		align-items: start;
	}

	.error__status {
		font-family: var(--font-mono);
		font-size: clamp(3.5rem, 9vw, 8rem);
		font-weight: 400;
		line-height: 0.8;
		letter-spacing: -0.06em;

		color: transparent;
		-webkit-text-stroke: 1px var(--edge-strong);
	}

	.error__body h1 {
		max-width: 22ch;
		font-size: var(--type-h2);
	}

	.error__body .lede {
		margin-top: var(--space-s);
		max-width: 40ch;
	}

	.error__action {
		margin-top: var(--space-l);
	}

	.error__path {
		grid-column: 1 / -1;
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.08em;
		color: var(--text-muted);
		overflow-wrap: anywhere;
	}

	@media (max-width: 720px) {
		.error__inner {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
