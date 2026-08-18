#!/usr/bin/env python3
"""
RO6ONE media pipeline.

Turns the raw archives in images/ into the optimised assets the site serves,
and writes a manifest the app reads at build time. Source files are never
modified: everything is written to static/media/ and can be deleted and
regenerated at any time.

    python3 scripts/process_media.py            # members + curated event media
    python3 scripts/process_media.py members    # members only
    python3 scripts/process_media.py events     # event media only

INPUT
    images/members/<key>.jpg          one portrait per roster key
    scripts/member_focus.json         hand-set focal point + framing per member
    scripts/event_selection.json      curated event photographs + crops

OUTPUT
    static/media/members/<key>-{320,640}.webp
    static/media/events/<id>-{640,1280,1920}.webp
    src/lib/content/generated/member-media.json
    src/lib/content/generated/event-media.json

PLACEHOLDERS
    A roster member with no photograph gets one generated at the *expected
    source path* (images/members/<key>.jpg) so that dropping the real photo in
    over it needs no code change — just re-run this script. Generated files are
    listed in images/members/_generated-placeholders.txt and are the only files
    in that folder this script will ever overwrite.

REGENERATION
    Derivatives are rebuilt when the source is newer than the output, or with
    --force. Replacing a source photo therefore invalidates its derivatives.
"""

from __future__ import annotations

import json
import pathlib
import sys

from PIL import Image, ImageDraw, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent

MEMBER_SRC = ROOT / "images" / "members"
# Add a folder here and its photographs become selectable in
# scripts/event_selection.json — no other code changes. images/offseason/ is
# declared ahead of the archive arriving so the ingest is a copy and a JSON edit.
EVENT_DIRS = {
    "steamfest": ROOT / "images" / "steamfest",
    "offseason": ROOT / "images" / "offseason",
}
PLACEHOLDER_LOG = MEMBER_SRC / "_generated-placeholders.txt"

MEMBER_OUT = ROOT / "static" / "media" / "members"
EVENT_OUT = ROOT / "static" / "media" / "events"
GENERATED = ROOT / "src" / "lib" / "content" / "generated"

# Portrait frame. 4:5 gives a person room without becoming a passport photo.
MEMBER_RATIO = 4 / 5
MEMBER_WIDTHS = (320, 640)
EVENT_WIDTHS = (640, 1280, 1920)
WEBP_QUALITY = 82

# Portraits use the largest 4:5 rectangle that fits the source, shifted so the
# person is centred. Nothing is zoomed in to equalise face size: an honest
# difference in apparent scale beats a soft, over-cropped portrait.
#
# `tighten` in member_focus.json is an escape hatch for the few sources where
# the full rectangle really is too wide — capped so it can never destroy detail.
MIN_TIGHTEN = 0.72

ROSTER_KEYS = [
    "yigitpursali", "zuleyhaaydin", "doganefeasci", "taharemziaydin", "ilgazguven",
    "yagmurhavvayenibaki", "alaaddinbilgintopal", "azraezgiturhan", "batuhanverep",
    "betultellioglu", "burakyilmazlar", "denizalisahin", "elaecrenakyuz", "eliferoglu",
    "elifranakundakci", "elifsenemozturk", "tugbaezgikara", "fatihkoroglu",
    "furkanhacimahmutoglu", "gizemalbayrak", "hamzanuriasan", "hayatkarahan",
    "ipekbilgin", "ipekturgut", "kaantanyel", "kaanyavuzcelik", "kemalozturk",
    "keremkongur", "koraybaki", "mehmetmesci", "murathanmollamehmetoglu",
    "mustafaerenkarpuz", "nehirgulay", "nesibezenginler", "oktaymetearas",
    "omerfarukozkul", "omeruzun", "oykuyilmaz", "iremozemtaskin", "ayseozgeozdener",
    "sidelyacam", "yigityagizyazici", "zeynepberreisaoglu", "zeynepgoksal",
    "zeynepkarabacak", "zeynepkosterelioglu", "zeynepmorkan", "yagizefekalayci",
    "semramusrabektas", "ceyhuntemel", "muhammetsalihartun",
]

# Initials for the placeholder tiles, so an empty slot still says who is missing.
PLACEHOLDER_INITIALS = {
    "alaaddinbilgintopal": "AT", "ceyhuntemel": "CT", "denizalisahin": "DŞ",
    "eliferoglu": "EE", "furkanhacimahmutoglu": "FH", "hayatkarahan": "HK",
    "keremkongur": "KK", "mehmetmesci": "MM", "muhammetsalihartun": "MA",
    "mustafaerenkarpuz": "MK", "oykuyilmaz": "ÖY", "semramusrabektas": "SB",
    "sidelyacam": "SÇ", "tugbaezgikara": "TK", "zeynepberreisaoglu": "ZI",
}

FORCE = "--force" in sys.argv


# --------------------------------------------------------------------------- #
# helpers
# --------------------------------------------------------------------------- #

def load_json(path: pathlib.Path) -> dict:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def stale(source: pathlib.Path, target: pathlib.Path) -> bool:
    return FORCE or not target.exists() or source.stat().st_mtime > target.stat().st_mtime


def open_upright(path: pathlib.Path) -> Image.Image:
    """Open a source honouring EXIF orientation, so phone photos are not sideways."""
    image = Image.open(path)
    image = ImageOps.exif_transpose(image)
    return image.convert("RGB")


def crop_to_ratio(
    image: Image.Image, ratio: float, focus: tuple[float, float], scale: float = 1.0
) -> Image.Image:
    """
    Crop `image` to `ratio` around `focus`, keeping as many pixels as possible.

    The box is the largest of the target ratio that fits the source (optionally
    tightened a little), then slid — never shrunk — until the focal point is as
    centred as the source boundaries allow.
    """
    width, height = image.size

    box_width = min(width, height * ratio)
    box_height = box_width / ratio

    box_width *= scale
    box_height *= scale

    box_width = min(box_width, width)
    box_height = min(box_height, height)

    centre_x = focus[0] * width
    centre_y = focus[1] * height

    left = min(max(centre_x - box_width / 2, 0), width - box_width)
    top = min(max(centre_y - box_height / 2, 0), height - box_height)

    return image.crop(
        (round(left), round(top), round(left + box_width), round(top + box_height))
    )


def write_webp(image: Image.Image, target: pathlib.Path, width: int) -> int:
    """Write `image` at `width` (never upscaling) and return the width used."""
    final_width = min(width, image.width)
    height = round(final_width / (image.width / image.height))

    resized = image.resize((final_width, height), Image.LANCZOS)
    target.parent.mkdir(parents=True, exist_ok=True)
    resized.save(target, "WEBP", quality=WEBP_QUALITY, method=5)

    return final_width


# --------------------------------------------------------------------------- #
# placeholders
# --------------------------------------------------------------------------- #

def generated_placeholders() -> set[str]:
    if not PLACEHOLDER_LOG.exists():
        return set()

    return {
        line.strip()
        for line in PLACEHOLDER_LOG.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.startswith("#")
    }


def make_placeholder(key: str, target: pathlib.Path) -> None:
    """
    A deliberately graphic tile — never a stock photograph of a stranger.
    Written at the member's expected source filename so the real photo can
    simply replace it.
    """
    width, height = 1000, 1250
    image = Image.new("RGB", (width, height), (13, 14, 17))
    draw = ImageDraw.Draw(image)

    for y in range(height):
        shade = 13 + int(10 * (y / height))
        draw.line([(0, y), (width, y)], fill=(shade, shade + 1, shade + 4))

    # Registration marks, so the empty slot still looks like part of the system.
    inset, arm = 70, 46
    for cx, cy in ((inset, inset), (width - inset, inset), (inset, height - inset), (width - inset, height - inset)):
        draw.line([(cx - arm, cy), (cx + arm, cy)], fill=(60, 64, 72), width=2)
        draw.line([(cx, cy - arm), (cx, cy + arm)], fill=(60, 64, 72), width=2)

    initials = PLACEHOLDER_INITIALS.get(key, key[:2].upper())
    draw.text((width / 2, height / 2 - 40), initials, fill=(150, 158, 170), anchor="mm")
    draw.text((width / 2, height / 2 + 30), "PORTRE BEKLENIYOR", fill=(96, 102, 112), anchor="mm")
    draw.text((width / 2, height / 2 + 60), "AWAITING PORTRAIT", fill=(72, 78, 88), anchor="mm")

    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "JPEG", quality=90)


def ensure_placeholders(aliases: dict[str, str]) -> set[str]:
    """Create a placeholder for every roster key with no source photo."""
    known = generated_placeholders()
    created: set[str] = set()

    for key in ROSTER_KEYS:
        alias = aliases.get(key)

        if alias and (MEMBER_SRC / f"{alias}.jpg").exists():
            continue  # real photograph filed under a different name

        target = MEMBER_SRC / f"{key}.jpg"

        if target.exists() and key not in known:
            continue  # a real photograph — never touched

        if target.exists() and key in known:
            created.add(key)  # still a placeholder from a previous run
            continue

        make_placeholder(key, target)
        created.add(key)
        print(f"  placeholder  {target.relative_to(ROOT)}")

    log = ["# Files in this folder generated by scripts/process_media.py.",
           "# Replace any of them with a real photograph at the same filename and",
           "# re-run the script; the entry disappears from the manifest by itself.",
           *sorted(created)]
    PLACEHOLDER_LOG.write_text("\n".join(log) + "\n", encoding="utf-8")

    return created


# --------------------------------------------------------------------------- #
# members
# --------------------------------------------------------------------------- #

def process_members() -> None:
    config = load_json(ROOT / "scripts" / "member_focus.json")
    defaults = config["defaults"]
    entries = config["members"]

    aliases = {key: value["alias"] for key, value in entries.items() if "alias" in value}
    placeholders = ensure_placeholders(aliases)
    manifest: dict[str, dict] = {}

    for key in ROSTER_KEYS:
        entry = entries.get(key, {})
        alias = entry.get("alias")
        source = MEMBER_SRC / f"{(alias or key)}.jpg"

        if not source.exists():
            print(f"  MISSING      {source.relative_to(ROOT)}")
            continue

        is_placeholder = key in placeholders
        focus = tuple(entry.get("focus", defaults["focus"]))
        scale = 1.0 if is_placeholder else max(MIN_TIGHTEN, float(entry.get("tighten", 1.0)))

        targets = [MEMBER_OUT / f"{key}-{width}.webp" for width in MEMBER_WIDTHS]

        if any(stale(source, target) for target in targets):
            image = open_upright(source)
            cropped = crop_to_ratio(image, MEMBER_RATIO, focus, scale)
            widths = [
                write_webp(cropped, target, width)
                for target, width in zip(targets, MEMBER_WIDTHS)
            ]
            print(f"  member       {key:28s} {cropped.size[0]}x{cropped.size[1]} -> {widths}")
        else:
            widths = [Image.open(target).width for target in targets]

        manifest[key] = {
            # [slot in the filename, real pixel width] — the second value is the
            # srcset `w` descriptor, and is smaller when the source ran out.
            "srcset": [[slot, width] for slot, width in zip(MEMBER_WIDTHS, widths)],
            "placeholder": is_placeholder,
            "lowResolution": max(widths) < MEMBER_WIDTHS[-1],
            "source": source.name,
        }

    write_manifest("member-media.json", manifest)

    real = sum(1 for value in manifest.values() if not value["placeholder"])
    print(f"  {real} photographs, {len(manifest) - real} placeholders")


# --------------------------------------------------------------------------- #
# events
# --------------------------------------------------------------------------- #

def process_events() -> None:
    selection_path = ROOT / "scripts" / "event_selection.json"

    if not selection_path.exists():
        print("  no event_selection.json — skipping event media")
        return

    selection = load_json(selection_path)
    manifest: dict[str, dict] = {}

    for item in selection["images"]:
        event = item["event"]
        source = EVENT_DIRS[event] / item["file"]

        if not source.exists():
            print(f"  MISSING      {source.relative_to(ROOT)}")
            continue

        ratio_parts = [float(part) for part in item["ratio"].split(":")]
        ratio = ratio_parts[0] / ratio_parts[1]
        focus = tuple(item.get("focus", [0.5, 0.5]))

        targets = [EVENT_OUT / f"{item['id']}-{width}.webp" for width in EVENT_WIDTHS]

        if any(stale(source, target) for target in targets):
            image = open_upright(source)
            cropped = crop_to_ratio(image, ratio, focus, item.get("scale", 1.0))
            widths = [
                write_webp(cropped, target, width)
                for target, width in zip(targets, EVENT_WIDTHS)
            ]
            print(f"  event        {item['id']:28s} {cropped.size[0]}x{cropped.size[1]} -> {widths}")
        else:
            widths = [Image.open(target).width for target in targets]

        manifest[item["id"]] = {
            "srcset": [[slot, width] for slot, width in zip(EVENT_WIDTHS, widths)],
            "ratio": item["ratio"],
            "event": event,
            "caption": item.get("caption"),
            "source": item["file"],
        }

    write_manifest("event-media.json", manifest)
    print(f"  {len(manifest)} event images")


# --------------------------------------------------------------------------- #

def write_manifest(name: str, data: dict) -> None:
    GENERATED.mkdir(parents=True, exist_ok=True)
    path = GENERATED / name
    path.write_text(json.dumps(data, indent="\t", ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"  manifest     {path.relative_to(ROOT)}")


def main() -> None:
    tasks = [argument for argument in sys.argv[1:] if not argument.startswith("--")]
    run_all = not tasks

    if run_all or "members" in tasks:
        print("members:")
        process_members()

    if run_all or "events" in tasks:
        print("events:")
        process_events()


if __name__ == "__main__":
    main()
