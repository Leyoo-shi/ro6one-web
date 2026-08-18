<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { footerColumns } from '$lib/content/navigation';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';
	import LanguageSwitcher from '../ui/LanguageSwitcher.svelte';

	const i18n = useI18n();
	const year = new Date().getFullYear();
</script>

<!--
	The ending, as a scene.

	The hero hands the mark to the header on the first scroll; this is where it
	comes back — oversized, rising out of the bottom-right corner, in a claret
	room that the rest of the page has been circling. #11919 finally does
	something structural: it is the ground line the whole site stands on,
	drawn as an outline so it reads as architecture rather than a headline.

	Everything functional stays functional. Navigation, both addresses, the
	social links, the language switcher and the legal line are all still here,
	still real links, and none of them depend on the motion.
-->
<footer class="footer">
	<div class="footer__room">
		<span class="footer__glow" aria-hidden="true"></span>

		<img
			class="footer__mark-object"
			src={site.mark}
			alt=""
			width="128"
			height="128"
			aria-hidden="true"
		/>

		<div class="shell footer__inner">
			<p class="footer__closing" use:reveal>
				<span class="footer__closing-lead">{i18n.t.footer.closing}</span>
				<span class="footer__closing-turn">{i18n.t.footer.closingTurn}</span>
			</p>

			<div class="footer__grid">
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
								<path
									d="M6 11V1M2 5l4-4 4 4"
									fill="none"
									stroke="currentColor"
									stroke-width="1.1"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>

			<!-- The number as the ground line, not as a caption. -->
			<p class="footer__number" aria-hidden="true">{site.teamNumber}</p>

			<div class="footer__legal">
				<p>© {year} {site.legalName}. {i18n.t.footer.rights}</p>
				<p class="footer__trademark">{i18n.t.footer.first}</p>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		position: relative;
	}

	/* One line of institutional colour along the top edge of the footer. */
	.footer::before {
		content: '';
		display: block;
		height: 1px;

		background: linear-gradient(
			to right,
			transparent,
			var(--edge-burgundy) 30%,
			var(--edge-navy) 70%,
			transparent
		);
	}

	.footer__room {
		position: relative;
		overflow: hidden;
		background:
			radial-gradient(120% 90% at 82% 96%, rgb(141 36 64 / 0.5), transparent 62%),
			linear-gradient(180deg, var(--surface-void), var(--room-claret-deep) 65%, #0b0407);
	}

	/* A cold light from the opposite corner, so the room has two sources. */
	.footer__glow {
		position: absolute;
		top: -18%;
		left: -8%;
		width: 46%;
		aspect-ratio: 1;

		background: radial-gradient(circle, rgb(63 143 216 / 0.22), transparent 68%);
		filter: blur(24px);
		pointer-events: none;
	}

	/*
	 * The mark, returning. Cropped by the corner on purpose — it is arriving,
	 * not sitting on a shelf.
	 */
	.footer__mark-object {
		position: absolute;
		right: -6%;
		bottom: -16%;
		width: clamp(16rem, 34vw, 32rem);
		height: auto;

		opacity: 0.16;
		transform: rotate(-8deg);
		pointer-events: none;
		user-select: none;
	}

	.footer__inner {
		position: relative;
		padding-block: var(--space-3xl) var(--space-l);
	}

	/* ------------------------------------------------------------- closing */

	.footer__closing {
		max-width: 22ch;
		margin-bottom: var(--space-3xl);
		font-size: var(--type-h1);
		font-weight: 600;
		line-height: 0.98;
		letter-spacing: var(--tracking-display);
	}

	.footer__closing-lead,
	.footer__closing-turn {
		display: block;
	}

	.footer__closing-turn {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 400;
		letter-spacing: -0.02em;

		background: linear-gradient(96deg, var(--claret-bright), var(--blue-bright) 88%);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	/* ---------------------------------------------------------------- grid */

	.footer__grid {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.6fr) minmax(0, 1fr);
		gap: var(--space-xl) var(--space-l);
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
		border-color: var(--claret-bright);
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
		/* Wrapped to "Back to / top" with the arrow orphaned at 1440. */
		white-space: nowrap;

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

	/* -------------------------------------------------------------- number */

	.footer__number {
		margin: var(--space-2xl) 0 var(--space-m);

		font-size: clamp(4rem, 15vw, 14rem);
		font-weight: 700;
		line-height: 0.72;
		letter-spacing: var(--tracking-mega);
		font-variant-numeric: tabular-nums;
		text-align: center;

		/* Outlined, so it behaves like structure instead of shouting. */
		color: transparent;
		-webkit-text-stroke: 1px rgb(244 244 242 / 0.3);
	}

	.footer__legal {
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
		.footer__grid {
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
		.footer__grid,
		.footer__contact {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-l);
		}

		.footer__closing {
			font-size: var(--type-h2);
			margin-bottom: var(--space-2xl);
		}

		.footer__mark-object {
			right: -22%;
			bottom: -8%;
			width: 22rem;
			opacity: 0.12;
		}

		.footer__number {
			margin-top: var(--space-2xl);
		}

		.footer__legal {
			flex-direction: column;
		}

		.footer__trademark {
			text-align: left;
		}
	}
</style>
