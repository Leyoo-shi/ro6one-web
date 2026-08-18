/**
 * Verified press coverage of the Trabzon Off-Season.
 *
 * RULES THIS FILE EXISTS TO ENFORCE
 *
 *  - Every entry was opened and read before being added. Nothing here is a
 *    search-result title taken on trust.
 *  - **The press credits "Trabzonspor and Trabzon Merkez Fen Lisesi".** None of
 *    these articles names RO6ONE or team 11919. The site must therefore never
 *    say "press coverage of RO6ONE" — it says the event was covered, which is
 *    what actually happened. The team's organizing role is a team-supplied
 *    fact, not a press-supplied one, and the two must not be blurred.
 *  - No reach, impression, circulation or audience numbers. Not known, not
 *    estimated, not implied.
 *  - The school's own announcement mentions official FMS and field systems.
 *    That is deliberately **not** repeated on the site: FIRST terminology is
 *    not something to inherit from a third party (see handoff §18).
 *
 * `syndicated: true` marks outlets that ran the same agency wire story
 * ("Robotlar spor salonunda yarıştı") rather than original reporting. That
 * distinction is the entire point of the section on /impact: the identical
 * story appeared in cities with no connection to Trabzon.
 */

export type PressItem = {
	/** Publication name, as the outlet writes it. */
	outlet: string;
	url: string;
	/** ISO date where the article carries one. */
	date?: string;
	/** Outlet reach, as a plain descriptor — never a number. */
	scope: 'local' | 'national' | 'institutional';
	/** True when the outlet ran the shared wire story rather than its own. */
	syndicated?: boolean;
};

export const press: PressItem[] = [
	{
		outlet: 'Kuzey Ekspres',
		url: 'https://www.kuzeyekspres.com.tr/haber/28324388/frc-off-season-heyecani-hayri-gurde-yasandi',
		date: '2026-07-11',
		scope: 'local'
	},
	{
		outlet: 'İlkhaber Gazetesi',
		url: 'https://www.ilkhaber-gazetesi.com/bilim-ve-teknoloji/trabzonspor-is-birligiyle-first-robotics-competition-off-season-etkinligi-duzenlendi-425525',
		scope: 'local'
	},
	{
		outlet: 'HaberTS',
		url: 'https://www.haberts.com/trabzonda-robot-turnuvasi-heyecani-basladi',
		scope: 'local'
	},
	{
		outlet: 'Trabzon Merkez Fen Lisesi',
		url: 'https://trabzonfenlisesi.meb.k12.tr/icerikler/frcoffseasonetkinligiilkkeztrabzondaduzenleniyor_17565325.html',
		scope: 'institutional'
	},
	{
		outlet: 'Mynet',
		url: 'https://haber.mynet.com/robotlar-spor-salonunda-yaristi-110107301522',
		scope: 'national',
		syndicated: true
	},
	{
		outlet: 'Net Haber',
		url: 'https://www.nethaber.com.tr/robotlar-spor-salonunda-yaristi/800306/',
		scope: 'national',
		syndicated: true
	},
	{
		outlet: 'Güne Bakış',
		url: 'https://gunebakisgazetesi.com/haber/28324240/robotlar-spor-salonunda-yaristi',
		scope: 'national',
		syndicated: true
	},
	{
		outlet: 'Karabük Postası',
		url: 'https://karabukpostasi.com/robotlar-spor-salonunda-yaristi/',
		scope: 'national',
		syndicated: true
	},
	{
		outlet: 'Mersin Haber Merkezi',
		url: 'https://www.mersinhabermerkezi.com/robotlar-spor-salonunda-yaristi',
		scope: 'national',
		syndicated: true
	},
	{
		outlet: 'Kenthaber27 · Gaziantep',
		url: 'https://www.kenthaber27.com/haber/robotlar-spor-salonunda-yaristi-1261250.html',
		scope: 'national',
		syndicated: true
	}
];

/** Outlets that ran the shared wire story — the spread, rather than the depth. */
export const syndicatedCount = press.filter((item) => item.syndicated).length;
