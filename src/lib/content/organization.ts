/**
 * How RO6ONE is organised.
 *
 * Deliberately modelled as a network, not a hierarchy: people have a primary
 * responsibility but move across domains, and work is handed between domains
 * constantly. The coordinates below place the nodes in a 100×100 field used by
 * OrgNetwork — they encode adjacency and balance, not rank.
 *
 * Headcounts are the numbers the team supplied. Where a domain's internal
 * composition matters more than its size (media), roles are listed instead.
 * Do not infer or invent counts for the domains that have none.
 */
export type DomainId =
	'engineering' | 'operations' | 'media' | 'pr' | 'creative' | 'sponsorship' | 'finance';

export type Domain = {
	id: DomainId;
	/** Percentage position in the network field. */
	x: number;
	y: number;
	/** Team-supplied headcount. Omitted where the team has not given one. */
	count?: number;
	/** i18n keys under `organization.domains.<id>.roles`, for domains with internal structure. */
	roles?: string[];
	/** Bigger nodes carry more of the site's narrative weight. */
	scale?: 'lead' | 'normal';
};

export const domains: Domain[] = [
	{ id: 'engineering', x: 17, y: 27, scale: 'lead' },
	{ id: 'operations', x: 50, y: 52, count: 8, scale: 'lead' },
	{ id: 'media', x: 81, y: 24, roles: ['capture', 'direction', 'camera', 'edit'], scale: 'lead' },
	{ id: 'pr', x: 87, y: 63, count: 3 },
	{ id: 'creative', x: 58, y: 86, count: 9 },
	{ id: 'sponsorship', x: 24, y: 80, count: 6 },
	{ id: 'finance', x: 9, y: 59, count: 2 }
];

/**
 * Working relationships, not reporting lines. `strong` edges are the paths work
 * actually travels along most often.
 */
export const connections: Array<{ from: DomainId; to: DomainId; strong?: boolean }> = [
	{ from: 'operations', to: 'engineering', strong: true },
	{ from: 'operations', to: 'media' },
	{ from: 'operations', to: 'pr', strong: true },
	{ from: 'operations', to: 'creative' },
	{ from: 'operations', to: 'sponsorship' },
	{ from: 'operations', to: 'finance' },
	{ from: 'pr', to: 'sponsorship', strong: true },
	{ from: 'pr', to: 'creative', strong: true },
	{ from: 'creative', to: 'media', strong: true },
	{ from: 'media', to: 'engineering' },
	{ from: 'sponsorship', to: 'finance', strong: true },
	{ from: 'finance', to: 'engineering' }
];

/**
 * Flexible capacity that moves to wherever the work is. Drawn as the field the
 * whole network sits inside rather than as another node, because that is how it
 * actually behaves.
 */
export const flexPool = { count: 9 };

/** The stages a PR-originated project moves through before someone owns it. */
export const prPipeline = ['spot', 'shape', 'reach', 'plan', 'decide', 'hand-over'] as const;

export type PrStage = (typeof prPipeline)[number];
