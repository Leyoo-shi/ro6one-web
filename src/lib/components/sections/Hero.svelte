<script lang="ts">
	import HeroLightCanvas from '$lib/components/ui/HeroLightCanvas.svelte';
</script>

<section class="hero">
	<HeroLightCanvas />

	<div class="hero__reveal" aria-hidden="true"></div>

	<div class="hero__grid">
		<div class="hero__eyebrow-mask">
            <p class="eyebrow">RO6ONE · FRC TEAM #11919</p>
        </div>

        <h1 class="hero__title">
            <span class="hero__title-mask">
                <span class="hero__title-line">Build what</span>
            </span>

            <span class="hero__title-mask hero__title-mask--offset">
                <span class="hero__title-line">comes next.</span>
            </span>
        </h1>

        <div class="hero__description-mask">
            <p class="description">
                We design, build and compete — but the work continues beyond a single season.
            </p>
        </div>

        <div class="hero__meta">
            <div class="hero__meta-item">
                <span class="hero__meta-label">Season</span>
                <span class="hero__meta-value">2026</span>
            </div>

            <div class="hero__meta-item">
                <span class="hero__meta-label">Project</span>
                <span class="hero__meta-value">Atlas</span>
            </div>

            <div class="hero__meta-item">
                <span class="hero__meta-label">Based in</span>
                <span class="hero__meta-value">Trabzon, Türkiye</span>
            </div>
        </div>

        <a class="hero__scroll" href="#about" aria-label="Scroll to explore">
            <span>Scroll to explore</span>
            <span class="hero__scroll-line" aria-hidden="true"></span>
        </a>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		isolation: isolate;

		min-height: 100svh;
		padding: clamp(2rem, 4vw, 4rem) 6vw;

		background: #111;
		color: #f4f4f2;
	}

	.hero__grid {
		position: relative;
		z-index: 1;

		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-rows: auto auto;
		align-content: clamp(3.5rem, 6vh, 5rem);

		min-height: calc(100svh - clamp(4rem, 8vw, 8rem));
		column-gap: clamp(1rem, 1.5vw, 1.75rem);
	}

	.eyebrow {
		margin: 0 0 clamp(1.4rem, 2.3vw, 2.25rem);

		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			sans-serif;

		font-size: clamp(0.62rem, 0.65vw, 0.75rem);
		font-weight: 600;
		line-height: 1;
		letter-spacing: 0.22em;
		text-transform: uppercase;

		color: rgba(244, 244, 242, 0.5);
	}

	.hero__title {
		grid-column: 1 / 10;
		grid-row: 2;

		max-width: 9.5ch;
		margin: 0;

		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			sans-serif;

		font-size: clamp(4.25rem, 9.2vw, 9rem);
		font-weight: 620;
		line-height: 0.86;
		letter-spacing: -0.075em;

		text-wrap: balance;
	}

	.hero__title-line {
		display: block;
	}

	.description {
		max-width: 31rem;
		margin: 0;
        padding-top: clamp(0.5rem, 2.2vw, 2.2rem);

		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			sans-serif;

		font-size: clamp(0.95rem, 1.1vw, 1.15rem);
		font-weight: 400;
		line-height: 1.55;
		letter-spacing: -0.015em;

		color: rgba(244, 244, 242, 0.64);
	}

    .hero__meta {
        position: absolute;
        right: 0;
        bottom: 0;

        display: grid;
        grid-template-columns: repeat(3, auto);
        gap: clamp(1.5rem, 3vw, 3.5rem);

        opacity: 0;
        transform: translateY(0.8rem);

        animation:
            hero-description-enter 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            0.86s forwards;
    }

    .hero__meta-item {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .hero__meta-label {
        font-size: 0.62rem;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;

        color: rgba(244, 244, 242, 0.38);
    }

    .hero__meta-value {
        font-size: 0.82rem;
        font-weight: 500;
        line-height: 1.2;
        letter-spacing: -0.01em;

        color: rgba(244, 244, 242, 0.75);
    }

    .hero__reveal {
	position: absolute;
	inset: 0;
	z-index: 2;

	pointer-events: none;
	background: #111318;

	transform-origin: top;
	animation: reveal-surface 1.15s cubic-bezier(0.76, 0, 0.24, 1) forwards;
    }

    .hero__eyebrow-mask,
    .hero__title-mask,
    .hero__description-mask {
        overflow: hidden;
    }

    .hero__eyebrow-mask {
        grid-column: 1 / 7;
        grid-row: 1;
    }

    .hero__title-mask {
        display: block;
    }

    .hero__title-mask--offset {
        margin-left: 0.38em;
    }

    .hero__description-mask {
        grid-column: 8 / 13;
        grid-row: 2;
        align-self: center;
        padding-top: clamp(4rem, 8vw, 8rem);
    }

    .eyebrow {
        opacity: 0;
        transform: translateY(120%);

        animation:
            hero-copy-enter 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            0.38s forwards;
    }

    .hero__title-line {
        display: block;

        opacity: 0;
        transform: translateY(112%);

        animation:
            hero-title-enter 0.88s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
    }

    .hero__title-mask:first-child .hero__title-line {
        animation-delay: 0.44s;
    }

    .hero__title-mask:nth-child(2) .hero__title-line {
        animation-delay: 0.54s;
    }

    .description {
        opacity: 0;
        transform: translateY(1rem);

        animation:
            hero-description-enter 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            0.72s forwards;
    }

    .hero__scroll {
        position: absolute;
        left: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        gap: 1rem;

        font-size: 0.63rem;
        font-weight: 600;
        line-height: 1;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        text-decoration: none;

        color: rgba(244, 244, 242, 0.45);

        opacity: 0;
        transform: translateY(0.8rem);

        animation:
            hero-description-enter 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            0.94s forwards;

        transition: color 180ms ease;
    }

    .hero__scroll:hover {
        color: rgba(244, 244, 242, 0.8);
    }

    .hero__scroll-line {
        width: 3.5rem;
        height: 1px;

        background: rgba(244, 244, 242, 0.3);
        transform-origin: left;

        animation: scroll-line-pulse 2.4s ease-in-out 1.2s infinite;
    }

    @keyframes scroll-line-pulse {
        0%,
        100% {
            transform: scaleX(0.45);
            opacity: 0.35;
        }

        50% {
            transform: scaleX(1);
            opacity: 0.8;
        }
    }

    @keyframes reveal-surface {
        0% {
            opacity: 1;
            transform: scaleY(1);
        }

        55% {
            opacity: 1;
        }

        100% {
            opacity: 0;
            transform: scaleY(0);
            visibility: hidden;
        }
    }

    @keyframes hero-title-enter {
        from {
            opacity: 0;
            transform: translateY(112%);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes hero-copy-enter {
        from {
            opacity: 0;
            transform: translateY(120%);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes hero-description-enter {
        from {
            opacity: 0;
            transform: translateY(1rem);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

	@media (max-width: 900px) {
		.hero {
			padding: 2rem 1.5rem;
		}

		.hero__grid {
			display: flex;
			flex-direction: column;
			justify-content: center;

			min-height: calc(100svh - 4rem);
		}

		.eyebrow {
			margin-bottom: 1.5rem;
		}

		.hero__title {
			max-width: none;
			font-size: clamp(3.75rem, 14vw, 7rem);
		}

		.description {
			max-width: 34rem;
			margin-top: 2.5rem;
		}

        .hero__meta {
            position: static;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.5rem;

            width: 100%;
            margin-top: 3rem;
        }

        .hero__meta-item:last-child {
            grid-column: 1 / -1;
        }

        .hero__scroll {
            left: 1.5rem;
            bottom: 1.5rem;
        }
	}

	@media (max-width: 520px) {
		.hero__title {
			font-size: clamp(3.3rem, 16vw, 5.5rem);
			line-height: 0.9;
			letter-spacing: -0.065em;
		}

		.description {
			max-width: 27rem;
			margin-top: 2rem;
			font-size: 0.95rem;
		}

        .hero__meta {
            display: none;
        }

        .hero__scroll-line {
            width: 2.5rem;
        }
	}

    @media (prefers-reduced-motion: reduce) {
        .hero__reveal {
            display: none;
        }

        .eyebrow,
        .hero__title-line,
        .description {
            opacity: 1;
            transform: none;
            animation: none;
        }

        .hero__meta,
        .hero__scroll {
            opacity: 1;
            transform: none;
            animation: none;
        }

        .hero__scroll-line {
            animation: none;
        }
    }
</style>