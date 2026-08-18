#!/usr/bin/env python3
"""
RO6ONE brand assets.

Derives everything the site needs from the one supplied logo file. The source is
never modified.

    python3 scripts/process_brand.py

INPUT
    images/icons/ro6one-logo.jpg      874x849, blue wave-formed wildcat head on
                                      a solid dark burgundy field

OUTPUT
    static/favicon.png                48px, tight crop of the head
    static/apple-touch-icon.png       180px, padded on the source's own burgundy
    static/media/brand/mark-{64,128,256}.png   background removed, transparent
    static/media/brand/og.png         1200x630 share card

NOTES
    The background is a single flat colour, so it is removed by colour distance
    rather than by guessing an outline. Values below were measured from the
    file's corners; if the logo is ever replaced, re-check them.
"""

from __future__ import annotations

import pathlib

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "images" / "icons" / "ro6one-logo.jpg"
STATIC = ROOT / "static"
BRAND_OUT = STATIC / "media" / "brand"

MARK_SIZES = (64, 128, 256)

# Graphite the site is built on, for the share card.
INK = (13, 14, 17)


# Liberation Sans is metrically compatible with Arial and ships with the
# distribution; the card is the only place the pipeline needs to set type.
FONT_CANDIDATES = {
    True: (
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ),
    False: (
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ),
}


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES[bold]:
        if pathlib.Path(path).exists():
            return ImageFont.truetype(path, size)

    print("  WARNING: no TrueType font found; share card type will be tiny")
    return ImageFont.load_default()


def measure_background(image: Image.Image) -> tuple[int, int, int]:
    """The flat field colour, taken from the four corners."""
    width, height = image.size
    corners = [(2, 2), (width - 3, 2), (2, height - 3), (width - 3, height - 3)]
    samples = [image.getpixel(point) for point in corners]

    return tuple(round(sum(channel) / len(samples)) for channel in zip(*samples))  # type: ignore[return-value]


def cut_out(image: Image.Image, background: tuple[int, int, int], tolerance: int = 46) -> Image.Image:
    """
    Replace the flat background with transparency.

    Distance in RGB is enough here because the artwork is blue and the field is
    burgundy — they are nowhere near each other — and the edge is softened by a
    one-pixel blur of the mask so the cut does not look like a sticker.
    """
    rgba = image.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size

    mask = Image.new("L", rgba.size, 255)
    mask_pixels = mask.load()

    for y in range(height):
        for x in range(width):
            r, g, b, _ = pixels[x, y]
            distance = abs(r - background[0]) + abs(g - background[1]) + abs(b - background[2])

            if distance < tolerance:
                mask_pixels[x, y] = 0

    mask = mask.filter(ImageFilter.GaussianBlur(0.6))
    rgba.putalpha(mask)

    return rgba


def artwork_box(image: Image.Image) -> tuple[int, int, int, int]:
    """Bounding box of the mark itself, from the alpha channel."""
    return image.split()[-1].getbbox() or (0, 0, *image.size)


def square(box: tuple[int, int, int, int], padding: float) -> tuple[int, int, int, int]:
    left, top, right, bottom = box
    width, height = right - left, bottom - top
    side = max(width, height) * (1 + padding)

    centre_x = left + width / 2
    centre_y = top + height / 2

    return (
        round(centre_x - side / 2),
        round(centre_y - side / 2),
        round(centre_x + side / 2),
        round(centre_y + side / 2),
    )


def main() -> None:
    source = Image.open(SOURCE).convert("RGB")
    background = measure_background(source)
    print(f"  background   rgb{background}")

    transparent = cut_out(source, background)
    box = artwork_box(transparent)
    print(f"  artwork box  {box}")

    BRAND_OUT.mkdir(parents=True, exist_ok=True)

    # --- transparent mark, used in the header lockup ----------------------- #
    tight = transparent.crop(square(box, 0.06))

    for size in MARK_SIZES:
        target = BRAND_OUT / f"mark-{size}.png"
        tight.resize((size, size), Image.LANCZOS).save(target, "PNG", optimize=True)
        print(f"  mark         {target.relative_to(ROOT)}")

    # --- favicon: the head, cropped tight so it survives 16px -------------- #
    favicon = transparent.crop(square(box, 0.02))
    plate = Image.new("RGBA", favicon.size, (*background, 255))
    plate.alpha_composite(favicon)
    plate.convert("RGB").resize((48, 48), Image.LANCZOS).save(
        STATIC / "favicon.png", "PNG", optimize=True
    )
    print("  favicon      static/favicon.png")

    touch = Image.new("RGBA", favicon.size, (*background, 255))
    touch.alpha_composite(favicon)
    touch.convert("RGB").resize((180, 180), Image.LANCZOS).save(
        STATIC / "apple-touch-icon.png", "PNG", optimize=True
    )
    print("  touch icon   static/apple-touch-icon.png")

    # --- share card -------------------------------------------------------- #
    #
    # A designed card, not a screenshot: the mark at the left, the identity set
    # against a rule, and the two lights the site is built from — navy high
    # left, burgundy low right.
    card = Image.new("RGB", (1200, 630), INK)

    for radius, colour, centre, weight in (
        (820, (46, 16, 24), (1180, 690), 0.75),
        (640, (16, 27, 46), (60, -80), 0.6),
    ):
        glow = Image.new("RGB", card.size, INK)
        ImageDraw.Draw(glow).ellipse(
            [centre[0] - radius, centre[1] - radius, centre[0] + radius, centre[1] + radius],
            fill=colour,
        )
        card = Image.blend(card, glow.filter(ImageFilter.GaussianBlur(160)), weight)

    draw = ImageDraw.Draw(card)

    mark = tight.resize((360, 360), Image.LANCZOS)
    card.paste(mark, (84, 135), mark)

    wordmark = load_font(96, bold=True)
    line = load_font(30, bold=True)
    small = load_font(23)

    text_x = 512
    draw.line([(text_x - 56, 168), (text_x - 56, 470)], fill=(84, 88, 100), width=1)

    draw.text((text_x, 168), "TRABZONSPOR", font=small, fill=(158, 166, 178))
    draw.text((text_x, 206), "RO6ONE", font=wordmark, fill=(244, 244, 242))
    draw.text((text_x, 318), "ROBOTICS", font=line, fill=(196, 202, 212))

    draw.line([(text_x, 378), (text_x + 300, 378)], fill=(84, 88, 100), width=1)

    draw.text((text_x, 402), "FRC TEAM #11919", font=line, fill=(208, 154, 167))
    draw.text((text_x, 444), "TRABZON, TÜRKİYE  ·  ro6one.com", font=small, fill=(159, 188, 208))

    card.save(BRAND_OUT / "og.png", "PNG", optimize=True)
    print("  share card   static/media/brand/og.png")


if __name__ == "__main__":
    main()
