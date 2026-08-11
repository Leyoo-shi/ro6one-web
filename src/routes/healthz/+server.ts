import type { RequestHandler } from './$types';

/**
 * Container health probe. Deliberately does no rendering and touches no state,
 * so it stays cheap enough to run every 30 seconds.
 */
export const GET: RequestHandler = () => {
	return new Response('ok', {
		status: 200,
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'no-store'
		}
	});
};
