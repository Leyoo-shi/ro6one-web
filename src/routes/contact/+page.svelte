<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import PageHeader from '$lib/components/layout/PageHeader.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { site } from '$lib/content/site';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();
	const copy = $derived(i18n.t.contact);

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let topic = $state<'general' | 'sponsorship'>('general');

	const recipient = $derived(
		topic === 'sponsorship' ? site.contact.sponsorship : site.contact.general
	);

	const mailChannels = $derived([
		{
			id: 'general',
			address: site.contact.general,
			label: copy.channels.generalLabel,
			note: copy.channels.generalNote
		},
		{
			id: 'sponsorship',
			address: site.contact.sponsorship,
			label: copy.channels.sponsorshipLabel,
			note: copy.channels.sponsorshipNote
		}
	]);

	/*
	 * No backend, and the page says so. Submitting composes a draft in the
	 * visitor's own mail client, addressed to whichever channel they picked —
	 * nothing is transmitted from here and nothing is stored.
	 */
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const body = [message, '', `— ${name}${email ? ` <${email}>` : ''}`].join('\n');
		const query = new URLSearchParams({
			subject: subject || `${site.name} — ${copy.form.title}`,
			body
		});

		window.location.href = `mailto:${recipient}?${query.toString()}`;
	}

	let copiedAddress = $state('');
	let copyTimer: ReturnType<typeof setTimeout> | undefined;

	async function copyAddress(address: string) {
		try {
			await navigator.clipboard.writeText(address);
			copiedAddress = address;

			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copiedAddress = ''), 2000);
		} catch {
			/* Clipboard blocked: the address is visible and selectable anyway. */
		}
	}
</script>

<Seo title={i18n.t.seo.contact.title} description={i18n.t.seo.contact.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} tone="claret" />

<Section index="01" rule={false} tone="claret">
	<!-- Addresses are written out, readable and copyable — not hidden behind icons. -->
	<div class="channels">
		{#each mailChannels as channel (channel.id)}
			<article class="channel" use:reveal>
				<p class="label">{channel.label}</p>
				<a class="channel__address" href="mailto:{channel.address}">{channel.address}</a>
				<p class="channel__note">{channel.note}</p>

				<button type="button" class="channel__copy" onclick={() => copyAddress(channel.address)}>
					{copiedAddress === channel.address ? copy.channels.copied : copy.channels.copy}
				</button>
			</article>
		{/each}

		<article class="channel channel--social" use:reveal={{ delay: 80 }}>
			<p class="label">{copy.channels.socialLabel}</p>

			<ul>
				{#each site.social as link (link.id)}
					<li>
						<a href={link.href} target="_blank" rel="me noopener">
							<span class="channel__platform">{link.label}</span>
							<span class="channel__handle">{link.handle}</span>
						</a>
					</li>
				{/each}
			</ul>

			<dl class="channel__place">
				<dt class="label">{copy.channels.locationLabel}</dt>
				<dd>{site.location}</dd>
			</dl>
		</article>
	</div>
</Section>

<Section index="02" tone="steel">
	<div class="contact">
		<div class="contact__left">
			<h2 class="contact__title" use:reveal>{copy.reasons.title}</h2>

			<ul class="reasons">
				{#each copy.reasons.items as item, index (item.name)}
					<li class="reason" use:reveal={{ delay: index * 50 }}>
						<h3 class="reason__name">{item.name}</h3>
						<p class="reason__text">{item.description}</p>
					</li>
				{/each}
			</ul>
		</div>

		<form class="form" onsubmit={handleSubmit} use:reveal={{ delay: 80 }}>
			<h2 class="form__title">{copy.form.title}</h2>
			<p class="form__note" id="form-note">{copy.form.note}</p>

			<fieldset class="topic">
				<legend class="label">{copy.form.topicLabel}</legend>

				<div class="topic__options">
					<label class="topic__option">
						<input type="radio" name="topic" value="general" bind:group={topic} />
						<span>{copy.channels.generalLabel}</span>
					</label>
					<label class="topic__option">
						<input type="radio" name="topic" value="sponsorship" bind:group={topic} />
						<span>{copy.channels.sponsorshipLabel}</span>
					</label>
				</div>

				<p class="topic__target">{recipient}</p>
			</fieldset>

			<div class="field">
				<label for="field-name">{copy.form.name}</label>
				<input id="field-name" type="text" name="name" autocomplete="name" bind:value={name} />
			</div>

			<div class="field">
				<label for="field-email">{copy.form.email}</label>
				<input id="field-email" type="email" name="email" autocomplete="email" bind:value={email} />
			</div>

			<div class="field">
				<label for="field-subject">
					{copy.form.subject}
					<span class="field__hint">{copy.form.optional}</span>
				</label>
				<input id="field-subject" type="text" name="subject" bind:value={subject} />
			</div>

			<div class="field">
				<label for="field-message">{copy.form.message}</label>
				<textarea id="field-message" name="message" rows="6" bind:value={message}></textarea>
			</div>

			<button class="form__submit" type="submit" aria-describedby="form-note">
				{copy.form.submit}
			</button>
		</form>
	</div>
</Section>

<style>
	/* -------------------------------------------------------------- channels */

	.channels {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(1rem, 2.5vw, 2rem);
	}

	.channel {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;

		padding: clamp(1.25rem, 2.5vw, 1.85rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(244 244 242 / 0.02), transparent 70%);
	}

	.channel__address {
		align-self: flex-start;

		font-size: var(--type-body-lg);
		letter-spacing: -0.015em;
		color: var(--text-primary);
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.channel__address:hover {
		border-color: var(--signal);
	}

	.channel__note {
		font-size: var(--type-small);
		line-height: 1.55;
		color: var(--text-muted);
	}

	.channel__copy {
		align-self: flex-start;
		margin-top: auto;
		padding-top: var(--space-s);

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-faint);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.channel__copy:hover {
		color: var(--text-secondary);
	}

	.channel--social ul {
		display: grid;
		gap: 0.5rem;
	}

	.channel--social a {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;

		padding-block: 0.35rem;
		border-bottom: 1px solid var(--edge-faint);
		color: var(--text-secondary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.channel--social a:hover {
		color: var(--text-primary);
	}

	.channel__platform {
		font-size: var(--type-small);
		font-weight: 500;
	}

	.channel__handle {
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		color: var(--text-muted);
	}

	.channel__place {
		margin: auto 0 0;
		padding-top: var(--space-s);
	}

	.channel__place dd {
		margin: 0.35rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	/* --------------------------------------------------------------- reasons */

	.contact {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: var(--space-2xl) clamp(2rem, 7vw, 7rem);
		align-items: start;
	}

	.contact__title {
		margin-bottom: var(--space-l);
		font-size: var(--type-h2);
		font-weight: 550;
	}

	.reason {
		padding-block: var(--space-m);
		border-top: 1px solid var(--edge-faint);
	}

	.reason:last-child {
		border-bottom: 1px solid var(--edge-faint);
	}

	.reason__name {
		font-size: var(--type-body);
		font-weight: 500;
		letter-spacing: -0.015em;
	}

	.reason__text {
		max-width: 46ch;
		margin-top: 0.35rem;
		font-size: var(--type-small);
		color: var(--text-muted);
	}

	/* ------------------------------------------------------------------ form */

	.form {
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(35 64 95 / 0.08), transparent 60%);
	}

	.form__title {
		font-size: var(--type-h3);
		font-weight: 550;
	}

	.form__note {
		max-width: 46ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.55;
		color: var(--text-muted);
	}

	.topic {
		margin: var(--space-l) 0 0;
		padding: 0;
		border: 0;
	}

	.topic legend {
		padding: 0;
	}

	.topic__options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.6rem;
	}

	.topic__option {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		padding: 0.5rem 0.85rem;
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-s);

		font-size: var(--type-small);
		color: var(--text-secondary);
		cursor: pointer;
		transition:
			border-color var(--duration-fast) var(--ease-out),
			color var(--duration-fast) var(--ease-out);
	}

	.topic__option:hover {
		border-color: var(--edge);
		color: var(--text-primary);
	}

	.topic__option:has(input:checked) {
		border-color: var(--signal-dim);
		background: rgb(159 188 208 / 0.06);
		color: var(--text-primary);
	}

	.topic__option input {
		accent-color: var(--signal);
	}

	.topic__target {
		margin-top: 0.65rem;
		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: 0.04em;
		color: var(--text-muted);
	}

	.field {
		display: grid;
		gap: 0.5rem;
		margin-top: var(--space-m);
	}

	.field label {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;

		font-family: var(--font-mono);
		font-size: var(--type-micro);
		letter-spacing: var(--tracking-label);
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.field__hint {
		letter-spacing: 0.06em;
		text-transform: none;
		color: var(--text-faint);
	}

	.field input,
	.field textarea {
		width: 100%;
		padding: 0.7rem 0.85rem;

		font: inherit;
		font-size: var(--type-small);
		color: var(--text-primary);

		background: rgb(8 9 11 / 0.6);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-s);

		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.field textarea {
		resize: vertical;
		min-height: 8rem;
		line-height: 1.55;
	}

	.field input:hover,
	.field textarea:hover,
	.field input:focus-visible,
	.field textarea:focus-visible {
		border-color: var(--edge-strong);
	}

	.form__submit {
		margin-top: var(--space-l);
		padding: 0.75rem 1.35rem;

		font-size: var(--type-small);
		font-weight: 500;
		color: var(--surface-void);

		background: var(--text-primary);
		border-radius: var(--radius-s);

		transition: transform var(--duration-fast) var(--ease-out);
	}

	.form__submit:hover {
		transform: translateY(-1px);
	}

	@media (max-width: 1024px) {
		.channels {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.channel--social {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 760px) {
		.channels,
		.contact {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
