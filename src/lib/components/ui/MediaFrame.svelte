<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { getMediaSlot, type MediaSlotId } from '$lib/content/media';
	import { resolveText } from '$lib/content/localized';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		/** Media slot id from content/media.ts. */
		id: MediaSlotId;
		/** Responsive `sizes` hint; only used once a real image exists. */
		sizes?: string;
		/** Show the slot's caption under the frame when the image has one. */
		showCaption?: boolean;
		class?: string;
	};

	let { id, sizes = '100vw', showCaption = true, class: className = '' }: Props = $props();

	const i18n = useI18n();
	const media = $derived(getMediaSlot(id));
	const aspectCode = $derived(media.aspect.replace(/\s*\/\s*/, ':'));
</script>

<!--
	A media *aperture*, not a placeholder.

	Photography arrives as data: setting `src` on the slot in content/media.ts
	turns this frame into an image without touching the composition. Until then
	the frame is a designed part of the page — a recessed field with crop marks
	and its own label — so a section never looks broken for want of a photo.
-->
<figure class="frame {className}" style="--frame-aspect: {media.aspect}" use:reveal>
	{#if media.src}
		<img
			class="frame__image"
			src={media.src}
			alt={resolveText(media.alt, i18n.locale)}
			{sizes}
			loading={media.priority ? 'eager' : 'lazy'}
			decoding={media.priority ? 'sync' : 'async'}
			fetchpriority={media.priority ? 'high' : 'auto'}
			style={media.focal
				? `object-position: ${media.focal.x}% ${media.focal.y}%`
				: 'object-position: 50% 50%'}
		/>
	{:else}
		<div class="frame__field" aria-hidden="true">
			<span class="frame__mark frame__mark--tl"></span>
			<span class="frame__mark frame__mark--tr"></span>
			<span class="frame__mark frame__mark--bl"></span>
			<span class="frame__mark frame__mark--br"></span>

			<span class="frame__meta">
				<span>{i18n.t.media.categories[media.category]}</span>
				<span class="frame__ratio">{aspectCode}</span>
			</span>
		</div>
	{/if}

	{#if showCaption && media.src && media.caption}
		<figcaption class="frame__caption">{resolveText(media.caption, i18n.locale)}</figcaption>
	{/if}
</figure>

<style>
	.frame {
		position: relative;
		margin: 0;
	}

	.frame__image,
	.frame__field {
		display: block;
		width: 100%;
		aspect-ratio: var(--frame-aspect);
		border-radius: var(--radius-s);
	}

	.frame__image {
		height: auto;
		object-fit: cover;
		background: var(--surface-void);
	}

	/*
	 * The empty state reads as a machined recess in the page surface: a slightly
	 * darker field, a hairline, and drafting crop marks at the corners.
	 */
	.frame__field {
		position: relative;
		overflow: hidden;

		background:
			radial-gradient(120% 100% at 50% 0%, rgb(244 244 242 / 0.035), transparent 70%),
			var(--surface-void);
		box-shadow:
			inset 0 1px 0 rgb(244 244 242 / 0.04),
			inset 0 0 0 1px rgb(244 244 242 / 0.05);
	}

	.frame__mark {
		position: absolute;
		width: 0.75rem;
		height: 0.75rem;
		border: 0 solid var(--edge);
	}

	.frame__mark--tl {
		top: 0.6rem;
		left: 0.6rem;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.frame__mark--tr {
		top: 0.6rem;
		right: 0.6rem;
		border-top-width: 1px;
		border-right-width: 1px;
	}

	.frame__mark--bl {
		bottom: 0.6rem;
		left: 0.6rem;
		border-bottom-width: 1px;
		border-left-width: 1px;
	}

	.frame__mark--br {
		bottom: 0.6rem;
		right: 0.6rem;
		border-bottom-width: 1px;
		border-right-width: 1px;
	}

	.frame__meta {
		position: absolute;
		inset: auto 1.5rem 1.35rem;

		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-faint);
	}

	.frame__ratio {
		letter-spacing: 0.1em;
	}

	.frame__caption {
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.5;
		color: var(--text-muted);
	}

	@media (max-width: 640px) {
		.frame__meta {
			inset: auto 1rem 0.9rem;
		}
	}
</style>
