<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { connections, domains, flexPool, type DomainId } from '$lib/content/organization';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();

	/*
	 * RO6ONE is a network, not a hierarchy, so this is drawn as one: domains
	 * placed by adjacency, edges for the paths work actually travels, and the
	 * flexible pool as the field everything sits inside rather than another box.
	 *
	 * Every node is a real button: hovering previews, focusing does the same, so
	 * the whole diagram can be explored from the keyboard.
	 */
	let activeId = $state<DomainId>('operations');

	const active = $derived(domains.find((domain) => domain.id === activeId) ?? domains[0]);
	const activeCopy = $derived(i18n.t.organization.domains[active.id]);

	const byId = new Map(domains.map((domain) => [domain.id, domain]));

	const edges = connections.map((connection) => {
		const from = byId.get(connection.from);
		const to = byId.get(connection.to);

		return {
			...connection,
			x1: from?.x ?? 0,
			y1: from?.y ?? 0,
			x2: to?.x ?? 0,
			y2: to?.y ?? 0
		};
	});

	function isLive(edge: (typeof edges)[number]) {
		return edge.from === activeId || edge.to === activeId;
	}

	/** Media is described by its roles; the others by headcount. */
	const activeRoles = $derived(
		'roles' in activeCopy ? Object.entries(activeCopy.roles) : ([] as Array<[string, string]>)
	);
</script>

<div class="network" use:reveal>
	<div class="field">
		<svg class="field__edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
			<!-- The flexible pool: the boundary the whole network works inside. -->
			<rect
				class="field__pool"
				x="3"
				y="8"
				width="94"
				height="88"
				rx="14"
				vector-effect="non-scaling-stroke"
			/>

			{#each edges as edge (`${edge.from}-${edge.to}`)}
				<line
					class="edge"
					class:edge--strong={edge.strong}
					class:edge--live={isLive(edge)}
					x1={edge.x1}
					y1={edge.y1}
					x2={edge.x2}
					y2={edge.y2}
					vector-effect="non-scaling-stroke"
				/>
			{/each}
		</svg>

		<p class="field__pool-label">
			<span>{i18n.t.organization.flex.name}</span>
			<span class="field__pool-count">{flexPool.count}</span>
		</p>

		<ul class="nodes">
			{#each domains as domain (domain.id)}
				<li style="--x: {domain.x}%; --y: {domain.y}%">
					<button
						type="button"
						class="node"
						class:node--lead={domain.scale === 'lead'}
						aria-pressed={activeId === domain.id}
						onclick={() => (activeId = domain.id)}
						onpointerenter={() => (activeId = domain.id)}
						onfocus={() => (activeId = domain.id)}
					>
						<span class="node__dot" aria-hidden="true"></span>
						<span class="node__label">
							{i18n.t.organization.domains[domain.id].name}
							{#if domain.count}<span class="node__count">{domain.count}</span>{/if}
						</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Live region: the detail panel is what changes as the network is explored. -->
	<div class="detail" aria-live="polite">
		<div class="detail__head">
			<h3 class="detail__name">{activeCopy.name}</h3>
			{#if active.count}
				<p class="detail__count">{active.count} {i18n.t.common.people}</p>
			{/if}
		</div>

		<p class="detail__body">{activeCopy.description}</p>

		{#if activeRoles.length > 0}
			<ul class="roles">
				{#each activeRoles as [key, value] (key)}
					<li>{value}</li>
				{/each}
			</ul>
		{/if}

		<p class="detail__hint">{i18n.t.organization.hint}</p>
	</div>
</div>

<style>
	.network {
		display: grid;
		grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
		gap: clamp(1.5rem, 4vw, 3.5rem);
		align-items: stretch;
	}

	/* ----------------------------------------------------------------- field */

	.field {
		position: relative;
		min-height: clamp(22rem, 34vw, 30rem);
	}

	.field__edges {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.field__pool {
		fill: rgb(244 244 242 / 0.012);
		stroke: var(--edge-faint);
		stroke-width: 1;
		stroke-dasharray: 3 6;
	}

	.field__pool-label {
		position: absolute;
		top: 0;
		left: 1.75rem;

		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding-inline: 0.5rem;
		transform: translateY(-0.35rem);

		background: var(--surface-base);
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.field__pool-count {
		color: var(--signal-warm);
	}

	.edge {
		stroke: var(--edge-faint);
		stroke-width: 1;
		transition:
			stroke var(--duration-base) var(--ease-out),
			stroke-width var(--duration-base) var(--ease-out);
	}

	.edge--strong {
		stroke: var(--edge);
	}

	.edge--live {
		stroke: var(--edge-navy);
		stroke-width: 1.5;
	}

	/* ----------------------------------------------------------------- nodes */

	.nodes li {
		position: absolute;
		left: var(--x);
		top: var(--y);
		transform: translate(-50%, -50%);
	}

	.node {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.45rem 0.7rem;

		border: 1px solid transparent;
		border-radius: var(--radius-m);
		background: var(--surface-base);

		transition:
			border-color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out);
	}

	.node:hover,
	.node[aria-pressed='true'] {
		border-color: var(--edge);
		background: var(--surface-panel);
	}

	.node__dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--text-faint);
		transition:
			background-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-base) var(--ease-out);
	}

	.node--lead .node__dot {
		width: 9px;
		height: 9px;
	}

	.node[aria-pressed='true'] .node__dot {
		background: var(--signal);
		box-shadow: 0 0 0 4px var(--signal-dim);
	}

	.node__label {
		display: flex;
		align-items: baseline;
		gap: 0.4rem;

		font-size: var(--type-small);
		letter-spacing: -0.005em;
		white-space: nowrap;
		color: var(--text-muted);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.node--lead .node__label {
		font-weight: 500;
	}

	.node:hover .node__label,
	.node[aria-pressed='true'] .node__label {
		color: var(--text-primary);
	}

	.node__count {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-faint);
	}

	/* ---------------------------------------------------------------- detail */

	.detail {
		display: flex;
		flex-direction: column;
		padding: clamp(1.25rem, 2.5vw, 2rem);

		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(35 64 95 / 0.08), transparent 60%);
	}

	.detail__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;

		padding-bottom: var(--space-s);
		border-bottom: 1px solid var(--edge-faint);
	}

	.detail__name {
		font-size: var(--type-h3);
		font-weight: 550;
		letter-spacing: -0.02em;
	}

	.detail__count {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.08em;
		color: var(--signal);
		white-space: nowrap;
	}

	.detail__body {
		margin-top: var(--space-m);
		font-size: var(--type-small);
		line-height: 1.65;
		color: var(--text-secondary);
	}

	.roles {
		display: grid;
		gap: 0.55rem;
		margin-top: var(--space-m);
	}

	.roles li {
		padding-left: 0.9rem;
		border-left: 1px solid var(--edge-navy);

		font-size: var(--type-small);
		line-height: 1.45;
		color: var(--text-muted);
	}

	.detail__hint {
		margin-top: auto;
		padding-top: var(--space-m);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-faint);
	}

	/* ----------------------------------------------------------- responsive */

	@media (max-width: 1024px) {
		.network {
			grid-template-columns: minmax(0, 1fr);
		}

		.field {
			min-height: 26rem;
		}
	}

	/*
	 * On a phone the plotted field would collide with itself, so the same nodes
	 * become a compact keypad. The pool boundary stays: it is the point.
	 */
	@media (max-width: 720px) {
		.field {
			min-height: 0;
			padding: 2rem 1rem 1.25rem;
			border: 1px dashed var(--edge-faint);
			border-radius: var(--radius-m);
		}

		.field__edges {
			display: none;
		}

		.field__pool-label {
			top: -0.6rem;
			left: 1rem;
		}

		.nodes {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.5rem;
		}

		.nodes li {
			position: static;
			transform: none;
		}

		.node {
			width: 100%;
			border-color: var(--edge-faint);
		}

		.node__label {
			white-space: normal;
			text-align: left;
		}
	}
</style>
