import type { DepartmentId } from './departments';
import type { DomainId } from './organization';
import type { LocalizedText } from './localized';

/**
 * A member's *primary* responsibility, plus the domains they also work across.
 * The second field matters: nobody at RO6ONE is confined to one department, and
 * the model should not imply otherwise.
 */
export type Member = {
	/** Real name, exactly as the person wants it published. */
	name: string;
	/** Free-form role, e.g. { en: 'Drivetrain lead', tr: 'Hareket sistemi sorumlusu' }. */
	role: LocalizedText;
	primary: DomainId;
	/** Other domains this person regularly works in. */
	alsoWorksIn?: DomainId[];
	/** Set when the primary domain is engineering. */
	discipline?: DepartmentId;
	/** True for the person accountable for a domain. */
	lead?: boolean;
	/** Path under /static. Portraits should be shot to the same crop. */
	photo?: string;
	bio?: LocalizedText;
	links?: Array<{ label: string; href: string }>;
	/** Lower sorts first inside a domain. */
	sortOrder?: number;
};

/**
 * Intentionally empty — no invented people.
 *
 * The /team page is built around how the organisation works, so it is complete
 * without this list; adding entries turns on an extra roster section that
 * groups automatically by domain.
 *
 * Before publishing student names or portraits, make sure consent is in place.
 * That is why this file starts empty rather than with examples.
 */
export const members: Member[] = [];
