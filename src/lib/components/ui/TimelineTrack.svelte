<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { milestones, timelineSpan } from '$lib/content/timeline';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();

	/*
	 * The timeline is drawn to scale, not to fit. Formation, the protocol and
	 * the festival crowd into the first fifth of the axis and the first official
	 * season sits far to the right — the compression *is* the story, so nothing
	 * is spaced out for comfort.
	 */
	const stops = $derived(
		milestones.map((milestone, index) => {
			const position = (milestone.offset / timelineSpan) * 100;

			return {
				...milestone,
				position,
				/* Three stem heights keep the crowded early months legible. */
				level: index % 3,
				align: position <= 12 ? 'start' : position >= 88 ? 'end' : 'center',
				copy: i18n.t.home.timeline[milestone.id]
			};
		})
	);

	/* One minor tick per month, plus the dimension bracket over the busy part. */
	const ticks = Array.from({ length: timelineSpan + 1 }, (_, month) => ({
		month,
		position: (month / timelineSpan) * 100,
		major: month % 3 === 0
	}));

	const compressed = milestones.find((milestone) => milestone.id === 'offseason');
	const dimensionEnd = ((compressed?.offset ?? 5) / timelineSpan) * 100;
</script>

<div class="track" use:reveal>
	<p class="label track__axis-label">{i18n.t.home.origin.timelineLabel}</p>

	<div class="track__field">
		<!-- The dimension bracket: formation → the 21-team event, drawn to scale. -->
		<span class="dimension" style="--from: {0}%; --to: {dimensionEnd}%" aria-hidden="true">
			<span class="dimension__value">{compressed?.offset ?? 5}</span>
		</span>

		<span class="track__rule" aria-hidden="true"></span>

		<span class="track__ticks" aria-hidden="true">
			{#each ticks as tick (tick.month)}
				<span
					class="tick"
					class:tick--major={tick.major}
					style="--pos: {tick.position}%; --delay: {tick.month * 28}ms"
				>
					{#if tick.major}<span class="tick__value">{tick.month}</span>{/if}
				</span>
			{/each}
		</span>

		<ol class="stops">
			{#each stops as stop (stop.id)}
				<li
					class="stop stop--{stop.align} stop--level-{stop.level}"
					class:stop--upcoming={stop.upcoming}
					style="--pos: {stop.position}%; --delay: {320 + stop.offset * 40}ms"
				>
					<span class="stop__stem" aria-hidden="true"></span>
					<span class="stop__node" aria-hidden="true"></span>

					<svelte:element
						this={stop.href ? 'a' : 'div'}
						class="stop__body"
						href={stop.href}
						role={stop.href ? undefined : 'group'}
					>
						{#if stop.datetime}
							<time class="stop__stamp" datetime={stop.datetime}>{stop.stamp}</time>
						{:else}
							<span class="stop__stamp">{stop.stamp}</span>
						{/if}
						<span class="stop__name">{stop.copy.name}</span>
						<span class="stop__note">{stop.copy.note}</span>
					</svelte:element>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	.track {
		/*
		 * The stem unit has to clear a whole label block, otherwise the three
		 * milestones crowded into the first fifth of the axis collide at
		 * narrower widths. Measured against the tallest label, not guessed.
		 */
		--stem-unit: clamp(5rem, 5.5vw, 6rem);
	}

	.track__axis-label {
		margin-bottom: var(--space-l);
	}

	.track__field {
		position: relative;
		height: calc(var(--stem-unit) * 3 + 7rem);
		padding-top: 1.5rem;
	}

	/* ------------------------------------------------------------------ axis */

	.track__rule {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 3.25rem;
		height: 1px;

		background: linear-gradient(
			to right,
			var(--edge-strong),
			var(--edge-strong) 45%,
			var(--edge-faint)
		);

		transform: scaleX(0);
		transform-origin: left;
		transition: transform 1.4s var(--ease-material);
	}

	:global([data-reveal='visible']) .track__rule {
		transform: scaleX(1);
	}

	.tick {
		position: absolute;
		left: var(--pos);
		bottom: 3.25rem;

		width: 1px;
		height: 0.4rem;
		background: var(--edge);

		opacity: 0;
		transition: opacity var(--duration-base) var(--ease-out);
		transition-delay: var(--delay);
	}

	.tick--major {
		height: 0.75rem;
		background: var(--edge-strong);
	}

	:global([data-reveal='visible']) .tick {
		opacity: 1;
	}

	.tick__value {
		position: absolute;
		top: 1.1rem;
		left: 0;
		transform: translateX(-50%);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-faint);
	}

	/* ------------------------------------------------------- dimension line */

	.dimension {
		position: absolute;
		left: var(--from);
		width: calc(var(--to) - var(--from));
		bottom: 1.1rem;
		height: 0.85rem;

		border-left: 1px solid var(--edge-burgundy);
		border-right: 1px solid var(--edge-burgundy);

		opacity: 0;
		transition: opacity var(--duration-slow, 720ms) var(--ease-out) 900ms;
	}

	.dimension::before {
		content: '';
		position: absolute;
		inset: auto 0 0.42rem;
		height: 1px;
		background: var(--edge-burgundy);
	}

	:global([data-reveal='visible']) .dimension {
		opacity: 1;
	}

	.dimension__value {
		position: absolute;
		left: 50%;
		bottom: -0.25rem;
		transform: translateX(-50%);
		padding-inline: 0.4rem;

		background: var(--surface-base);
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.1em;
		color: var(--signal-warm);
	}

	/* ----------------------------------------------------------- milestones */

	.stops {
		position: absolute;
		inset: 0 0 3.25rem;
	}

	.stop {
		position: absolute;
		left: var(--pos);
		bottom: 0;

		opacity: 0;
		transform: translateY(0.5rem);
		transition:
			opacity var(--duration-base) var(--ease-out),
			transform var(--duration-base) var(--ease-out);
		transition-delay: var(--delay);
	}

	:global([data-reveal='visible']) .stop {
		opacity: 1;
		transform: none;
	}

	.stop__node {
		position: absolute;
		left: -3px;
		bottom: -3px;

		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--text-primary);
	}

	.stop--upcoming .stop__node {
		background: transparent;
		border: 1px solid var(--signal);
	}

	.stop__stem {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 1px;
		height: calc(var(--stem-unit) * (var(--level) + 1));
		background: linear-gradient(to top, var(--edge-strong), var(--edge-faint));
	}

	.stop--level-0 {
		--level: 0;
	}
	.stop--level-1 {
		--level: 1;
	}
	.stop--level-2 {
		--level: 2;
	}

	.stop--upcoming .stop__stem {
		background: repeating-linear-gradient(
			to top,
			var(--edge),
			var(--edge) 3px,
			transparent 3px,
			transparent 7px
		);
	}

	.stop__body {
		position: absolute;
		bottom: calc(var(--stem-unit) * (var(--level) + 1) + 0.6rem);

		display: grid;
		gap: 0.3rem;
		width: max-content;
		max-width: 12.5rem;
	}

	.stop--start .stop__body {
		left: 0;
	}

	.stop--center .stop__body {
		left: 50%;
		transform: translateX(-50%);
	}

	.stop--end .stop__body {
		right: 0;
	}

	.stop__stamp {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.stop--upcoming .stop__stamp {
		color: var(--signal);
	}

	.stop__name {
		font-size: var(--type-small);
		font-weight: 500;
		letter-spacing: -0.015em;
		color: var(--text-primary);
	}

	.stop__note {
		font-size: var(--type-micro);
		line-height: 1.45;
		color: var(--text-muted);
	}

	a.stop__body {
		transition: transform var(--duration-fast) var(--ease-out);
	}

	a.stop__body .stop__name {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.25em;
		transition: text-decoration-color var(--duration-fast) var(--ease-out);
	}

	a.stop__body:hover .stop__name {
		text-decoration-color: var(--edge-strong);
	}

	/* ----------------------------------------------------------- responsive */

	/*
	 * Below the breakpoint the axis stands up: same instrument, read top to
	 * bottom, with the scale on the left rail instead of underneath.
	 */
	@media (max-width: 900px) {
		.track__field {
			height: auto;
			padding: 0 0 0 1.5rem;
		}

		.track__rule {
			inset: 0 auto 0 0;
			width: 1px;
			height: 100%;
			background: linear-gradient(to bottom, var(--edge-strong), var(--edge-faint));
			transform: scaleY(0);
			transform-origin: top;
		}

		:global([data-reveal='visible']) .track__rule {
			transform: scaleY(1);
		}

		.track__ticks,
		.dimension {
			display: none;
		}

		.stops {
			position: static;
			display: grid;
			gap: var(--space-l);
		}

		.stop {
			position: relative;
			left: auto;
			bottom: auto;
		}

		.stop__stem {
			left: -1.5rem;
			top: 0.45rem;
			bottom: auto;
			width: 1rem;
			height: 1px;
			background: var(--edge-strong);
		}

		.stop--upcoming .stop__stem {
			background: repeating-linear-gradient(
				to right,
				var(--edge),
				var(--edge) 3px,
				transparent 3px,
				transparent 7px
			);
		}

		.stop__node {
			left: -1.6rem;
			top: 0.2rem;
			bottom: auto;
		}

		.stop__body,
		.stop--center .stop__body,
		.stop--start .stop__body,
		.stop--end .stop__body {
			position: static;
			left: auto;
			right: auto;
			max-width: 32rem;
			transform: none;
		}
	}
</style>
