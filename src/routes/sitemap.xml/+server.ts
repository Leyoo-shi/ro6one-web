import { env } from '$env/dynamic/public';
import { allNav } from '$lib/content/navigation';
import { site } from '$lib/content/site';
import type { RequestHandler } from './$types';

/**
 * Generated from the same navigation config the header uses, so a new route
 * cannot be added to the site and forgotten here.
 */
export const GET: RequestHandler = () => {
	const origin = (env.PUBLIC_SITE_URL || site.url).replace(/\/+$/, '');
	const paths = ['/', ...allNav.map((item) => item.href)];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
	.map(
		(path) =>
			`\t<url>\n\t\t<loc>${origin}${path}</loc>\n\t\t<changefreq>monthly</changefreq>\n\t\t<priority>${path === '/' ? '1.0' : '0.7'}</priority>\n\t</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'max-age=3600'
		}
	});
};
