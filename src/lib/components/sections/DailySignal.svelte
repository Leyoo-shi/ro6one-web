<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import ActionLink from '$lib/components/ui/ActionLink.svelte';
	import Portrait from '$lib/components/ui/Portrait.svelte';
	import {
		birthdaysOn,
		dailyIndex,
		roster,
		type CalendarDay,
		type Member
	} from '$lib/content/roster';
	import { signalDeck } from '$lib/content/signal';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = { today: CalendarDay };

	let { today }: Props = $props();

	const i18n = useI18n();
	const copy = $derived(i18n.t.daily);

	/*
	 * The first thing after the hero is the team, not a product pitch.
	 *
	 * On someone's birthday this band belongs to them: warm light, their
	 * portrait, their name at statement scale. On every other day the same space
	 * carries one line from the record plus whoever is up next — so the slot is
	 * always worth its place at the top of the page, and the homepage is
	 * quietly different from one day to the next.
	 */
	const celebrating = $derived(birthdaysOn(today));
	const isBirthday = $derived(celebrating.length > 0);

	const entry = $derived(signalDeck[dailyIndex(today, signalDeck.length)]);
	const fact = $derived(copy.signal.facts[entry.id]);

	const monthNames = $derived(copy.months);
	const stamp = $derived(`${String(today.day).padStart(2, '0')} ${monthNames[today.month - 1]}`);

	/** The next birthday on the calendar, wrapping past the end of the year. */
	const upcoming = $derived.by(() => {
		const dated = roster.filter((member): member is Member & { birthday: CalendarDay } =>
			Boolean(member.birthday)
		);

		const rank = (day: CalendarDay) => day.month * 31 + day.day;
		const todayRank = rank(today);

		const sorted = [...dated].sort((a, b) => rank(a.birthday) - rank(b.birthday));

		return sorted.find((member) => rank(member.birthday) > todayRank) ?? sorted[0];
	});
</script>

<section
	id="today"
	class="daily"
	class:daily--birthday={isBirthday}
	aria-labelledby="daily-heading"
>
	<span class="daily__edge" aria-hidden="true"></span>

	<div class="shell daily__inner">
		<header class="daily__head">
			<p class="label daily__stamp" use:reveal>
				<span class="daily__dot" aria-hidden="true"></span>
				{copy.label}
				<span class="daily__date">{stamp}</span>
			</p>
		</header>

		{#if isBirthday}
			<div class="party">
				<ul class="party__people" style="--count: {celebrating.length}">
					{#each celebrating as member, index (member.key)}
						<li class="party__person" use:reveal={{ delay: index * 90 }}>
							<span class="party__glow" aria-hidden="true"></span>
							<Portrait
								{member}
								sizes="(max-width: 720px) 45vw, 260px"
								priority={index === 0}
								class="party__portrait"
							/>
						</li>
					{/each}
				</ul>

				<div class="party__copy">
					<p class="label party__label" use:reveal>
						{copy.birthday.label}
					</p>

					<h2 class="party__names" id="daily-heading" use:reveal>
						{#each celebrating as member, index (member.key)}
							{#if index > 0}
								<span class="party__separator" aria-hidden="true">·</span>
							{/if}
							<span class="party__name">{member.name}</span>
						{/each}
					</h2>

					<p class="party__wish" use:reveal={{ delay: 80 }}>
						{celebrating.length > 1 ? copy.birthday.wishPlural : copy.birthday.wish}
					</p>

					<ul class="party__roles" use:reveal={{ delay: 140 }}>
						{#each celebrating as member (member.key)}
							<li>{i18n.t.roles[member.role]}</li>
						{/each}
					</ul>
				</div>
			</div>
		{:else}
			<div class="signal">
				<h2 class="signal__fact" id="daily-heading" use:reveal>
					{fact}
				</h2>

				<div class="signal__aside">
					<p class="label">{copy.signal.label}</p>

					{#if entry.href}
						<div class="signal__action" use:reveal={{ delay: 80 }}>
							<ActionLink href={entry.href}>{copy.signal.read}</ActionLink>
						</div>
					{/if}

					{#if upcoming?.birthday}
						<!-- Keeps the people present on the 364 days that are not a birthday. -->
						<dl class="upcoming" use:reveal={{ delay: 140 }}>
							<dt class="label">{copy.signal.nextLabel}</dt>
							<dd>
								<span class="upcoming__name">{upcoming.name}</span>
								<span class="upcoming__date">
									{String(upcoming.birthday.day).padStart(2, '0')}
									{monthNames[upcoming.birthday.month - 1]}
								</span>
							</dd>
						</dl>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.daily {
		position: relative;
		padding-block: clamp(2.5rem, 5vw, 4.5rem);
		background: linear-gradient(180deg, rgb(8 9 11 / 0.55), transparent 70%);
	}

	.daily__edge {
		position: absolute;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(
			to right,
			transparent,
			var(--edge) 30%,
			var(--edge-faint) 80%,
			transparent
		);
	}

	/* On a birthday the whole band warms up — the one place the site gets loud. */
	.daily--birthday {
		background:
			radial-gradient(80% 120% at 18% 0%, rgb(109 39 57 / 0.34), transparent 62%),
			radial-gradient(60% 100% at 90% 100%, rgb(35 64 95 / 0.28), transparent 60%),
			linear-gradient(180deg, rgb(12 8 10 / 0.8), transparent 78%);
	}

	.daily--birthday .daily__edge {
		background: linear-gradient(
			to right,
			transparent,
			var(--signal-warm) 22%,
			rgb(244 244 242 / 0.5) 50%,
			var(--signal) 78%,
			transparent
		);
	}

	.daily__head {
		margin-bottom: var(--space-l);
	}

	.daily__stamp {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.daily__dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--signal);
		box-shadow: 0 0 0 3px var(--signal-dim);
	}

	.daily--birthday .daily__dot {
		background: var(--signal-warm);
		box-shadow: 0 0 0 3px var(--signal-warm-dim);
		animation: daily-pulse 2.4s var(--ease-in-out) infinite;
	}

	.daily__date {
		color: var(--text-secondary);
	}

	/* ---------------------------------------------------------------- party */

	.party {
		display: grid;
		grid-template-columns: minmax(0, auto) minmax(0, 1fr);
		gap: clamp(1.5rem, 5vw, 4rem);
		align-items: center;
	}

	.party__people {
		display: flex;
		gap: clamp(0.5rem, 1.5vw, 1rem);
	}

	.party__person {
		position: relative;
		width: clamp(7.5rem, 17vw, 13rem);
	}

	/* Light behind the person rather than confetti in front of them. */
	.party__glow {
		position: absolute;
		inset: -12% -14%;
		z-index: -1;
		background: radial-gradient(closest-side, rgb(208 154 167 / 0.4), transparent 75%);
	}

	.party__person :global(.party__portrait) {
		border: 1px solid var(--edge);
	}

	.party__label {
		color: var(--signal-warm);
	}

	.party__names {
		margin-top: var(--space-s);
		font-size: var(--type-statement);
		font-weight: 600;
		line-height: 0.98;
		letter-spacing: var(--tracking-statement);
		text-wrap: balance;
	}

	.party__separator {
		padding-inline: 0.3em;
		color: var(--signal-warm);
	}

	.party__wish {
		max-width: 40ch;
		margin-top: var(--space-m);
		font-size: var(--type-body-lg);
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.party__roles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1.25rem;
		margin-top: var(--space-m);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	/* --------------------------------------------------------------- signal */

	.signal {
		display: grid;
		grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
		gap: var(--space-l) clamp(2rem, 6vw, 5rem);
		align-items: start;
	}

	.signal__fact {
		max-width: 30ch;
		font-size: var(--type-statement);
		font-weight: 550;
		line-height: 1.04;
		letter-spacing: var(--tracking-statement);
		text-wrap: balance;
	}

	/*
	 * Was `align-self: end`, which pinned the record and the next birthday to
	 * the floor of a tall row and left the whole upper right of the band empty.
	 * Sitting it just below the statement's first line pairs the two instead.
	 */
	.signal__aside {
		align-self: start;
		padding-top: clamp(0.75rem, 2.5vw, 2.25rem);
	}

	.signal__action {
		margin-top: var(--space-s);
	}

	.upcoming {
		margin: var(--space-l) 0 0;
		padding-top: var(--space-s);
		border-top: 1px solid var(--edge-faint);
	}

	.upcoming dd {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.6rem;
		margin: 0.45rem 0 0;
	}

	.upcoming__name {
		font-size: var(--type-body);
		color: var(--text-primary);
	}

	.upcoming__date {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.08em;
		color: var(--signal-warm);
	}

	@keyframes daily-pulse {
		0%,
		100% {
			box-shadow: 0 0 0 3px var(--signal-warm-dim);
		}

		50% {
			box-shadow: 0 0 0 7px rgb(208 154 167 / 0.06);
		}
	}

	@media (max-width: 860px) {
		.party,
		.signal {
			grid-template-columns: minmax(0, 1fr);
		}

		.party__person {
			width: clamp(6.5rem, 30vw, 10rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.daily--birthday .daily__dot {
			animation: none;
		}
	}
</style>
