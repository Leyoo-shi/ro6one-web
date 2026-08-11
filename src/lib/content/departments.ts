/**
 * The disciplines the team is organized into.
 *
 * This list is the single source of order and identity; the visible name and
 * description for each id live in `src/lib/i18n/dictionaries/*` under
 * `departments`, so both languages stay in sync. Adding a department means
 * adding an id here and the matching entry in every dictionary.
 */
export const departmentIds = [
	'mechanical',
	'design',
	'software',
	'electrical',
	'media',
	'operations'
] as const;

export type DepartmentId = (typeof departmentIds)[number];
