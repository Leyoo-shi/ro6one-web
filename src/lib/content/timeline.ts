/**
 * The formation timeline.
 *
 * The compression is the story: five months from "a group of students with
 * almost no FRC experience" to organising a 21-team event — all of it before
 * the first official competition season. The `month` values feed the drafting
 * scale in TimelineTrack, so they must stay chronological.
 */
export type Milestone = {
	id: 'formation' | 'protocol' | 'steamfest' | 'offseason' | 'season';
	/** Months since the team was formed; drives horizontal position. */
	offset: number;
	/** Short machine-ish stamp shown under the tick. */
	stamp: string;
	/** ISO date for <time>, omitted for the future milestone. */
	datetime?: string;
	/** Optional route the milestone links to. */
	href?: '/impact' | '/robotics' | '/about' | '/partners';
	/** The upcoming milestone renders as an open end, not a completed tick. */
	upcoming?: boolean;
};

export const milestones: Milestone[] = [
	{ id: 'formation', offset: 0, stamp: '02 · 2026', datetime: '2026-02', href: '/about' },
	{ id: 'protocol', offset: 1, stamp: '03 · 2026', datetime: '2026-03', href: '/partners' },
	{ id: 'steamfest', offset: 2, stamp: '28.04.2026', datetime: '2026-04-28', href: '/impact' },
	{ id: 'offseason', offset: 5, stamp: '07 · 2026', datetime: '2026-07', href: '/impact' },
	{ id: 'season', offset: 11, stamp: '—', href: '/robotics', upcoming: true }
];

/** Span used to normalise offsets onto the drafting scale. */
export const timelineSpan = milestones[milestones.length - 1].offset;
