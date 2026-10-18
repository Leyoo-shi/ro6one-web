<script lang="ts">
	import { resolveText } from '$lib/content/localized';
	import type { Supporter } from '$lib/content/partners';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		supporter: Supporter;
		/** `strip` is the compact homepage stage; `card` is the Partners page. */
		size?: 'card' | 'strip';
	};

	let { supporter, size = 'card' }: Props = $props();

	const i18n = useI18n();
	/*
	 * Empty alt is correct on both surfaces: the organization's name is printed
	 * directly underneath the mark, so reading the logo out as well would say the
	 * same thing twice. A supporter whose mark is its only identification sets
	 * `logoAlt` and gets it.
	 */
	const alt = $derived(resolveText(supporter.logoAlt, i18n.locale));

	/*
	 * Optical sizing, done as equal area rather than equal height.
	 *
	 * Boeing's wordmark is ~4.4:1 and the Fikret Yüksel mark ~3:1. Set to the
	 * same height, the wordmark reads as much the larger of the two; set to the
	 * same width, it reads as much the smaller. Scaling each by
	 * √(reference ÷ its own ratio) gives both marks the same amount of ink on
	 * the page, which is what "the same size" actually means to the eye.
	 */
	const REFERENCE_ASPECT = 3.2;
	const scale = $derived(Math.sqrt(REFERENCE_ASPECT / (supporter.logoAspect ?? REFERENCE_ASPECT)));
</script>

<!--
	A logo stage, not a logo slot.

	Every supporter gets the same box: same height, same hairline, same inset,
	same radius. What differs is the *field* — a reversed mark is given the dark
	ground it was drawn for, a full-colour mark with dark type is given a light
	one. The alternative would be recolouring somebody's trademark to match our
	background, which is not ours to do.

	Sizing is optical rather than mechanical — see `scale` above. Only the height
	is ever set; width follows the file's own ratio, so nothing is stretched or
	cropped, and `max-width` keeps a very wide mark inside its stage by shrinking
	it proportionally rather than squashing it.
-->
<div class="holder holder--{size}">
	<div
		class="stage stage--{size} stage--{supporter.logoField ?? 'light'}"
		style="--mark-scale: {scale.toFixed(4)}"
	>
		<img class="mark" src={supporter.logo} {alt} loading="lazy" decoding="async" />
	</div>
</div>

<style>
	/*
	 * The holder is the measuring container, so both the plate and the mark are
	 * sized against the space they actually get rather than against the viewport.
	 * A card that goes full width on a tablet gets a correspondingly larger logo
	 * instead of a small mark adrift in a wide box.
	 *
	 * Because the plate's height derives from the same base as the mark, every
	 * stage in a row is exactly the same height whatever shape the logos are.
	 */
	.holder {
		container-type: inline-size;
	}

	.holder--card {
		--mark-base: clamp(2.9rem, 13cqw, 4.6rem);
	}

	.holder--strip {
		--mark-base: clamp(2.1rem, 11cqw, 3rem);
	}

	.stage {
		display: flex;
		align-items: center;
		justify-content: center;

		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
	}

	.stage--card {
		height: calc(var(--mark-base) * 2.6);
		padding-inline: clamp(1.75rem, 4vw, 3rem);
	}

	.stage--strip {
		height: calc(var(--mark-base) * 2.5);
		padding-inline: clamp(1.25rem, 3vw, 2rem);
	}

	/*
	 * Light field: the paper the design system already uses for its light rooms,
	 * so an outside brand sits on our material rather than on a white rectangle
	 * borrowed from somewhere else.
	 */
	.stage--light {
		background: var(--room-paper-warm);
		border-color: rgb(20 21 28 / 0.1);
	}

	/* Dark field: the same recessed material as the rest of the site's cards. */
	.stage--dark {
		background: linear-gradient(180deg, rgb(244 244 242 / 0.045), rgb(0 0 0 / 0.18));
	}

	/*
	 * Height is the only dimension set. `width: auto` would leave an SVG at the
	 * intrinsic pixel size written into the file — 142px for the Boeing mark,
	 * which is far smaller than its stage — so the height drives and the width
	 * follows the file's own ratio.
	 */
	.mark {
		display: block;
		height: calc(var(--mark-base) * var(--mark-scale, 1));
		width: auto;
		/* Safety rails. A mark shrinks proportionally; it is never squashed. */
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	@media (max-width: 560px) {
		/* On a phone the logo is the content, so it keeps its presence. */
		.stage--card,
		.stage--strip {
			padding-inline: 1.25rem;
		}
	}
</style>
