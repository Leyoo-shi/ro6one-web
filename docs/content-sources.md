# Content sources

Every factual statement on the public site traces back to one of two things:

- **T** — supplied directly by the team
- **V** — verified against a public source, listed below

If a claim is neither, it does not go on the site. This file is the record; keep
it updated when copy changes.

---

## Identity

| Claim                                                                      | Basis | Source                                                   |
| -------------------------------------------------------------------------- | ----- | -------------------------------------------------------- |
| Full name: Trabzonspor Ro6one Robotics                                     | T, V  | Public reporting on the Trabzonspor cooperation protocol |
| FRC team number 11919                                                      | T     | —                                                        |
| Formed February 2026                                                       | T     | —                                                        |
| Home: Trabzon Merkez Fen Lisesi                                            | T, V  | School's own site (MEB), press                           |
| Based in Trabzon, Türkiye                                                  | T     | —                                                        |
| No official FRC competition season completed yet; next season is the first | T     | —                                                        |
| Contact addresses, Instagram / YouTube / LinkedIn accounts                 | T     | —                                                        |

## Trabzonspor cooperation protocol

| Claim                                                                                                                                                                                        | Basis |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Protocol signed between Trabzonspor and Trabzon Merkez Fen Lisesi, March 2026                                                                                                                | V     |
| Covers science, technology and engineering; commits material and in-kind support for the FRC team through national and international competitions; framed as sustainable rather than one-off | V     |

Reported by multiple outlets around 23–24 March 2026, e.g.
`61saat.com/trabzonspordan-trabzon-lisesi-ile-robotik-is-birligi`,
`ereglionder.com.tr/trabzonspor-ile-trabzon-merkez-fen-lisesi-arasinda-is-birligi-protokolu-imzalandi`.

> Public reporting also names the signatories (the club's general secretary and
> the school's principal) and the team's mentor. **Those names are deliberately
> not published on the site** — naming people is the team's call, not ours.

## Spor STEAM Fest ’26

| Claim                                                                                                                                              | Basis |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| Official name "Spor STEAM Fest ’26", held 28 April 2026                                                                                            | V     |
| Organized by the Ro6one team, under Trabzonspor sponsorship                                                                                        | V     |
| Four participating schools: Trabzon Merkez Fen Lisesi, Kanuni Anadolu Lisesi, Trabzon Sosyal Bilimler Lisesi, Trabzon Tevfik Serdar Anadolu Lisesi | T, V  |
| Boys' football tournament and girls' volleyball tournament                                                                                         | T     |
| STEM stands: TÜBİTAK and TEKNOFEST projects, chemistry, biology, engineering, line-following robots, mathematics                                   | T     |
| Chemistry and physics demonstrations between sessions                                                                                              | T     |

Primary source (official): the school's own page,
`trabzonfenlisesi.meb.k12.tr` → "Trabzonspor Sponsorluğunda Spor Steam Fest'26
Festivalini Gerçekleştirdik".

## Trabzon Off-Season

| Claim                                                               | Basis |
| ------------------------------------------------------------------- | ----- |
| Held 10–12 July 2026 at Hayri Gür Spor Salonu, Trabzon              | V     |
| 21 teams                                                            | T, V  |
| Teams travelled from İstanbul, Ankara, Bursa, Kocaeli and Trabzon   | V     |
| Organized by RO6ONE, with Trabzon Merkez Fen Lisesi and Trabzonspor | V     |
| First FRC Off-Season held in the Black Sea Region                   | V     |
| Covered by national press                                           | V     |

Sources include Habertürk
(`haberturk.com/gundem/karadeniz-in-ilk-robot-turnuvasi-trabzon-da-duzenlenecek-3897053`)
plus regional outlets (Kuzey Ekspres, İlkhaber, Taka Gazete, Megabayt).

**Not published:** the team reports TRT Haber coverage. That could not be
verified from a TRT URL during this pass, so the site says "covered by national
press" instead of naming a broadcaster. Add the link to
`events.ts → coverage` and the outlet name can be published.

**Also not published:** award categories reported by the press. Awards handed
out at an event the team organized are easy to misread as awards the team won,
so they stay off the site until the team decides how to frame them.

## Çarşıbaşı robotics days

| Claim                                                                                            | Basis |
| ------------------------------------------------------------------------------------------------ | ----- |
| Two days of robotics training and a tournament, October 2026                                     | T     |
| Run by RO6ONE together with RoboLynx, Hypium and T2A                                             | T     |
| About 140 students from Çarşıbaşı Ortaokulu and Çarşıbaşı İsmail Çavuş İmam Hatip Ortaokulu      | T     |
| Day one: Pinoo robotics kits — basic electronics, algorithmic thinking, robot control, Bluetooth | T     |
| Day two: teams formed for a robot football tournament                                            | T     |

Single source, the team's own announcement:
`instagram.com/p/Deesc8liMwY`, published 14.10.2026 by `@ts_ro6one11919`.

**Not published:** exact dates. The post says the event filled "the two days we
have just left behind" and names no date; which two days that was cannot be
established from it, so `events.ts` stores `2026-10` and the site shows the
month. Ask the team rather than narrowing it.

**Not published:** an event name. The team did not give it one, so the site
describes it ("Çarşıbaşı workshop and tournament") rather than inventing a
title.

**Note on the student figure.** The rest of the site carries no attendance or
reach numbers because none were supplied. This one is supplied — by the team,
in public, about its own event — and is published the same way "21 teams" and
"four schools" are: as a participation fact, with the approximation the team
used kept ("~140", not "140").

> Only one photograph could be retrieved: the post's own cover frame. Instagram
> serves the rest of a carousel to signed-in sessions only. See
> `images/carsibasi/SOURCE.txt` — the originals should come from the team.

## Organization

All headcounts and structure (operations 8, PR leads 3, Creative & Prepare 9,
sponsorship 6, finance 2, the 9-person flexible pool, and the media pipeline of
capture / direction / two camera operators / two editors) are **T**.

Ekip Ro6one is described as Nextcloud-based, team-configured, team-extended and
team-operated — **T**, and worded to avoid claiming the team wrote Nextcloud.

**Never published:** the hosting vendor, any prospective partner or sponsor
under discussion, private Git or infrastructure plans, hostnames, addresses or
anything else operational. See the notes in `src/lib/content/partners.ts`.

## Current-season supporters

| Claim                                                                                  | Basis |
| -------------------------------------------------------------------------------------- | ----- |
| Boeing supports the 2026–27 FRC season through the Boeing Team Grant program           | T     |
| Fikret Yüksel Vakfı supports the team's first official FRC season                      | T     |
| The team holds written permission to use Boeing branding for this support relationship | T     |

Both records live in `src/lib/content/partners.ts`. **No grant amount, duration,
tier, exclusivity or title is published**, because none was supplied — and none
should be added without the team saying so in writing. "FIRST Team Grant
Support" and "Team Support" are the relationship labels the team gave; they are
not sponsorship tiers, and the site has no tier system.

Logo provenance (assets committed under `static/media/partners/`):

| File                           | Source                                                                                                           |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `boeing.svg`                   | `boeing.com/content/dam/boeing/boeing-logo-white.svg` — the reversed mark boeing.com runs in its own header      |
| `fikret-yuksel-foundation.png` | `fikretyukselfoundation.org/wp-content/uploads/2023/11/F-Y-Tam-Renk.png` — the Foundation's full-colour original |

The Boeing SVG is committed byte-for-byte as downloaded. The Fikret Yüksel PNG
was resampled from 2856×939 to 1200×395 and palette-optimized; colours,
proportions and artwork are unchanged. Neither logo is recoloured, redrawn,
cropped or re-proportioned anywhere on the site: a mark that needs a light
ground gets a light stage, never a repaint.

> Boeing publishes no clean high-resolution logo for light backgrounds — the
> blue-on-white version on `boeing.com/company/brand` exists only as a 300×119
> raster. If the team receives official artwork with its trademark agreement,
> replace the file and set `logoField: 'light'` on the record.

## Deliberately absent

No awards, rankings, placements, attendance figures, social metrics, budgets,
robot specifications or years of history appear anywhere on the site, because
none have been supplied or verified.

The one participation figure that does appear — about 140 students at Çarşıbaşı
— is there because the team published it itself. It is a count of who took
part, in the same class as "21 teams" and "four schools", and it is not a reach
or audience claim. No aggregate of these numbers is kept anywhere, and none
should be.
