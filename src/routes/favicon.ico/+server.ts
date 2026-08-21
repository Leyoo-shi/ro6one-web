import { read } from '$app/server';
import favicon from '$lib/assets/favicon.ico?url';
import type { RequestHandler } from './$types';

/**
 * `/favicon.ico`.
 *
 * Served from a route rather than from static/ for one reason: adapter-node
 * hands static files to sirv, and the mime table sirv bundles has no entry for
 * `.ico`, so the file went out with an empty Content-Type. That table is inlined
 * into the built server, so it cannot be corrected at runtime either. Setting
 * the header here is the only place that actually works.
 *
 * Why the file needs to exist at all: Google looks for the icon declared in the
 * home page <head> *and* at this well-known path. While it 404'd, Google had
 * nothing to refresh from and kept whatever it already held for the hostname —
 * which is how a previous occupant's icon survives in search results.
 *
 * The bytes come from src/lib/assets/, written by scripts/process_brand.py from
 * the same source logo as every other brand asset.
 */
export const GET: RequestHandler = async () => {
	const asset = read(favicon);

	return new Response(await asset.arrayBuffer(), {
		headers: {
			'content-type': 'image/x-icon',
			/* A stable URL with stable bytes; let it cache hard. */
			'cache-control': 'public, max-age=604800, immutable'
		}
	});
};
