<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Portrait from '$lib/components/ui/Portrait.svelte';
	import { portraitFor, roster, studentCount } from '$lib/content/roster';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.home.people);

	/*
	 * The people, drifting.
	 *
	 * The previous version pinned the page and dragged a 37-portrait track
	 * sideways: to reach the next chapter you had to travel past every single
	 * student. That was tiring and wrong. This version never takes the scroll —
	 * three columns drift on their own, at three speeds, in two directions. Look
	 * for two seconds or twenty; the page moves on whenever you do.
	 *
	 * Everyone with a photograph is in the loop, so nobody is a permanent
	 * "homepage member", and the full roster is one link away.
	 */
	const photographed = roster.filter((member) => {
		const portrait = portraitFor(member.key);
		return portrait && !portrait.placeholder;
	});

	/** Dealt round-robin so each column mixes domains rather than blocking them. */
	const columns = [0, 1, 2].map((index) =>
		photographed.filter((_, position) => position % 3 === index)
	);

	const speeds = ['52s', '64s', '58s'];
</script>

<section id="people" class="people">
	<span class="people__edge" aria-hidden="true"></span>

	<div class="shell people__head">
		<p class="label people__marker">
			<span class="people__index">01</span>
			<span class="people__tick" aria-hidden="true"></span>
			<span>{copy.label}</span>
		</p>

		<!-- The headline says "forty-nine students", so the cast numeral must agree. -->
		<span class="people__count" aria-hidden="true">{studentCount}</span>

		<div class="people__statement" use:reveal>
			<h2 class="people__title">
				{copy.titleLead}
				<span class="people__accent">{copy.titleAccent}</span>
			</h2>
			<p class="lede people__lede">{copy.lede}</p>

			<div class="people__action">
				<ActionLink href="/team" size="large">{copy.cta}</ActionLink>
			</div>
		</div>
	</div>

	<!--
		Decorative: every name and role also appears on /team, which is the
		accessible source of truth for the roster.
	-->
	<div class="drift" aria-hidden="true">
		{#each columns as column, index (index)}
			<div
				class="drift__column drift__column--{index}"
				style="--speed: {speeds[index]}; --depth: {index}"
			>
				<!-- Rendered twice so the loop has no seam. -->
				<div class="drift__belt">
					{#each [...column, ...column] as member, position (`${member.key}-${position}`)}
						<article class="panel">
							<Portrait {member} sizes="(max-width: 900px) 40vw, 15vw" />

							<div class="panel__label">
								<span class="panel__name">{member.name}</span>
								<span class="panel__role">{i18n.t.roles[member.role]}</span>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.people {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
		align-items: center;
		gap: clamp(1.5rem, 4vw, 4rem);

		padding-block: var(--space-3xl);
		overflow: hidden;
		isolation: isolate;

		/* The claret room, carried over from the hero's floor light. */
		background:
			radial-gradient(90% 70% at 8% 30%, rgb(141 36 64 / 0.28), transparent 62%),
			radial-gradient(70% 60% at 92% 90%, rgb(63 143 216 / 0.2), transparent 60%), var(--ink-claret);
	}

	.people__edge {
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			var(--claret-bright) 35%,
			var(--blue) 75%,
			transparent
		);
	}

	/* ----------------------------------------------------------------- head */

	.people__head {
		position: relative;
		z-index: 2;
		grid-column: 1;
		isolation: isolate;
	}

	.people__marker {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		margin-bottom: var(--space-l);
	}

	.people__index {
		color: var(--claret-bright);
	}

	.people__tick {
		width: 1.5rem;
		height: 1px;
		background: var(--edge-strong);
	}

	.people__title {
		max-width: 12ch;
		font-size: clamp(2.4rem, 5vw, 4.75rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: var(--tracking-statement);
	}

	/* The second voice again: the turn of the phrase in the display serif. */
	.people__accent {
		display: block;
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		color: var(--blue-bright);
	}

	.people__lede {
		max-width: 34ch;
		margin-top: var(--space-m);
	}

	.people__action {
		margin-top: var(--space-l);
	}

	/* ---------------------------------------------------------------- drift */

	.drift {
		position: relative;
		grid-column: 2;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(0.6rem, 1.4vw, 1.25rem);

		height: min(78vh, 44rem);
		mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
	}

	.drift__column {
		overflow: hidden;
	}

	.drift__belt {
		display: grid;
		gap: clamp(0.6rem, 1.4vw, 1.25rem);
		animation: belt var(--speed) linear infinite;
		will-change: transform;
	}

	/* The middle column runs the other way: a field in motion, not a strip. */
	.drift__column--1 .drift__belt {
		animation-direction: reverse;
	}

	/* Depth: the outer columns sit slightly back. */
	.drift__column--0,
	.drift__column--2 {
		opacity: 0.72;
		transform: scale(0.94);
	}

	.drift:hover .drift__belt,
	.drift:focus-within .drift__belt {
		animation-play-state: paused;
	}

	.panel {
		position: relative;
		border: 1px solid var(--edge-faint);
		background: rgb(8 9 12 / 0.5);
		transition:
			border-color var(--motion-light) var(--ease-out),
			transform var(--motion-light) var(--ease-out);
	}

	.panel:hover {
		border-color: var(--blue);
		transform: translateY(-3px);
	}

	.panel:hover :global(.portrait img) {
		filter: saturate(1.05) contrast(1.02) brightness(1.04);
	}

	.panel__label {
		display: grid;
		gap: 0.1rem;
		padding: 0.5rem 0.6rem 0.6rem;
	}

	.panel__name {
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: -0.01em;
		line-height: 1.15;
	}

	.panel__role {
		font-family: var(--font-mono);
		font-size: 0.5rem;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--blue-bright);
	}

	/* The headcount, cast behind the statement. */
	.people__count {
		position: absolute;
		left: calc(var(--shell-gutter) - 0.06em);
		top: -0.18em;
		z-index: -1;

		font-size: clamp(9rem, 22vw, 20rem);
		font-weight: 700;
		line-height: 0.7;
		letter-spacing: var(--tracking-mega);

		color: transparent;
		background-image: linear-gradient(180deg, rgb(201 74 99 / 0.55), rgb(201 74 99 / 0.05));
		background-clip: text;
		-webkit-background-clip: text;
		user-select: none;
	}

	@keyframes belt {
		from {
			transform: translateY(0);
		}

		to {
			/* Two identical halves, so half a loop is a seamless repeat. */
			transform: translateY(-50%);
		}
	}

	/* ----------------------------------------------------------- responsive */

	@media (max-width: 1024px) {
		.people {
			grid-template-columns: minmax(0, 1fr);
		}

		.people__head,
		.drift {
			grid-column: 1;
		}

		.drift {
			height: min(60vh, 32rem);
			margin-top: var(--space-xl);
		}
	}

	@media (max-width: 640px) {
		.drift {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		/* Two columns is enough on a phone; a third would be a sliver. */
		.drift__column--2 {
			display: none;
		}

		.drift__column--0 {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.drift__belt {
			animation: none;
		}

		/* Becomes a still mosaic rather than an empty frame. */
		.drift {
			mask-image: linear-gradient(to bottom, black 88%, transparent);
		}
	}
</style>
