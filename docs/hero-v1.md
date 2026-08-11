# Hero surface — v1

The hero background is a real-time lighting simulation drawn on a 2D canvas
(`src/lib/components/ui/HeroLightCanvas.svelte`). It is not an image, a video or a CSS gradient.

The goal is a **single-piece metal panel, slightly concave**, lit from the front, where moving the
pointer reveals the shape of the surface. Material quality and restraint matter more than effect:
the panel should feel like an object the page is resting on.

---

## How it works

Per pixel, at a low resolution that is then scaled up by the browser:

1. **Surface form.** A wide, shallow dish is defined analytically: distance from the dish centre in
   panel units, smoothed with a `3t² − 2t³` falloff so the curvature fades out at the edges instead
   of ending in a visible rim.
2. **Surface normal.** The gradient of that height field gives the macro normal, plus a fixed
   pseudo-random micro texture (the roughness of brushed metal). The noise is generated once, so
   the material never shimmers between frames.
3. **Lighting.** A Lambert diffuse term for the pointer-driven key light, a Blinn-Phong style
   specular term via the half-vector, plus a weak fixed fill light from the upper left so the panel
   still catches light when the pointer is far away.
4. **Anisotropy.** The normal's Y component is damped when computing the specular term, which
   stretches the highlight horizontally — the visual signature of a brushed finish.
5. **Tone.** Base graphite `rgb(13 14 17)`, an ordered 4×4 Bayer dither to break up banding in
   the dark tones, and a mild vignette that reads as the viewing character of the surface rather
   than a separate oval light.
6. **Institutional colour, as light.** The key light's specular tip carries a few units of extra
   red (a burgundy warmth) and the fixed fill light carries extra blue (a navy coolness). The base
   material stays neutral graphite, so the club colours only appear where the surface curves into
   the light — felt rather than seen. Channel weights live at the end of `renderSurface`.

The pointer does not drag the light around directly: the target is smoothed by a small
spring/damper (X slightly faster than Y), so the highlight follows with weight.

---

## Performance

| Concern                  | Handling                                                                  |
| ------------------------ | ------------------------------------------------------------------------- |
| Pixel cost               | Fixed budget of ~40 000 pixels; the buffer's aspect follows the container |
| Idle cost                | **The rAF loop stops entirely once the light settles** and wakes on input |
| Off-screen               | `IntersectionObserver` stops the loop when the hero scrolls away          |
| Background tab           | `visibilitychange` stops the loop; the buffer is re-validated on wake     |
| Resize                   | `ResizeObserver` rebuilds the buffer and noise for the new aspect ratio   |
| Touch devices            | Pointer tracking is only attached for fine pointers — no rAF loop at all  |
| `prefers-reduced-motion` | One static frame is drawn at the rest position; no tracking, no loop      |

The first frame is rendered synchronously on mount, so the surface is never blank even if `rAF`
never runs (hidden tab, throttled background load).

---

## Tuning

All the knobs are constants at the top of `onMount`:

| Constant                              | Effect                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------- |
| `concavityStrength`                   | Depth of the dish. Too high reads as a bowl                                |
| `concavityRadiusX` / `Y`              | How far the curvature spreads across the panel                             |
| `concavityCenterY`                    | Dish centre, kept slightly above geometric centre                          |
| `fillX` / `fillY` / `fillZ`           | Direction and distance of the fixed fill light                             |
| `restX` / `restY`                     | Where the light sits with no pointer (also the touch/reduced-motion frame) |
| `pixelBudget`                         | Quality vs. CPU                                                            |
| Specular exponent (`Math.pow(…, 11)`) | Lower = more matte, higher = glossier                                      |

The composition around it lives in `src/lib/components/sections/Hero.svelte`: the entrance sequence
(surface wipe → eyebrow → headline lines → description → meta → scroll cue, ~1.05 s total), the
12-column grid, and the top/bottom gradients that keep the fixed header legible and let the panel
dissolve into the page below.

---

## Future path: WebGL

The lighting model is deliberately written as "normal → light vector → diffuse + specular", the same
shape as a fragment shader. Migrating to Three.js with a `MeshPhysicalMaterial`, a real normal map
and GPU lighting would buy: higher resolution, true roughness/metalness response, environment
reflections, and per-frame cost that no longer scales with CPU.

It is **not** required. The current implementation is ~300 lines, ships no dependency, costs nothing
when idle, and degrades cleanly on touch and reduced-motion. Migrate only when the design needs
something the CPU version genuinely cannot express — and keep this document's behaviour list as the
acceptance criteria for the replacement.

> Note: `three` and `@types/three` were removed from `package.json`; nothing imported them. Add them
> back at the point the migration actually starts.
