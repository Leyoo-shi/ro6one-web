<script lang="ts">
	import { locales, localeMeta, type Locale } from '$lib/i18n';
	import { useI18n } from '$lib/i18n/context.svelte';

	type Props = {
		/** `bar` for the header rail, `stacked` for the mobile menu and footer. */
		variant?: 'bar' | 'stacked';
	};

	let { variant = 'bar' }: Props = $props();

	const i18n = useI18n();

	function choose(locale: Locale) {
		i18n.set(locale);
	}
</script>

<div class="switcher switcher--{variant}" role="group" aria-label={i18n.t.common.languageLabel}>
	{#each locales as locale, index (locale)}
		{#if index > 0}
			<span class="switcher__divider" aria-hidden="true"></span>
		{/if}

		<button
			type="button"
			class="switcher__option"
			aria-pressed={i18n.locale === locale}
			lang={locale}
			onclick={() => choose(locale)}
		>
			<span class="switcher__short">{localeMeta[locale].short}</span>
			<span class="switcher__full">{localeMeta[locale].label}</span>
		</button>
	{/each}
</div>

<style>
	.switcher {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}

	.switcher__divider {
		width: 1px;
		height: 0.7rem;
		background: var(--edge);
	}

	.switcher__option {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		font-weight: 500;
		letter-spacing: 0.1em;
		line-height: 1;

		color: var(--text-muted);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.switcher__option:hover {
		color: var(--text-secondary);
	}

	.switcher__option[aria-pressed='true'] {
		color: var(--text-primary);
	}

	/* The long name is for the stacked variant and for assistive tech. */
	.switcher--bar .switcher__full {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.switcher--stacked {
		gap: 1rem;
	}

	.switcher--stacked .switcher__option {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		font-size: var(--type-small);
		letter-spacing: 0.04em;
	}

	.switcher--stacked .switcher__short {
		color: var(--text-muted);
		font-size: var(--type-micro);
	}

	.switcher--stacked .switcher__option[aria-pressed='true'] .switcher__short {
		color: var(--signal);
	}
</style>
