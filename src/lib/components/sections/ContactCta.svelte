<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.contact);
</script>

<Section id="contact" index="06" label={copy.label}>
	<div class="cta">
		<h2 class="cta__title" use:reveal>{copy.title}</h2>

		<div class="cta__aside" use:reveal={{ delay: 90 }}>
			<p class="lede">{copy.body}</p>

			<div class="cta__action">
				<ActionLink href="/contact" size="large">{copy.link}</ActionLink>
			</div>
		</div>
	</div>

	<dl class="cta__meta" use:reveal={{ delay: 140 }}>
		<div>
			<dt class="label">{i18n.t.contact.channels.locationLabel}</dt>
			<dd>{site.location}</dd>
		</div>
		<div>
			<dt class="label">{i18n.t.hero.meta.team}</dt>
			<dd>{site.teamLabel}</dd>
		</div>
		{#if site.contact.email}
			<div>
				<dt class="label">{i18n.t.contact.channels.emailLabel}</dt>
				<dd><a href="mailto:{site.contact.email}">{site.contact.email}</a></dd>
			</div>
		{/if}
	</dl>
</Section>

<style>
	.cta {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 8vw, 8rem);
		align-items: end;
	}

	.cta__title {
		font-size: clamp(3rem, 7.5vw, 7rem);
		font-weight: 600;
		line-height: 0.92;
		letter-spacing: -0.055em;
	}

	.cta__action {
		margin-top: var(--space-l);
	}

	.cta__meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m) clamp(2rem, 6vw, 5rem);

		margin: var(--space-2xl) 0 0;
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.cta__meta dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.cta__meta a {
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.cta__meta a:hover {
		border-color: var(--text-secondary);
	}

	@media (max-width: 900px) {
		.cta {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}
	}
</style>
