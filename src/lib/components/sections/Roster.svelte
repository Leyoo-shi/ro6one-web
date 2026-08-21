<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import Portrait from '$lib/components/ui/Portrait.svelte';
	import {
		memberTags,
		portraitCount,
		roleOrder,
		roster,
		rosterSize,
		tagsOfCategory,
		type Member,
		type RoleId
	} from '$lib/content/roster';
	import { resolveText } from '$lib/content/localized';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.team.roster);
	const detail = $derived(i18n.t.team.detail);

	/* Skills read as credentials; the team's own labels read as affection. The
	   two are kept in separate rows so a joke never sits in a skills list. */
	const skillTags = (member: Member) => tagsOfCategory(member, 'skill');
	const funTags = (member: Member) => [
		...tagsOfCategory(member, 'special'),
		...tagsOfCategory(member, 'fun')
	];

	/*
	 * The roster as five domains rather than one gallery.
	 *
	 * The page opens on a selector — five large panels, each carrying its own
	 * count and colour — and opening one unfolds that group's field. A member
	 * can then be pulled into focus at a size nothing else on the page comes
	 * near. Search stays available the whole time, because someone looking for
	 * one name should never have to play with the composition to find it.
	 */
	let role = $state<RoleId | 'all'>('all');
	let query = $state('');
	let focused = $state<Member | null>(null);

	/**
	 * Turkish-aware folding, so "ipek" finds "İpek" and "gunes" finds "Güneş".
	 * `toLocaleLowerCase('tr')` alone would leave the diacritics in place.
	 */
	function fold(value: string): string {
		return value
			.toLocaleLowerCase('tr')
			.replaceAll('ı', 'i')
			.replaceAll('ş', 's')
			.replaceAll('ğ', 'g')
			.replaceAll('ü', 'u')
			.replaceAll('ö', 'o')
			.replaceAll('ç', 'c')
			.replaceAll('â', 'a');
	}

	const needle = $derived(fold(query.trim()));
	const searching = $derived(needle.length > 0);

	const matches = $derived(
		roster.filter((member) => {
			if (!searching && role !== 'all' && member.role !== role) return false;
			if (!needle) return true;

			return fold(member.name).includes(needle);
		})
	);

	const groups = $derived.by(() => {
		if (searching) return [{ id: null as RoleId | null, people: matches }];
		if (role !== 'all') return [{ id: role, people: matches }];

		return roleOrder
			.map((id) => ({ id, people: matches.filter((member) => member.role === id) }))
			.filter((group) => group.people.length > 0);
	});

	const counts = $derived(
		Object.fromEntries(
			roleOrder.map((id) => [id, roster.filter((member) => member.role === id).length])
		) as Record<RoleId, number>
	);

	function toggle(id: RoleId) {
		role = role === id ? 'all' : id;
		focused = null;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && focused) {
			event.stopPropagation();
			focused = null;
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="roster">
	<!-- The selector: five domains, each a panel that opens its own field. -->
	<div class="domains" role="group" aria-label={copy.title} use:reveal>
		{#each roleOrder as id (id)}
			<button
				type="button"
				class="domain domain--{id}"
				aria-pressed={role === id}
				onclick={() => toggle(id)}
			>
				<span class="domain__count">{counts[id]}</span>
				<span class="domain__name">{i18n.t.roles[id]}</span>
				<span class="domain__rule" aria-hidden="true"></span>
			</button>
		{/each}

		<div class="search">
			<label class="label" for="roster-search">{copy.searchLabel}</label>
			<input
				id="roster-search"
				type="search"
				autocomplete="off"
				placeholder={copy.searchPlaceholder}
				bind:value={query}
			/>
		</div>
	</div>

	<p class="tally" aria-live="polite">
		<span class="tally__value">{matches.length}</span>
		<span>{copy.resultsLabel}</span>
		<span class="tally__note">{portraitCount}/{rosterSize} · {copy.portraitNote}</span>
	</p>

	{#if matches.length === 0}
		<p class="none">{copy.noResults}</p>
	{:else}
		{#each groups as group (group.id ?? 'search')}
			<section class="field">
				{#if group.id}
					<h3 class="field__title field__title--{group.id}">
						{i18n.t.roles[group.id]}
						<span class="field__count">{group.people.length}</span>
					</h3>
				{/if}

				<ul class="sheet" class:sheet--focused={Boolean(focused)}>
					{#each group.people as member (member.key)}
						{@const isFocused = focused?.key === member.key}

						<li
							class="cell"
							class:cell--focused={isFocused}
							class:cell--dimmed={focused && !isFocused}
						>
							<button
								type="button"
								class="cell__button"
								aria-pressed={isFocused}
								aria-label="{member.name} — {i18n.t.roles[member.role]}"
								onclick={() => (focused = isFocused ? null : member)}
							>
								<Portrait
									{member}
									sizes={isFocused
										? '(max-width: 700px) 90vw, 34vw'
										: '(max-width: 560px) 44vw, (max-width: 1024px) 22vw, 12vw'}
								/>

								<span class="cell__meta">
									<span class="cell__name">{member.name}</span>
									<span class="cell__role">{i18n.t.roles[member.role]}</span>
								</span>
							</button>

							<!--
								The detail panel. Rendered only for the focused member, and
								every row is omitted when its field is empty — a member with
								no tags and no intro simply gets a shorter card rather than a
								grid of blanks. Everything here comes from content/roster.ts.
							-->
							{#if isFocused}
								<div class="profile">
									<dl class="profile__facts">
										<div>
											<dt class="label">{detail.group}</dt>
											<dd>{i18n.t.roles[member.role]}</dd>
										</div>

										{#if member.grade}
											<div>
												<dt class="label">{detail.grade}</dt>
												<dd>{detail.gradeValue.replace('{grade}', String(member.grade))}</dd>
											</div>
										{:else if member.mentorNote}
											<div>
												<dt class="label">{detail.mentorLabel}</dt>
												<dd>{resolveText(member.mentorNote, i18n.locale)}</dd>
											</div>
										{/if}

										{#if member.birthday}
											<div>
												<dt class="label">{detail.birthday}</dt>
												<dd>
													{member.birthday.day}
													{i18n.t.daily.months[member.birthday.month - 1]}
												</dd>
											</div>
										{/if}
									</dl>

									<div class="profile__intro">
										<p class="label">{detail.about}</p>
										<p class="profile__text" class:profile__text--pending={!member.intro}>
											{member.intro ? resolveText(member.intro, i18n.locale) : detail.introPending}
										</p>
									</div>

									{#if skillTags(member).length}
										<div class="profile__tags">
											<p class="label">{detail.skills}</p>
											<ul>
												{#each skillTags(member) as tag (tag)}
													<li class="tag tag--skill">{i18n.t.team.tags[tag]}</li>
												{/each}
											</ul>
										</div>
									{/if}

									{#if funTags(member).length}
										<div class="profile__tags">
											<p class="label">{detail.traits}</p>
											<ul>
												{#each funTags(member) as tag (tag)}
													<li class="tag tag--{memberTags[tag]}">{i18n.t.team.tags[tag]}</li>
												{/each}
											</ul>
										</div>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	{/if}
</div>

<style>
	/* -------------------------------------------------------------- domains */

	.domains {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: clamp(0.5rem, 1vw, 0.9rem);
		align-items: stretch;
	}

	.domain {
		position: relative;
		display: grid;
		align-content: start;
		gap: 0.35rem;

		padding: clamp(0.9rem, 1.8vw, 1.4rem);
		text-align: left;

		border: 1px solid var(--edge-faint);
		background: linear-gradient(160deg, rgb(244 244 242 / 0.03), transparent 70%);

		transition:
			border-color var(--motion-light) var(--ease-out),
			background-color var(--motion-light) var(--ease-out),
			transform var(--motion-light) var(--ease-out);
	}

	.domain:hover {
		transform: translateY(-2px);
		border-color: var(--edge);
	}

	.domain[aria-pressed='true'] {
		border-color: var(--blue);
		background: linear-gradient(160deg, rgb(63 143 216 / 0.16), transparent 72%);
	}

	.domain__count {
		font-family: var(--font-mono);
		font-size: clamp(1.5rem, 2.6vw, 2.4rem);
		line-height: 1;
		color: var(--text-primary);
	}

	.domain[aria-pressed='true'] .domain__count {
		color: var(--blue-bright);
	}

	.domain__name {
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.domain__rule {
		height: 1px;
		margin-top: 0.5rem;
		background: var(--edge-faint);
	}

	.domain[aria-pressed='true'] .domain__rule {
		background: linear-gradient(to right, var(--blue), transparent);
	}

	/* Mentors read warm, the one deliberate difference in the row. */
	.domain--mentor[aria-pressed='true'] {
		border-color: var(--claret-bright);
		background: linear-gradient(160deg, rgb(201 74 99 / 0.18), transparent 72%);
	}

	.domain--mentor[aria-pressed='true'] .domain__count {
		color: var(--claret-bright);
	}

	.search {
		grid-column: 1 / -1;
		display: grid;
		gap: 0.45rem;
		margin-top: var(--space-s);
		max-width: 22rem;
	}

	.search input {
		width: 100%;
		padding: 0.6rem 0.8rem;

		font: inherit;
		font-size: var(--type-small);
		color: var(--text-primary);

		background: rgb(8 9 11 / 0.6);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-s);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.search input:hover,
	.search input:focus-visible {
		border-color: var(--blue);
	}

	/* ---------------------------------------------------------------- tally */

	.tally {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem 1rem;
		margin-top: var(--space-l);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.tally__value {
		color: var(--blue-bright);
	}

	.tally__note {
		margin-left: auto;
		letter-spacing: 0.06em;
		text-transform: none;
		color: var(--text-faint);
	}

	.none {
		margin-top: var(--space-2xl);
		font-size: var(--type-body-lg);
		color: var(--text-secondary);
	}

	/* ---------------------------------------------------------------- field */

	.field {
		margin-top: var(--space-2xl);
	}

	.field__title {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;

		padding-bottom: var(--space-s);
		border-bottom: 1px solid var(--edge-faint);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.field__count {
		color: var(--blue-bright);
	}

	.field__title--mentor .field__count {
		color: var(--claret-bright);
	}

	.sheet {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(9.5rem, 44%), 1fr));
		gap: clamp(0.75rem, 1.6vw, 1.5rem);
		margin-top: var(--space-m);
		align-items: start;
	}

	.cell__button {
		display: block;
		width: 100%;
		text-align: left;
	}

	.cell :global(.portrait) {
		border: 1px solid var(--edge-faint);
		transition:
			border-color var(--motion-light) var(--ease-out),
			transform var(--motion-light) var(--ease-out),
			box-shadow var(--motion-light) var(--ease-out);
	}

	/* Hover: the site acknowledges that you are looking at this person. */
	.cell:hover :global(.portrait) {
		border-color: var(--blue);
		transform: translateY(-5px);
		box-shadow: 0 18px 40px rgb(4 8 18 / 0.55);
	}

	.cell:hover :global(.portrait img) {
		filter: saturate(1.08) contrast(1.03) brightness(1.05);
		transform: scale(1.03);
	}

	.cell :global(.portrait img) {
		transition:
			filter var(--motion-light) var(--ease-out),
			transform var(--motion-light) var(--ease-out);
	}

	.cell__meta {
		display: grid;
		gap: 0.1rem;
		margin-top: 0.6rem;
	}

	.cell__name {
		font-size: var(--type-small);
		font-weight: 500;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.cell__role {
		font-family: var(--font-mono);
		font-size: 0.5625rem;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.cell:hover .cell__role {
		color: var(--blue-bright);
	}

	/* -------------------------------------------------------------- profile */

	/*
	 * Sits under the enlarged portrait inside the focused cell, so the card
	 * grows downward instead of the page reflowing around a floating panel.
	 */
	.profile {
		display: grid;
		gap: var(--space-m);
		margin-top: var(--space-m);
		padding-top: var(--space-m);
		border-top: 1px solid var(--edge);
	}

	.profile__facts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s) clamp(1.25rem, 4vw, 2.5rem);
		margin: 0;
	}

	.profile__facts dd {
		margin: 0.3rem 0 0;
		font-size: var(--type-small);
		font-weight: 500;
		color: var(--text-primary);
	}

	.profile__text {
		margin-top: 0.4rem;
		max-width: 46ch;
		font-size: var(--type-body);
		line-height: 1.5;
		color: var(--text-secondary);
	}

	/* Visibly waiting for real copy rather than pretending to be it. */
	.profile__text--pending {
		font-style: italic;
		color: var(--text-faint);
	}

	.profile__tags ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: 0.55rem;
	}

	.tag {
		padding: 0.28rem 0.6rem;
		border: 1px solid transparent;
		border-radius: 999px;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.04em;
		line-height: 1.35;
	}

	.tag--skill {
		border-color: var(--edge-navy);
		background: var(--signal-dim);
		color: var(--blue-bright);
	}

	.tag--fun {
		border-color: var(--edge-burgundy);
		background: var(--signal-warm-dim);
		color: var(--claret-bright);
	}

	/* One-person titles earn a solid chip. */
	.tag--special {
		border-color: transparent;
		background: var(--claret);
		color: var(--text-primary);
		font-weight: 600;
	}

	/* ---------------------------------------------------------------- focus */

	/*
	 * Focus is a change of scale, not a highlight: the chosen portrait takes
	 * three columns and two rows, everyone else steps back.
	 */
	.cell--focused {
		grid-column: span 2;
		align-self: start;
	}

	.cell--focused :global(.portrait) {
		aspect-ratio: 4 / 5;
	}

	.cell--focused :global(.portrait) {
		border-color: var(--blue);
		box-shadow: 0 30px 70px rgb(4 8 18 / 0.6);
	}

	.cell--focused :global(.portrait img) {
		filter: saturate(1.05) contrast(1.02);
	}

	.cell--focused .cell__name {
		font-size: var(--type-h3);
		font-weight: 550;
	}

	.cell--focused .cell__role {
		font-size: var(--type-micro);
		color: var(--blue-bright);
	}

	.cell--dimmed {
		opacity: 0.42;
		transition: opacity var(--motion-light) var(--ease-out);
	}

	.cell--dimmed:hover {
		opacity: 1;
	}

	/* ----------------------------------------------------------- responsive */

	@media (max-width: 900px) {
		.domains {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.cell--focused {
			grid-column: 1 / -1;
			grid-row: auto;
		}
	}

	@media (max-width: 560px) {
		.tally__note {
			margin-left: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cell :global(.portrait),
		.cell :global(.portrait img),
		.domain {
			transition: none;
		}
	}
</style>
