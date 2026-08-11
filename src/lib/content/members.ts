import type { DepartmentId } from './departments';
import type { LocalizedText } from './localized';

export type Member = {
	/** Real name as the person wants it published. */
	name: string;
	/** Role inside the department, e.g. { en: 'Lead', tr: 'Sorumlu' }. */
	role: LocalizedText;
	department: DepartmentId;
	/** Optional portrait in /static. Alt text is generated from the name. */
	photo?: string;
	/** Set for the person accountable for the department. */
	lead?: boolean;
};

/**
 * Team roster.
 *
 * Intentionally empty — no invented people. The /team page groups members by
 * department automatically once entries are added, and shows an honest
 * "profiles are being prepared" state until then.
 *
 * Before publishing names or photographs of students, make sure consent is in
 * place; that is the reason this file starts empty rather than with examples.
 */
export const members: Member[] = [];
