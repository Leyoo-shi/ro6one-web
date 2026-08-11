<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import MediaFrame from '$lib/components/ui/MediaFrame.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { getEvent, steamFestSchools } from '$lib/content/events';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.events.steamfest);
	const event = getEvent('steamfest');
</script>

<Section id="steamfest" index="02" label={copy.label}>
	<header class="intro">
		<h2 class="intro__title" use:reveal>{copy.title}</h2>
		<p class="lede intro__lede" use:reveal={{ delay: 80 }}>{copy.lede}</p>
	</header>

	<!--
		Two systems running in the same hall. The columns are built as mirror
		images either side of a centre rule, and the rule ends where the two
		descriptions meet — the composition makes the argument the copy makes.
	-->
	<div class="halves">
		<div class="half half--court" use:reveal>
			<h3 class="half__title">{copy.court.title}</h3>
			<ul class="half__list">
				{#each copy.court.items as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
			<MediaFrame id="home.steamfest.court" sizes="(max-width: 900px) 100vw, 42vw" />
		</div>

		<span class="halves__rule" aria-hidden="true"></span>

		<div class="half half--lab" use:reveal={{ delay: 90 }}>
			<h3 class="half__title">{copy.lab.title}</h3>
			<ul class="half__list">
				{#each copy.lab.items as item (item)}
					<li>{item}</li>
				{/each}
			</ul>
			<MediaFrame id="home.steamfest.lab" sizes="(max-width: 900px) 100vw, 42vw" />
		</div>
	</div>

	<div class="merge" use:reveal>
		<span class="merge__mark" aria-hidden="true"></span>
		<h3 class="merge__title">{copy.merge.title}</h3>
		<p class="merge__body">{copy.merge.body}</p>
	</div>

	<div class="meta" use:reveal>
		<dl class="facts">
			{#each event.facts as fact (fact.key)}
				<div>
					<dt class="label">{i18n.t.events.facts[fact.key as keyof typeof i18n.t.events.facts]}</dt>
					<dd>
						{fact.localized
							? i18n.t.events.facts[fact.value as keyof typeof i18n.t.events.facts]
							: fact.value}
					</dd>
				</div>
			{/each}
		</dl>

		<div class="schools">
			<p class="label">{copy.schoolsLabel}</p>
			<ul>
				{#each steamFestSchools as school (school)}
					<li>{school}</li>
				{/each}
			</ul>
		</div>

		<p class="meta__support">{copy.support}</p>
	</div>
</Section>

<style>
	.intro {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 6rem);
		align-items: end;
		margin-bottom: var(--space-2xl);
	}

	.intro__title {
		max-width: 15ch;
		font-size: var(--type-h2);
		font-weight: 550;
		line-height: 1.02;
	}

	/* ---------------------------------------------------------------- halves */

	.halves {
		position: relative;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(1.5rem, 5vw, 5rem);
	}

	.halves__rule {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;

		background: linear-gradient(
			to bottom,
			var(--edge-faint),
			var(--edge-strong) 35%,
			var(--edge-faint)
		);
	}

	.half {
		display: grid;
		gap: var(--space-m);
		align-content: start;
	}

	.half__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.half--court .half__title {
		color: var(--signal-warm);
	}

	.half--lab .half__title {
		color: var(--signal);
	}

	.half__list {
		display: grid;
		gap: 0.65rem;
	}

	.half__list li {
		padding-left: 1rem;
		position: relative;

		font-size: var(--type-body);
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.half__list li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.72em;

		width: 5px;
		height: 1px;
		background: var(--edge-strong);
	}

	/* ----------------------------------------------------------------- merge */

	.merge {
		position: relative;
		max-width: 44rem;
		margin: var(--space-2xl) auto 0;
		padding-top: var(--space-xl);
		text-align: center;
	}

	/* The centre rule continues down into the statement, then stops. */
	.merge__mark {
		position: absolute;
		top: 0;
		left: 50%;
		width: 1px;
		height: var(--space-l);
		background: linear-gradient(to bottom, var(--edge-strong), transparent);
	}

	.merge__title {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.merge__body {
		margin-top: var(--space-m);
		font-size: var(--type-body-lg);
		line-height: 1.6;
		color: var(--text-primary);
		text-wrap: pretty;
	}

	/* ------------------------------------------------------------------ meta */

	.meta {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 5rem);

		margin-top: var(--space-2xl);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-m) clamp(1.5rem, 4vw, 3rem);
		margin: 0;
	}

	.facts dd {
		margin: 0.45rem 0 0;
		font-size: var(--type-small);
		font-weight: 500;
		color: var(--text-secondary);
	}

	.schools ul {
		display: grid;
		gap: 0.4rem;
		margin-top: var(--space-s);
	}

	.schools li {
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.meta__support {
		grid-column: 1 / -1;
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.intro,
		.meta {
			grid-template-columns: minmax(0, 1fr);
			align-items: start;
		}

		.halves {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-xl);
		}

		.halves__rule {
			left: 0;
			right: auto;
		}

		.half {
			padding-left: var(--space-m);
		}

		.merge {
			text-align: left;
			margin-inline: 0;
		}

		.merge__mark {
			left: 0;
		}
	}
</style>
