<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import OrgNetwork from '$lib/components/ui/OrgNetwork.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.system);
	const platform = $derived(i18n.t.organization.platform);
</script>

<Section id="system" index="06" label={copy.label} tone="void">
	<div class="intro">
		<h2 class="intro__title" use:reveal>{copy.title}</h2>
		<p class="lede" use:reveal={{ delay: 80 }}>{copy.body}</p>
	</div>

	<div class="network">
		<OrgNetwork />
	</div>

	<!--
		The platform the network runs on. Deliberately described in terms of what
		the team operates rather than what it installed — and with no vendor,
		hostname or internal detail on a public page.
	-->
	<div class="platform" use:reveal>
		<div class="platform__head">
			<p class="label">{platform.kicker}</p>
			<h3 class="platform__name">{platform.name}</h3>
		</div>

		<div class="platform__body">
			<p>{platform.description}</p>

			<ul class="platform__facts">
				{#each Object.entries(platform.facts) as [key, value] (key)}
					<li>{value}</li>
				{/each}
			</ul>
		</div>

		<div class="platform__action">
			<ActionLink href="/team" size="large">{copy.link}</ActionLink>
		</div>
	</div>
</Section>

<style>
	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: var(--space-2xl);
	}

	.intro__title {
		max-width: 17ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.network {
		margin-bottom: var(--space-2xl);
	}

	.platform {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr) minmax(0, auto);
		gap: var(--space-l) clamp(2rem, 5vw, 4rem);
		align-items: start;

		padding-top: var(--space-l);
		border-top: 1px solid var(--edge-faint);
	}

	.platform__name {
		margin-top: var(--space-s);
		font-size: var(--type-h3);
		font-weight: 550;
		letter-spacing: -0.02em;
	}

	.platform__body p {
		max-width: 58ch;
		font-size: var(--type-small);
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.platform__facts {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 0;
		margin-top: var(--space-m);
	}

	.platform__facts li {
		display: flex;
		align-items: center;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.platform__facts li:not(:last-child)::after {
		content: '';
		width: 1px;
		height: 0.7rem;
		margin-inline: clamp(0.6rem, 1.5vw, 1rem);
		background: var(--edge);
	}

	.platform__action {
		padding-top: 0.25rem;
	}

	@media (max-width: 1024px) {
		.platform {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 820px) {
		.intro {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}
	}
</style>
