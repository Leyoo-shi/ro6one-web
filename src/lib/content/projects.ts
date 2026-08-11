import type { DepartmentId } from './departments';
import type { LocalizedText } from './localized';

export type ProjectStatus = 'active' | 'prototype' | 'archived' | 'planned';

export type Project = {
	/** Stable identifier; also the future detail-page slug. */
	slug: string;
	title: LocalizedText;
	summary: LocalizedText;
	/** Free-form season label, e.g. '2026'. */
	season: string;
	discipline: DepartmentId;
	status: ProjectStatus;
	/** Optional image in /static, with alt text describing what is shown. */
	image?: { src: string; alt: LocalizedText };
};

/**
 * Robots, prototypes, software and internal tooling.
 *
 * Intentionally empty: nothing is listed until the team has documented it.
 * The /robotics index renders a truthful empty state until entries exist.
 *
 * Shape of an entry:
 *
 * {
 *   slug: 'season-robot-2026',
 *   title: { en: 'Season robot', tr: 'Sezon robotu' },
 *   summary: { en: '…', tr: '…' },
 *   season: '2026',
 *   discipline: 'mechanical',
 *   status: 'active'
 * }
 */
export const projects: Project[] = [];
