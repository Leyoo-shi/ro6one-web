<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { getMediaSlot, type MediaSlotId } from '$lib/content/media';
	import { resolveText } from '$lib/content/localized';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		eyebrow: string;
		title: string;
		lede?: string;
		/** The room this page opens in. Same vocabulary as ui/Section.svelte. */
		tone?: 'base' | 'void' | 'navy' | 'burgundy' | 'paper' | 'arena' | 'claret' | 'steel';
		/** Optional establishing photograph, bled to both edges under the title. */
		media?: MediaSlotId;
		/** Large structural numeral or word set behind the title. */
		figure?: string;
	};

	let { eyebrow, title, lede, tone = 'base', media, figure }: Props = $props();

	const i18n = useI18n();
	const slot = $derived(media ? getMediaSlot(media) : undefined);
</script>

<!--
	Shared opening for every inner page.

	It repeats the hero's asymmetry — large statement left, supporting line right
	— at a quieter scale, so pages read as continuations of the homepage rather
	than separate documents. What it adds over the original version is the room:
	a page now opens in a colour the way a homepage chapter does, optionally with
	an establishing photograph bled to both edges underneath the statement, and
	optionally with a structural figure set behind the type.

	The figure is decorative and aria-hidden; the h1 remains the only heading.
-->
<header class="page-header room--{tone}">
	<div class="shell page-header__inner">
		{#if figure}
			<span class="page-header__figure" aria-hidden="true">{figure}</span>
		{/if}

		<p class="label page-header__eyebrow" use:reveal>{eyebrow}</p>

		<h1 class="page-header__title" use:reveal={{ delay: 60 }}>{title}</h1>

		{#if lede}
			<p class="lede page-header__lede" use:reveal={{ delay: 120 }}>{lede}</p>
		{/if}

		{#if !slot?.src}
			<span class="page-header__rule" aria-hidden="true"></span>
		{/if}
	</div>

	{#if slot?.src}
		<figure class="page-header__media" use:reveal={{ delay: 160 }}>
			<img
				src={slot.src}
				srcset={slot.srcset}
				sizes="100vw"
				alt={resolveText(slot.alt, i18n.locale)}
				loading="eager"
				decoding="async"
				fetchpriority="high"
			/>
		</figure>
	{/if}
</header>

<style>
	.page-header {
		position: relative;
		padding-top: calc(var(--header-height) + clamp(3rem, 8vw, 7rem));
		overflow: hidden;
	}

	.page-header__inner {
		position: relative;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(1rem, 2vw, 2rem);
		row-gap: var(--space-m);
	}

	/*
	 * Architecture rather than decoration: the figure is set at mega scale in a
	 * barely-there tint, so it gives the opening a sense of size without
	 * competing with the statement sitting on top of it.
	 */
	.page-header__figure {
		position: absolute;
		top: -0.32em;
		right: -0.06em;
		z-index: 0;

		font-size: var(--type-mega);
		font-weight: 700;
		line-height: 0.8;
		letter-spacing: var(--tracking-mega);
		color: var(--text-primary);
		opacity: 0.05;
		pointer-events: none;
		user-select: none;
	}

	.page-header__eyebrow,
	.page-header__title,
	.page-header__lede {
		position: relative;
		z-index: 1;
	}

	.page-header__eyebrow {
		grid-column: 1 / -1;
		color: var(--signal);
	}

	.page-header__title {
		grid-column: 1 / 9;
		max-width: 20ch;

		font-size: var(--type-h1);
		font-weight: 600;
		line-height: 0.98;
		letter-spacing: -0.045em;
	}

	.page-header__lede {
		grid-column: 9 / 13;
		align-self: end;
		padding-bottom: 0.4rem;
	}

	.page-header__rule {
		grid-column: 1 / -1;
		height: 1px;
		margin-top: var(--space-l);
		background: var(--edge-faint);
	}

	/*
	 * The establishing shot runs to both edges. It replaces the hairline rule —
	 * a photograph is a stronger boundary than a 1px line, and having both reads
	 * as indecision.
	 */
	.page-header__media {
		margin: var(--space-2xl) 0 0;
	}

	.page-header__media img {
		display: block;
		width: 100%;
		height: clamp(14rem, 30vw, 26rem);
		object-fit: cover;
		filter: saturate(1.04) contrast(1.03);
	}

	@media (max-width: 1024px) {
		.page-header__title {
			grid-column: 1 / -1;
		}

		.page-header__lede {
			grid-column: 1 / 10;
			align-self: start;
			padding-bottom: 0;
		}

		.page-header__figure {
			font-size: var(--type-display);
			opacity: 0.045;
		}
	}
</style>
