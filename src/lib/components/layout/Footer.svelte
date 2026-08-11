<script lang="ts">
	import { footerColumns } from '$lib/content/navigation';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';
	import LanguageSwitcher from '../ui/LanguageSwitcher.svelte';

	const i18n = useI18n();
	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="shell footer__inner">
		<div class="footer__brand">
			<p class="footer__mark">{site.name}</p>
			<p class="footer__legalname">{site.legalName}</p>

			<dl class="footer__identity">
				<div>
					<dt class="label">{i18n.t.footer.identity}</dt>
					<dd>{site.teamLabel}</dd>
				</div>
				<div>
					<dt class="label">{i18n.t.footer.homeLabel}</dt>
					<dd>{site.school}</dd>
				</div>
				<div>
					<dt class="label">{i18n.t.contact.channels.locationLabel}</dt>
					<dd>{site.location}</dd>
				</div>
			</dl>
		</div>

		<nav class="footer__nav" aria-label={i18n.t.common.footerNavLabel}>
			{#each footerColumns as column (column.titleKey)}
				<div class="footer__column">
					<p class="label">{i18n.t.footer[column.titleKey]}</p>
					<ul>
						{#each column.items as item (item.href)}
							<li><a href={item.href}>{i18n.t.nav[item.key]}</a></li>
						{/each}
					</ul>
				</div>
			{/each}

			<div class="footer__column">
				<p class="label">{i18n.t.contact.channels.socialLabel}</p>
				<ul>
					{#each site.social as link (link.id)}
						<li>
							<a href={link.href} rel="me noopener" target="_blank">{link.label}</a>
						</li>
					{/each}
				</ul>
			</div>
		</nav>

		<div class="footer__contact">
			<div class="footer__mail">
				<p class="label">{i18n.t.contact.channels.generalLabel}</p>
				<a href="mailto:{site.contact.general}">{site.contact.general}</a>
			</div>

			<div class="footer__mail">
				<p class="label">{i18n.t.contact.channels.sponsorshipLabel}</p>
				<a href="mailto:{site.contact.sponsorship}">{site.contact.sponsorship}</a>
			</div>

			<div class="footer__controls">
				<div>
					<p class="label">{i18n.t.common.languageLabel}</p>
					<LanguageSwitcher variant="stacked" />
				</div>

				<a class="footer__top" href="#top">
					{i18n.t.common.backToTop}
					<svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
						<path d="M6 11V1M2 5l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.1" />
					</svg>
				</a>
			</div>
		</div>

		<div class="footer__legal">
			<p>© {year} {site.legalName}. {i18n.t.footer.rights}</p>
			<p class="footer__trademark">{i18n.t.footer.first}</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--edge-faint);
		background: var(--surface-void);
	}

	/* One line of institutional colour along the top edge of the footer. */
	.footer::before {
		content: '';
		display: block;
		height: 1px;
		margin-bottom: -1px;

		background: linear-gradient(
			to right,
			transparent,
			var(--edge-burgundy) 30%,
			var(--edge-navy) 70%,
			transparent
		);
	}

	.footer__inner {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.6fr) minmax(0, 1fr);
		gap: var(--space-xl) var(--space-l);
		padding-block: var(--space-2xl) var(--space-l);
	}

	.footer__mark {
		font-size: clamp(1.5rem, 2.4vw, 2rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.footer__legalname {
		margin-top: 0.5rem;
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	.footer__identity {
		display: grid;
		gap: var(--space-s);
		margin: var(--space-l) 0 0;
	}

	.footer__identity dd {
		margin: 0.35rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.footer__nav {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-l) var(--space-xl);
	}

	.footer__column ul {
		display: grid;
		gap: 0.6rem;
		margin-top: var(--space-s);
	}

	.footer__column a {
		font-size: var(--type-small);
		color: var(--text-secondary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.footer__column a:hover {
		color: var(--text-primary);
	}

	.footer__contact {
		display: grid;
		gap: var(--space-m);
		align-content: start;
	}

	.footer__mail a {
		display: inline-block;
		margin-top: 0.35rem;

		font-size: var(--type-small);
		color: var(--text-secondary);
		border-bottom: 1px solid var(--edge-faint);
		transition:
			color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out);
	}

	.footer__mail a:hover {
		color: var(--text-primary);
		border-color: var(--edge-strong);
	}

	.footer__controls {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-m);
		margin-top: var(--space-m);
	}

	.footer__controls :global(.switcher) {
		margin-top: var(--space-s);
	}

	.footer__top {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;

		font-size: var(--type-small);
		color: var(--text-muted);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.footer__top:hover {
		color: var(--text-primary);
	}

	.footer__top svg {
		transition: transform var(--duration-base) var(--ease-out);
	}

	.footer__top:hover svg {
		transform: translateY(-2px);
	}

	.footer__legal {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-s) var(--space-l);

		padding-top: var(--space-m);
		border-top: 1px solid var(--edge-faint);

		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.footer__trademark {
		max-width: 52ch;
		text-align: right;
	}

	@media (max-width: 1024px) {
		.footer__inner {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.footer__contact {
			grid-column: 1 / -1;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.footer__controls {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 700px) {
		.footer__inner,
		.footer__contact {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-l);
		}

		.footer__legal {
			flex-direction: column;
		}

		.footer__trademark {
			text-align: left;
		}
	}
</style>
