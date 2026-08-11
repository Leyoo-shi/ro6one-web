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

	/*
	 * The form is honest about what it does: it composes a draft in the
	 * visitor's own mail client. There is no backend, so it never claims a
	 * message was sent — and it stays disabled until a real address exists.
	 */
	const canSend = $derived(Boolean(site.contact.email));

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!canSend) return;

		const body = [message, '', `— ${name}${email ? ` <${email}>` : ''}`].join('\n');
		const query = new URLSearchParams({
			subject: subject || `${site.name} — ${copy.form.title}`,
			body
		});

		window.location.href = `mailto:${site.contact.email}?${query.toString()}`;
	}
</script>

<Seo title={i18n.t.seo.contact.title} description={i18n.t.seo.contact.description} />

<PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

<Section index="01" rule={false}>
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

			<dl class="channels" use:reveal>
				<div class="channel">
					<dt class="label">{copy.channels.emailLabel}</dt>
					<dd>
						{#if site.contact.email}
							<a class="channel__link" href="mailto:{site.contact.email}">{site.contact.email}</a>
						{:else}
							<span class="channel__pending">{copy.channels.emailPending}</span>
						{/if}
					</dd>
				</div>

				<div class="channel">
					<dt class="label">{copy.channels.locationLabel}</dt>
					<dd>{site.location}</dd>
				</div>

				<div class="channel">
					<dt class="label">{copy.channels.socialLabel}</dt>
					<dd>
						{#if site.social.length > 0}
							<ul class="channel__social">
								{#each site.social as link (link.href)}
									<li>
										<a class="channel__link" href={link.href} target="_blank" rel="me noopener">
											{link.label}
										</a>
									</li>
								{/each}
							</ul>
						{:else}
							<span class="channel__pending">{copy.channels.socialPending}</span>
						{/if}
					</dd>
				</div>
			</dl>
		</div>

		<form class="form" onsubmit={handleSubmit} use:reveal={{ delay: 80 }}>
			<h2 class="form__title">{copy.form.title}</h2>
			<p class="form__note" id="form-note">{copy.form.note}</p>

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

			<button
				class="form__submit"
				type="submit"
				disabled={!canSend}
				aria-describedby={canSend ? 'form-note' : 'form-unavailable'}
			>
				{copy.form.submit}
			</button>

			{#if !canSend}
				<p class="form__unavailable" id="form-unavailable">{copy.form.unavailable}</p>
			{/if}
		</form>
	</div>
</Section>

<style>
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

	.channels {
		display: grid;
		gap: var(--space-m);
		margin: var(--space-xl) 0 0;
	}

	.channel dd {
		margin: 0.5rem 0 0;
		font-size: var(--type-small);
		color: var(--text-secondary);
	}

	.channel__pending {
		color: var(--text-muted);
	}

	.channel__link {
		border-bottom: 1px solid var(--edge);
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	.channel__link:hover {
		border-color: var(--text-secondary);
	}

	.channel__social {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s) var(--space-m);
	}

	/* ------------------------------------------------------------------ form */

	.form {
		padding: clamp(1.5rem, 3vw, 2.5rem);
		border: 1px solid var(--edge-faint);
		border-radius: var(--radius-m);
		background: linear-gradient(180deg, rgb(244 244 242 / 0.02), transparent);
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

		transition:
			opacity var(--duration-fast) var(--ease-out),
			transform var(--duration-fast) var(--ease-out);
	}

	.form__submit:hover:not(:disabled) {
		transform: translateY(-1px);
	}

	.form__submit:disabled {
		cursor: not-allowed;
		color: var(--text-muted);
		background: rgb(244 244 242 / 0.08);
	}

	.form__unavailable {
		max-width: 46ch;
		margin-top: var(--space-s);
		font-size: var(--type-small);
		line-height: 1.55;
		color: var(--text-muted);
	}

	@media (max-width: 900px) {
		.contact {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
