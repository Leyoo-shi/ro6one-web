<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	type Props = {
		title: string;
		body: string;
	};

	let { title, body }: Props = $props();
</script>

<!--
	Used wherever real content does not exist yet. It states plainly that the
	section is unpopulated instead of filling the page with invented entries.
-->
<div class="empty" use:reveal>
	<span class="empty__mark" aria-hidden="true"></span>

	<div>
		<h3 class="empty__title">{title}</h3>
		<p class="empty__body">{body}</p>
	</div>
</div>

<style>
	.empty {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: clamp(1rem, 3vw, 2.5rem);
		align-items: start;

		padding: clamp(1.5rem, 4vw, 2.75rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(244 244 242 / 0.02), transparent);
	}

	.empty__mark {
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.5rem;
		border: 1px solid var(--signal);
		border-radius: 50%;
		opacity: 0.7;
	}

	.empty__title {
		font-size: var(--type-body);
		font-weight: 500;
		letter-spacing: -0.015em;
	}

	.empty__body {
		max-width: 62ch;
		margin-top: 0.55rem;
		font-size: var(--type-small);
		line-height: 1.6;
		color: var(--text-muted);
	}
</style>
