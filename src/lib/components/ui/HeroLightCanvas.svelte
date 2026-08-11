<script lang="ts">
	import { onMount } from 'svelte';

	/*
	 * Hero yüzeyi.
	 *
	 * Tek parça, hafifçe içbükey bir metal panel simüle ediyoruz: ışık imleçle
	 * birlikte ağırlıklı biçimde kayıyor, yüzeyin eğrilirini ortaya çıkarıyor.
	 * Hesap düşük çözünürlükte yapılıp tarayıcıya büyütülüyor.
	 *
	 * Bu sürümde dört şey değişti:
	 *  - tampon boyutu artık konteynerin en/boy oranına göre hesaplanıyor,
	 *    böylece panel dikey ekranlarda sıkışmıyor,
	 *  - ışık durduğunda döngü tamamen duruyor (boşta CPU tüketimi yok),
	 *  - specular yatayda hafifçe uzatıldı: fırçalanmış alüminyum karakteri,
	 *  - koyu tonlardaki bantlaşmayı kırmak için düzenli (ordered) dither.
	 */

	let container!: HTMLDivElement;
	let canvas!: HTMLCanvasElement;

	onMount(() => {
		const context = canvas.getContext('2d', { alpha: false });

		if (!context) {
			console.error('Hero light canvas context could not be created.');
			return;
		}

		context.imageSmoothingEnabled = true;

		/* Piksel bütçesi: en/boy oranı değişse de hesap yükü sabit kalır. */
		const pixelBudget = 40_000;
		const minSide = 96;
		const maxSide = 460;

		/* ---------------------------------------------------------- yüzey formu
		 *
		 * concavityStrength: çukurun derinliği (fazlası kase gibi görünür).
		 * concavityRadius*: çukurun panele yayılması, panel birimlerinde.
		 * concavityCenterY: çukur merkezi geometrik merkezin biraz üstünde.
		 */
		const concavityStrength = 0.3;
		const concavityRadiusX = 1.12;
		const concavityRadiusY = 1.02;
		const concavityCenterX = 0;
		const concavityCenterY = 0.08;

		/* Sabit dolgu ışığı: imleç uzaktayken de panel kenarları ışık yakalar. */
		const fillX = -0.85;
		const fillY = 0.65;
		const fillZ = 1.4;

		/* 4×4 Bayer eşiği, -0.5..+0.5 aralığına normalize edildi. */
		const bayer = new Float32Array(
			[0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((value) => value / 16 - 0.469)
		);

		let renderWidth = 0;
		let renderHeight = 0;
		let aspect = 1;

		let imageData: ImageData | null = null;
		let pixels: Uint8ClampedArray | null = null;
		let surfaceNoise = new Float32Array(0);

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

		/*
		 * Dinlenme konumu: ışık hafifçe sol üstten geliyor. İmleç yoksa
		 * (dokunmatik cihaz, azaltılmış hareket) kompozisyon bu haliyle kalıyor.
		 */
		const restX = -0.17;
		const restY = 0.11;

		let targetX = restX;
		let targetY = restY;
		let lightX = restX;
		let lightY = restY;
		let velocityX = 0;
		let velocityY = 0;

		let animationFrame = 0;
		let running = false;
		let visible = true;
		let dirty = true;

		function clamp(value: number, min: number, max: number) {
			return Math.max(min, Math.min(max, value));
		}

		function buildBuffers() {
			const rect = container.getBoundingClientRect();

			if (rect.width === 0 || rect.height === 0) return;

			aspect = rect.width / rect.height;

			const height = clamp(Math.round(Math.sqrt(pixelBudget / aspect)), minSide, maxSide);
			const width = clamp(Math.round(height * aspect), minSide, maxSide);

			if (width === renderWidth && height === renderHeight) return;

			renderWidth = width;
			renderHeight = height;

			canvas.width = renderWidth;
			canvas.height = renderHeight;

			imageData = context!.createImageData(renderWidth, renderHeight);
			pixels = imageData.data;

			buildNoise();
			dirty = true;
		}

		/*
		 * Sabit pseudo-random doku. Her frame yeniden üretilmediği için yüzey
		 * titremiyor; yalnızca malzemenin mikro pürüzlülüğü gibi davranıyor.
		 */
		function buildNoise() {
			surfaceNoise = new Float32Array(renderWidth * renderHeight);

			for (let index = 0; index < surfaceNoise.length; index++) {
				const x = index % renderWidth;
				const y = Math.floor(index / renderWidth);

				const fineNoise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
				const broadNoise = Math.sin(x * 0.15) * Math.cos(y * 0.12);
				const randomPart = (fineNoise - Math.floor(fineNoise)) * 2 - 1;

				surfaceNoise[index] = randomPart * 0.65 + broadNoise * 0.35;
			}
		}

		function renderSurface() {
			if (!imageData || !pixels) return;

			/*
			 * Işık kaynağı kullanıcının önünde; X/Y hafifçe kayıyor, Z sabit.
			 * X ekseni panel genişliğine göre ölçeklenir, böylece geniş
			 * ekranlarda da imleç hareketi yüzeyde aynı oranda karşılık bulur.
			 */
			const sourceX = lightX * aspect;
			const sourceY = lightY;
			const sourceZ = 1.65;

			const invRadiusX = 1 / (concavityRadiusX * aspect);
			const invRadiusY = 1 / concavityRadiusY;

			for (let y = 0; y < renderHeight; y++) {
				const surfaceY = 1 - (y / (renderHeight - 1)) * 2;
				const bayerRow = (y & 3) * 4;

				for (let x = 0; x < renderWidth; x++) {
					const pixelIndex = y * renderWidth + x;
					const dataIndex = pixelIndex * 4;

					/* Panel birimleri: yarı yükseklik 1, yarı genişlik = aspect. */
					const surfaceX = ((x / (renderWidth - 1)) * 2 - 1) * aspect;

					const noise = surfaceNoise[pixelIndex];
					const secondNoise = surfaceNoise[(pixelIndex + 97) % surfaceNoise.length];

					/* Normalize edilmiş çukur koordinatları. */
					const dishX = (surfaceX - concavityCenterX * aspect) * invRadiusX;
					const dishY = (surfaceY - concavityCenterY) * invRadiusY;

					const dishRadius = Math.hypot(dishX, dishY);
					const normalizedRadius = clamp(dishRadius, 0, 1);

					/*
					 * Merkezden kenara yumuşak geçiş. Kenarda eğim sıfıra
					 * yaklaşır; yüzey ayrı bir çukur disk gibi görünmez.
					 */
					const falloff = 1 - normalizedRadius;
					const smoothFalloff = falloff * falloff * (3 - 2 * falloff);
					const macroSlope = concavityStrength * smoothFalloff * normalizedRadius;

					let macroNormalX = 0;
					let macroNormalY = 0;

					if (dishRadius > 0.0001) {
						/* Yükseklik alanının gradyanı; X yönü panel genişliğiyle yumuşar. */
						macroNormalX = (dishX / dishRadius) * macroSlope * invRadiusX * concavityRadiusX;
						macroNormalY = (dishY / dishRadius) * macroSlope * invRadiusY * concavityRadiusY;
					}

					let normalX = macroNormalX + noise * 0.012;
					let normalY = macroNormalY + secondNoise * 0.012;
					let normalZ = 1;

					const normalLength = Math.hypot(normalX, normalY, normalZ);

					normalX /= normalLength;
					normalY /= normalLength;
					normalZ /= normalLength;

					/* --------------------------------------------- ana ışık */
					let directionX = sourceX - surfaceX;
					let directionY = sourceY - surfaceY;
					let directionZ = sourceZ;

					const distance = Math.hypot(directionX, directionY, directionZ);

					directionX /= distance;
					directionY /= distance;
					directionZ /= distance;

					const diffuse = Math.max(
						0,
						normalX * directionX + normalY * directionY + normalZ * directionZ
					);

					/* Tam ters-kare çok sert görünüyordu; yumuşatılmış zayıflama. */
					const attenuation = 1 / (1 + distance * distance * 0.72);

					/*
					 * Half-vector ile specular. Normalin Y bileşeni kısılıyor:
					 * parlama yatayda uzuyor, fırçalanmış metal gibi davranıyor.
					 */
					let halfX = directionX;
					let halfY = directionY;
					let halfZ = directionZ + 1;

					const halfLength = Math.hypot(halfX, halfY, halfZ);

					halfX /= halfLength;
					halfY /= halfLength;
					halfZ /= halfLength;

					const anisotropic = Math.max(
						0,
						normalX * halfX + normalY * 0.55 * halfY + normalZ * halfZ
					);

					const specular = Math.pow(anisotropic, 11) * attenuation;

					/* -------------------------------------------- dolgu ışığı */
					let fillDirectionX = fillX * aspect - surfaceX;
					let fillDirectionY = fillY - surfaceY;

					const fillDistance = Math.hypot(fillDirectionX, fillDirectionY, fillZ);

					fillDirectionX /= fillDistance;
					fillDirectionY /= fillDistance;

					const fillDiffuse = Math.max(
						0,
						normalX * fillDirectionX + normalY * fillDirectionY + normalZ * (fillZ / fillDistance)
					);

					/*
					 * Kenarların hafif kararması bağımsız bir oval ışık değil;
					 * yüzeyin görüntüleme karakteri.
					 */
					const edgeDistance = Math.sqrt(
						(surfaceX / Math.max(aspect, 0.001)) * (surfaceX / Math.max(aspect, 0.001)) * 0.42 +
							surfaceY * surfaceY * 0.58
					);

					const vignette = clamp(1 - edgeDistance * 0.16, 0.8, 1);

					const materialVariation = noise * 0.9;
					const dither = bayer[bayerRow + (x & 3)] * 1.6;

					const diffuseLight = diffuse * attenuation * 58;
					const specularLight = specular * 34;
					const fillLight = fillDiffuse * 7.5;
					const material = materialVariation + dither;

					/*
					 * Kulüp renkleri yüzeye boya olarak değil, ışık olarak giriyor.
					 *
					 * Ana ışık sıcak: aydınlanan yerlerde grafit bordoya doğru birkaç
					 * birim kayıyor. Dolgu ışığı soğuk: gölgede kalan bölgeler laciverte
					 * çekiyor. Taban nötr; renk yalnızca yüzey ışığa döndükçe okunuyor.
					 *
					 * Ölçülen hedef: en parlak noktada r−b ≈ +4, kenar gölgesinde
					 * b−r ≈ +5. Bu aralığın üstü sepya, altı gri görünüyor.
					 */
					const red =
						14 + diffuseLight * 1.09 + specularLight * 1.14 + fillLight * 0.7 + material * 0.9;
					const green =
						14 + diffuseLight * 0.95 + specularLight * 0.95 + fillLight * 0.9 + material * 0.9;
					const blue =
						15 + diffuseLight * 0.82 + specularLight * 0.84 + fillLight * 1.4 + material * 0.9;

					pixels[dataIndex] = red * vignette;
					pixels[dataIndex + 1] = green * vignette;
					pixels[dataIndex + 2] = blue * vignette;
					pixels[dataIndex + 3] = 255;
				}
			}

			context!.putImageData(imageData, 0, 0);
		}

		/*
		 * Hareket karakteri: X biraz daha hızlı, Y daha ağır. Işık imlecin
		 * altına yapışmıyor, arkasından ağırlıkla geliyor.
		 */
		function step() {
			animationFrame = 0;

			const distanceX = targetX - lightX;
			const distanceY = targetY - lightY;
			const settled =
				Math.hypot(distanceX, distanceY) < 0.0005 && Math.hypot(velocityX, velocityY) < 0.0004;

			if (settled) {
				if (lightX !== targetX || lightY !== targetY) {
					lightX = targetX;
					lightY = targetY;
					dirty = true;
				}

				velocityX = 0;
				velocityY = 0;
			} else {
				velocityX = (velocityX + distanceX * 0.018) * 0.84;
				velocityY = (velocityY + distanceY * 0.014) * 0.82;

				lightX += velocityX;
				lightY += velocityY;
				dirty = true;
			}

			if (dirty) {
				renderSurface();
				dirty = false;
			}

			if (settled || !visible) {
				running = false;
				return;
			}

			animationFrame = requestAnimationFrame(step);
		}

		/* Işık durduğunda döngü kapanır; yeniden uyanmasını olaylar tetikler. */
		function wake() {
			if (!visible || document.hidden) return;
			if (running) return;

			/*
			 * Sekme arka plandayken yeniden boyutlandırma olduysa rAF hiç
			 * çalışmamış olabilir; uyanırken tamponu doğruluyoruz.
			 * Ölçüler değişmediyse bu çağrı bir şey yapmıyor.
			 */
			buildBuffers();

			running = true;
			animationFrame = requestAnimationFrame(step);
		}

		function stop() {
			running = false;

			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
				animationFrame = 0;
			}
		}

		function handlePointerMove(event: PointerEvent) {
			if (event.pointerType !== 'mouse') return;

			const rect = container.getBoundingClientRect();

			if (rect.width === 0 || rect.height === 0) return;

			const normalizedX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
			const normalizedY = clamp((event.clientY - rect.top) / rect.height, 0, 1);

			/*
			 * İmleç ekranın tamamında gezse de ışık yalnızca sınırlı miktarda
			 * kayıyor: dinlenme konumu etrafında ölçülü bir aralık.
			 */
			targetX = restX + (normalizedX * 2 - 1) * 0.34;
			targetY = restY + (1 - normalizedY * 2) * 0.22;

			wake();
		}

		const pointerTracking = finePointer.matches && !reducedMotion.matches;

		buildBuffers();
		renderSurface();
		dirty = false;

		/* Panel yeniden ölçeklendiğinde tamponu ve dokuyu yeniden kur. */
		let resizeFrame = 0;

		const resizeObserver = new ResizeObserver(() => {
			if (resizeFrame) return;

			resizeFrame = requestAnimationFrame(() => {
				resizeFrame = 0;
				buildBuffers();

				if (dirty) {
					renderSurface();
					dirty = false;
				}
			});
		});

		resizeObserver.observe(container);

		/* Hero ekranda değilken hesap yapmıyoruz. */
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				visible = entries[0]?.isIntersecting ?? true;

				if (visible) wake();
				else stop();
			},
			{ threshold: 0 }
		);

		intersectionObserver.observe(container);

		function handleVisibilityChange() {
			if (document.hidden) stop();
			else wake();
		}

		document.addEventListener('visibilitychange', handleVisibilityChange);

		if (pointerTracking) {
			window.addEventListener('pointermove', handlePointerMove, { passive: true });
		}

		return () => {
			stop();

			if (resizeFrame) cancelAnimationFrame(resizeFrame);

			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			document.removeEventListener('visibilitychange', handleVisibilityChange);

			if (pointerTracking) {
				window.removeEventListener('pointermove', handlePointerMove);
			}
		};
	});
</script>

<div bind:this={container} class="hero-light-canvas" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.hero-light-canvas {
		position: absolute;
		inset: 0;
		z-index: var(--z-canvas);

		overflow: hidden;
		pointer-events: none;
		background: var(--surface-base);
	}

	canvas {
		width: 100%;
		height: 100%;

		/*
		 * Düşük çözünürlüklü hesabı büyütürken piksel kenarlarını yumuşatıyoruz.
		 */
		filter: blur(0.7px);
		transform: scale(1.01);
	}

	/* Üstte hafif karartma: sabit başlık her zaman okunur kalıyor. */
	.hero-light-canvas::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 28%;
		background: linear-gradient(to bottom, rgb(8 9 11 / 0.5), transparent);
	}

	/* Altta panelin sayfa yüzeyine karıştığı geçiş. */
	.hero-light-canvas::after {
		content: '';
		position: absolute;
		inset: auto 0 0;
		height: 26%;
		background: linear-gradient(to bottom, transparent, var(--surface-base));
	}
</style>
