<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import SupporterStrip from '$lib/components/ui/SupporterStrip.svelte';
	import { institutions } from '$lib/content/partners';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.institutional);
	const club = institutions.find((entry) => entry.id === 'trabzonspor');
</script>

<Section id="institutional" index="09" label={copy.label} tone="claret">
	<!--
		The school as a place, at the top of the institutional chapter. It was
		captured at STEAMFest, which does not make it a STEAMFest photograph: what
		it shows is the building the team came out of, which is what this section
		is about.
	-->
	<div class="institutional__place" use:reveal>
		<MediaFrame id="about.school" sizes="100vw" showCaption={false} />
	</div>

	<div class="institutional">
		<div class="institutional__copy">
			<h2 class="institutional__title" use:reveal>{copy.title}</h2>

			{#each copy.body as paragraph, index (index)}
				<p class="prose institutional__paragraph" use:reveal={{ delay: 70 * index }}>
					{paragraph}
				</p>
			{/each}

			<div class="institutional__action" use:reveal={{ delay: 160 }}>
				<ActionLink href="/partners">{copy.link}</ActionLink>
			</div>
		</div>

		<!--
			The relationship shown as a record, not a sponsor tile: the club's name
			is set in the same type as everything else on the site, and RO6ONE's
			own name stays the largest thing in the section.
		-->
		<aside class="record" use:reveal={{ delay: 120 }}>
			<span class="record__edge" aria-hidden="true"></span>

			<dl>
				<div>
					<dt class="label">{i18n.t.partners.institutional.title}</dt>
					<dd class="record__primary">
						{#if club?.url}
							<a href={club.url} target="_blank" rel="noopener">{club.name}</a>
						{:else}
							{club?.name}
						{/if}
					</dd>
				</div>

				<div>
					<dt class="label">{i18n.t.partners.institutional.since}</dt>
					<dd><time datetime="2026-03">03 · 2026</time></dd>
				</div>

				<div>
					<dt class="label">{i18n.t.home.origin.schoolLabel}</dt>
					<dd>{site.school}</dd>
				</div>

				<div>
					<dt class="label">{i18n.t.footer.identity}</dt>
					<dd>{site.legalName}</dd>
				</div>
			</dl>
		</aside>
	</div>

	<!--
		Season support, underneath the institutional record rather than beside it.
		Same records as /partners, read compactly: the chapter stays about the
		club, the school and the team, and the link above already leads to the
		full treatment.
	-->
	<SupporterStrip
		label={copy.supportLabel}
		href="/partners"
		linkLabel={copy.supportLink}
		delay={200}
	/>
</Section>

<style>
	/*
	 * A wide, quiet establishing shot before the argument. Deliberately not
	 * full-bleed: the Off-Season chapter owns the full-bleed move, and repeating
	 * it here would flatten both.
	 */
	.institutional__place {
		margin-bottom: var(--space-2xl);
	}

	.institutional__place :global(.frame__image) {
		aspect-ratio: 21 / 9;
		border: 1px solid var(--edge-burgundy);
	}

	.institutional {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
		gap: var(--space-xl) clamp(2rem, 6vw, 6rem);
		align-items: start;
	}

	.institutional__title {
		max-width: 16ch;
		margin-bottom: var(--space-l);
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	.institutional__paragraph {
		max-width: 54ch;
	}

	.institutional__paragraph + .institutional__paragraph {
		margin-top: var(--space-m);
	}

	.institutional__action {
		margin-top: var(--space-l);
	}

	.record {
		position: relative;
		padding: clamp(1.5rem, 3vw, 2.25rem);

		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(244 244 242 / 0.025), transparent 70%);
		overflow: hidden;
	}

	/* One line of club colour, caught on the top edge of the record. */
	.record__edge {
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(to right, var(--edge-burgundy), var(--edge-navy) 85%, transparent);
	}

	.record dl {
		display: grid;
		gap: var(--space-m);
		margin: 0;
	}

	.record dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.record__primary {
		font-size: var(--type-h3);
		font-weight: 500;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	.record__primary a {
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.record__primary a:hover {
		border-color: var(--signal-warm);
	}

	@media (max-width: 900px) {
		.institutional {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
