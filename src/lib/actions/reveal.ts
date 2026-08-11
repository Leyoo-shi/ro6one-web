import type { Action } from 'svelte/action';

type RevealOptions = {
	/** Extra delay in ms, for staggering siblings. */
	delay?: number;
	/** Fraction of the element that must be visible. */
	threshold?: number;
	/** Bottom inset so elements reveal slightly before the viewport edge. */
	rootMargin?: string;
};

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Two rules keep this from getting in the reader's way:
 *
 *  - Anything already on screen when the action runs is marked visible
 *    immediately. The server renders real HTML, so hiding it at hydration
 *    would make text the visitor is already reading fade out and back in.
 *  - The hidden state is applied with transitions suppressed, so entering the
 *    pending state is never itself animated.
 *
 * Without JavaScript the attribute is never set and everything renders
 * visible: the reveal is an enhancement, never a gate on the content.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { delay = 0, threshold = 0.12, rootMargin = '0px 0px -10% 0px' } = options ?? {};

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const rect = node.getBoundingClientRect();
	const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0;

	if (prefersReducedMotion || alreadyOnScreen || typeof IntersectionObserver === 'undefined') {
		node.dataset.reveal = 'visible';
		return;
	}

	node.style.transition = 'none';
	node.dataset.reveal = 'pending';
	void node.offsetHeight;
	node.style.transition = '';

	if (delay) {
		node.style.setProperty('--reveal-delay', `${delay}ms`);
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;

				node.dataset.reveal = 'visible';
				observer.disconnect();
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
