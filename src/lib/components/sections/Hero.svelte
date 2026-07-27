<section class="hero">
	<div class="hero__grid">
		<p class="eyebrow">RO6ONE · FRC TEAM</p>

		<h1>
			Build what
			<span>comes next.</span>
		</h1>

		<p class="description">
			We design, build and compete — but the work continues beyond a single season.
		</p>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		padding: 3rem 6vw;
		background: #111;
		color: #f5f5f5;
	}

	.hero__grid {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		align-content: center;
		min-height: calc(100vh - 6rem);
		column-gap: 1.25rem;
	}

	.eyebrow {
		grid-column: 1 / 6;
		margin: 0 0 2rem;
		font-size: 0.75rem;
		letter-spacing: 0.18em;
		opacity: 0.6;
	}

	h1 {
		grid-column: 1 / 10;
		max-width: 10ch;
		margin: 0;
		font-size: clamp(4rem, 10vw, 9rem);
		font-weight: 500;
		line-height: 0.9;
		letter-spacing: -0.06em;
	}

	h1 span {
		display: block;
		margin-left: 0.7em;
	}

	.description {
		grid-column: 8 / 13;
		margin: 4rem 0 0;
		font-size: clamp(1rem, 1.5vw, 1.25rem);
		line-height: 1.6;
		opacity: 0.7;
	}
</style>