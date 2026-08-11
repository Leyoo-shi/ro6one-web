<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		eyebrow: string;
		title: string;
		lede?: string;
	};

	let { eyebrow, title, lede }: Props = $props();
</script>

<!--
	Shared opening for every inner page: it repeats the hero's asymmetry (large
	statement left, supporting line right) at a quieter scale, so pages read as
	continuations of the home page rather than separate documents.
-->
<header class="page-header">
	<div class="shell page-header__inner">
		<p class="label page-header__eyebrow" use:reveal>{eyebrow}</p>

		<h1 class="page-header__title" use:reveal={{ delay: 60 }}>{title}</h1>

		{#if lede}
			<p class="lede page-header__lede" use:reveal={{ delay: 120 }}>{lede}</p>
		{/if}

		<span class="page-header__rule" aria-hidden="true"></span>
	</div>
</header>

<style>
	.page-header {
		padding-top: calc(var(--header-height) + clamp(3rem, 8vw, 7rem));
	}

	.page-header__inner {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: clamp(1rem, 2vw, 2rem);
		row-gap: var(--space-m);
	}

	.page-header__eyebrow {
		grid-column: 1 / -1;
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

	@media (max-width: 1024px) {
		.page-header__title {
			grid-column: 1 / -1;
		}

		.page-header__lede {
			grid-column: 1 / 10;
			align-self: start;
			padding-bottom: 0;
		}
	}
</style>
