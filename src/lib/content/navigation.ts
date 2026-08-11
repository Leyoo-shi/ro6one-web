import type { Pathname } from '$app/types';
import type { Dictionary } from '$lib/i18n';

export type NavItem = {
	/** Typed against SvelteKit's generated routes: a typo fails `npm run check`. */
	href: Pathname;
	/** Key into `nav` in the dictionaries, so labels are always localized. */
	key: keyof Dictionary['nav'];
};

/** Header navigation. Contact is separated out as the trailing action. */
export const primaryNav: NavItem[] = [
	{ href: '/about', key: 'about' },
	{ href: '/robotics', key: 'robotics' },
	{ href: '/impact', key: 'impact' },
	{ href: '/team', key: 'team' },
	{ href: '/partners', key: 'partners' }
];

export const contactNav: NavItem = { href: '/contact', key: 'contact' };

/** Every route, used by the mobile menu and the footer. */
export const allNav: NavItem[] = [...primaryNav, contactNav];

export const footerColumns: Array<{ titleKey: 'explore' | 'connect'; items: NavItem[] }> = [
	{
		titleKey: 'explore',
		items: [
			{ href: '/about', key: 'about' },
			{ href: '/robotics', key: 'robotics' },
			{ href: '/impact', key: 'impact' }
		]
	},
	{
		titleKey: 'connect',
		items: [
			{ href: '/team', key: 'team' },
			{ href: '/partners', key: 'partners' },
			{ href: '/contact', key: 'contact' }
		]
	}
];
