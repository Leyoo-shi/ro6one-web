<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.contact);
</script>

<Section id="contact" index="09" label={copy.label}>
	<div class="cta">
		<h2 class="cta__title" use:reveal>{copy.title}</h2>

		<div class="cta__aside" use:reveal={{ delay: 90 }}>
			<p class="lede">{copy.body}</p>

			<div class="cta__action">
				<ActionLink href="/contact" size="large">{copy.link}</ActionLink>
			</div>
		</div>
	</div>

	<!-- Real destinations, written out. Addresses are readable, not hidden behind icons. -->
	<div class="channels" use:reveal={{ delay: 120 }}>
		<div class="channel">
			<p class="label">{i18n.t.contact.channels.generalLabel}</p>
			<a class="channel__value" href="mailto:{site.contact.general}">{site.contact.general}</a>
		</div>

		<div class="channel">
			<p class="label">{i18n.t.contact.channels.sponsorshipLabel}</p>
			<a class="channel__value" href="mailto:{site.contact.sponsorship}">
				{site.contact.sponsorship}
			</a>
		</div>

		<div class="channel channel--social">
			<p class="label">{i18n.t.contact.channels.socialLabel}</p>
			<ul>
				{#each site.social as link (link.id)}
					<li>
						<a href={link.href} target="_blank" rel="me noopener">
							<span class="channel__platform">{link.label}</span>
							<span class="channel__handle">{link.handle}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
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

	.channels {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-l) clamp(1.5rem, 4vw, 3rem);

		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.channel__value {
		display: inline-block;
		margin-top: 0.55rem;

		font-size: var(--type-body);
		letter-spacing: -0.01em;
		color: var(--text-primary);
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.channel__value:hover {
		border-color: var(--signal);
	}

	.channel--social ul {
		display: grid;
		gap: 0.5rem;
		margin-top: 0.55rem;
	}

	.channel--social a {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		color: var(--text-secondary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.channel--social a:hover {
		color: var(--text-primary);
	}

	.channel__platform {
		font-size: var(--type-small);
		font-weight: 500;
	}

	.channel__handle {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.cta {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.channels {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
