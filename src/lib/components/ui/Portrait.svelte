<script lang="ts">
	import { portraitFor, type Member } from '$lib/content/roster';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		member: Member;
		/** Rendered width hints for the browser's srcset choice. */
		sizes?: string;
		/** Only the first screenful of portraits should load eagerly. */
		priority?: boolean;
		class?: string;
	};

	let { member, sizes = '320px', priority = false, class: className = '' }: Props = $props();

	const i18n = useI18n();
	const portrait = $derived(portraitFor(member.key));

	/*
	 * Alt text names the person because the roster says who this is — never
	 * because anything was inferred from the picture. A generated stand-in is
	 * decorative and gets an empty alt, with the name carried by the caption.
	 */
	const alt = $derived(portrait?.placeholder ? '' : member.name);
</script>

<div class="portrait {className}" class:portrait--pending={portrait?.placeholder}>
	{#if portrait}
		<img
			class="portrait__image"
			src={portrait.src}
			srcset={portrait.srcset}
			{sizes}
			{alt}
			width="640"
			height="800"
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding="async"
		/>
	{/if}

	{#if portrait?.placeholder}
		<span class="portrait__pending">{i18n.t.team.roster.pending}</span>
	{/if}
</div>

<style>
	.portrait {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 5;

		background: linear-gradient(170deg, rgb(244 244 242 / 0.05), rgb(8 9 11 / 0.6));
	}

	.portrait__image {
		width: 100%;
		height: 100%;
		object-fit: cover;

		/*
		 * One grade for the whole archive: fifty-odd different phones, one surface. The
		 * correction is small on purpose — the photographs keep their own colour,
		 * they just stop looking like fifty unrelated uploads.
		 */
		filter: saturate(0.92) contrast(1.04) brightness(0.97);
		transition: filter var(--motion-light) var(--ease-out);
	}

	/* Generated tiles are dimmed further so they never read as a photograph. */
	.portrait--pending .portrait__image {
		filter: saturate(0.2) brightness(0.8);
	}

	.portrait__pending {
		position: absolute;
		inset: auto 0 0;
		padding: 0.5rem 0.7rem;

		font-family: var(--font-mono);
		font-size: 0.5625rem;
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-faint);
	}
</style>
