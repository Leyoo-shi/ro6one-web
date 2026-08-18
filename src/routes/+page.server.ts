import { dev } from '$app/environment';
import { istanbulDay } from '$lib/content/roster';
import type { PageServerLoad } from './$types';

/**
 * The date is resolved once per request, in Türkiye's calendar, and handed to
 * the client. Letting the browser decide would mean a visitor in another time
 * zone — or the same visitor a few hours before midnight — seeing a different
 * day than the server rendered, which is exactly the kind of hydration
 * mismatch a birthday feature must not have.
 *
 * In development only, `?date=MM-DD` overrides it, so the birthday state can be
 * previewed and tested without waiting for the calendar. The override is
 * unavailable in production by construction, not by a runtime check on a header.
 */
export const load: PageServerLoad = ({ url }) => {
	if (dev) {
		const override = url.searchParams.get('date');
		const match = override?.match(/^(\d{1,2})-(\d{1,2})$/);

		if (match) {
			return { today: { month: Number(match[1]), day: Number(match[2]) } };
		}
	}

	return { today: istanbulDay() };
};
