# Adding photography

The site is built so that ingesting the archive is a **data edit, not a
redesign**. Every place a photograph belongs already exists as a _slot_ in
`src/lib/content/media.ts`, with the aspect ratio the composition reserves and a
note describing the picture that belongs there.

## The workflow

1. **Drop the files in** under `static/images/<category>/`, e.g.
   `static/images/offseason/offseason01.jpg`. Categories match the slot
   categories: `team`, `steamfest`, `offseason`, `infrastructure`, `robotics`,
   `trabzonspor`, `brand`.

2. **Optimize before committing.** Target roughly:

   | Use                       | Long edge | Format       |
   | ------------------------- | --------- | ------------ |
   | Full-bleed banner (21:9)  | 2400 px   | WebP or JPEG |
   | Section image (3:2, 16:9) | 1600 px   | WebP or JPEG |
   | Portrait / square         | 1200 px   | WebP or JPEG |

   Keep the untouched originals in the team archive — commit derived, optimized
   versions only.

3. **Fill in the slot** in `media.ts`:

   ```ts
   {
     id: 'home.offseason.wide',
     category: 'offseason',
     aspect: '21 / 9',
     src: '/images/offseason/offseason01.jpg',
     alt: { en: 'The competition field at Hayri Gür Spor Salonu, mid-match.',
            tr: 'Hayri Gür Spor Salonu’ndaki yarışma sahası, maç sırasında.' },
     focal: { x: 50, y: 35 },
     need: '…'
   }
   ```

   - `alt` is required whenever `src` is set. Describe what is happening, not
     "photo of the team". Use `''` only for a purely decorative image.
   - `focal` keeps the subject in frame when the aspect crops. Percentages.
   - `priority: true` only for images above the fold.
   - Leave `need` in place; it documents what the slot is for.

4. **Check the crops** at 1440, 1024 and 390 px. If a subject keeps getting cut,
   adjust `focal` before changing the layout.

Nothing else has to change: `MediaFrame` swaps its designed aperture for the
photograph automatically, with lazy loading and the reserved aspect ratio
already in place, so there is no layout shift.

## Consent

Before publishing photographs of students, make sure consent is in place — the
same rule that keeps `members.ts` empty. Prefer wide and working shots over
identifiable portraits where consent is unclear.

## Current slots

See `src/lib/content/media.ts` for the authoritative list and each slot's brief.
The final report for this pass ranks them by priority.
