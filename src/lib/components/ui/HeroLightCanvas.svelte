<script lang="ts">
	import { onMount } from 'svelte';

	let container!: HTMLDivElement;
	let canvas!: HTMLCanvasElement;

	onMount(() => {
		const context = canvas.getContext('2d');

		if (!context) {
			console.error('Hero light canvas context could not be created.');
			return;
		}

		/*
		 * Işığı düşük çözünürlükte hesaplıyoruz.
		 * Sonra tarayıcı bunu Hero boyutuna büyütüyor.
		 *
		 * Böylece her piksel için ışık hesabı yapabilmemize rağmen
		 * performans kabul edilebilir seviyede kalıyor.
		 */
		const renderWidth = 260;
		const renderHeight = 150;

		canvas.width = renderWidth;
		canvas.height = renderHeight;

		context.imageSmoothingEnabled = true;

		const imageData = context.createImageData(
			renderWidth,
			renderHeight
		);

		const pixels = imageData.data;

		/*
		 * Mouse'un gerçek hedef konumu.
		 * Değerler -1 ile +1 arasında tutuluyor.
		 */
		let targetX = 0;
		let targetY = 0;

		/*
		 * Yumuşatılmış ışık konumu.
		 */
		let lightX = 0;
		let lightY = 0;
        let velocityX = 0;
        let velocityY = 0;

		let animationFrame = 0;
		let isVisible = true;

		/*
		 * Sabit pseudo-random noise.
		 *
		 * Her frame değişmediği için yüzey titreşmiyor.
		 * Yalnızca malzemenin mikroskobik pürüzlülüğü gibi davranıyor.
		 */
		const surfaceNoise = new Float32Array(
			renderWidth * renderHeight
		);

		for (let index = 0; index < surfaceNoise.length; index++) {
			const x = index % renderWidth;
			const y = Math.floor(index / renderWidth);

			const fineNoise =
				Math.sin(x * 12.9898 + y * 78.233) *
				43758.5453;

			const broadNoise =
				Math.sin(x * 0.15) *
				Math.cos(y * 0.12);

			const randomPart =
				(fineNoise - Math.floor(fineNoise)) * 2 - 1;

			surfaceNoise[index] =
				randomPart * 0.65 +
				broadNoise * 0.35;
		}

		function handlePointerMove(event: PointerEvent) {
			const rect = container.getBoundingClientRect();

			if (rect.width === 0 || rect.height === 0) return;

			const normalizedX =
				(event.clientX - rect.left) / rect.width;

			const normalizedY =
				(event.clientY - rect.top) / rect.height;

			/*
			 * Mouse bütün ekran boyunca hareket etse de
			 * ışık kaynağı yalnızca sınırlı miktarda kayıyor.
			 *
			 * Bu yüzden ışık mouse'un altına yapışmıyor.
			 */
			const safeX = clamp(normalizedX, 0, 1);
            const safeY = clamp(normalizedY, 0, 1);

            targetX = (safeX * 2 - 1) * 0.38;
            targetY = (1 - safeY * 2) * 0.24;
		}

		function clamp(value: number, min: number, max: number) {
			return Math.max(min, Math.min(max, value));
		}

		function renderSurface() {
			/*
			 * Daha önce seçtiğimiz hareket karakteri:
			 *
			 * X daha hızlı
			 * Y biraz daha ağır
			 */
			velocityX += (targetX - lightX) * 0.018;
            velocityY += (targetY - lightY) * 0.014;

            velocityX *= 0.84;
            velocityY *= 0.82;

            lightX += velocityX;
            lightY += velocityY;

			/*
			 * Işık kullanıcının/kameranın önünden geliyor.
			 *
			 * X ve Y hafifçe hareket ediyor.
			 * Z sabit ve yüzeyin önünde.
			 */
			const sourceX = lightX;
			const sourceY = lightY;
			const sourceZ = 1.75;

			for (let y = 0; y < renderHeight; y++) {
				for (let x = 0; x < renderWidth; x++) {
					const pixelIndex = y * renderWidth + x;
					const dataIndex = pixelIndex * 4;

					/*
					 * Pikseli -1 / +1 yüzey koordinatlarına çevir.
					 */
					const surfaceX =
						(x / (renderWidth - 1)) * 2 - 1;

					const surfaceY =
						1 - (y / (renderHeight - 1)) * 2;

					const noise = surfaceNoise[pixelIndex];

					/*
					 * Yüzey normalini çok hafif bozuyoruz.
					 *
					 * Düz bir yüzey:
					 * normal = 0, 0, 1
					 *
					 * Pürüzlü yüzey:
					 * X ve Y eksenlerinde küçük sapmalar.
					 */
					const secondNoise =
	                    surfaceNoise[
		                    (pixelIndex + 97) % surfaceNoise.length
	                    ];

                    let normalX = noise * 0.025;
                    let normalY = secondNoise * 0.025;
                    let normalZ = 1;

					const normalLength = Math.hypot(
						normalX,
						normalY,
						normalZ
					);

					normalX /= normalLength;
					normalY /= normalLength;
					normalZ /= normalLength;

					/*
					 * Yüzey pikselinden ışık kaynağına giden vektör.
					 */
					let directionX = sourceX - surfaceX;
					let directionY = sourceY - surfaceY;
					let directionZ = sourceZ;

					const distance = Math.hypot(
						directionX,
						directionY,
						directionZ
					);

					directionX /= distance;
					directionY /= distance;
					directionZ /= distance;

					/*
					 * Lambert diffuse:
					 * Işığın yüzeye geliş açısı.
					 */
					const diffuse = Math.max(
						0,
						normalX * directionX +
							normalY * directionY +
							normalZ * directionZ
					);

					/*
					 * Mesafeyle fiziksel olarak yaklaşık zayıflama.
					 * Tam ters-kare kullanmıyoruz; çok sert görünürdü.
					 */
					const attenuation =
						1 / (1 + distance * distance * 0.72);

					/*
					 * Kamera yüzeye önden bakıyor:
					 * view direction yaklaşık 0, 0, 1.
					 *
					 * Half-vector ile basit specular hesaplıyoruz.
					 */
					let halfX = directionX;
					let halfY = directionY;
					let halfZ = directionZ + 1;

					const halfLength = Math.hypot(
						halfX,
						halfY,
						halfZ
					);

					halfX /= halfLength;
					halfY /= halfLength;
					halfZ /= halfLength;

					const normalHalf = Math.max(
						0,
						normalX * halfX +
							normalY * halfY +
							normalZ * halfZ
					);

					/*
					 * Üs küçüldükçe yüzey matlaşır.
					 * Çok parlak plastik gibi görünmesini istemiyoruz.
					 */
					const specular =
                        Math.pow(normalHalf, 10) *
                        attenuation;

					/*
					 * Ekranın kenarlarını çok hafif karartıyoruz.
					 * Bu bağımsız bir oval ışık değil;
					 * yüzeyin görüntüleme karakteri.
					 */
					const edgeDistance = Math.sqrt(
						surfaceX * surfaceX * 0.42 +
							surfaceY * surfaceY * 0.58
					);

					const vignette = clamp(
						1 - edgeDistance * 0.22,
						0.72,
						1
					);

					const materialVariation =
						noise * 2.2;

					const diffuseLight =
                        diffuse *
                        attenuation *
                        58;

                    const specularLight =
                        specular * 34;

					/*
					 * Mat, koyu ve hafif soğuk bir yüzey.
					 */
					const red = clamp(
						13 +
							diffuseLight * 0.83 +
							specularLight * 0.92 +
							materialVariation,
						0,
						255
					);

					const green = clamp(
						14 +
							diffuseLight * 0.9 +
							specularLight * 0.97 +
							materialVariation,
						0,
						255
					);

					const blue = clamp(
						17 +
							diffuseLight +
							specularLight +
							materialVariation,
						0,
						255
					);

					pixels[dataIndex] = red * vignette;
					pixels[dataIndex + 1] = green * vignette;
					pixels[dataIndex + 2] = blue * vignette;
					pixels[dataIndex + 3] = 255;
				}
			}

			context!.putImageData(imageData, 0, 0);
		}

		function animate() {
			if (isVisible) {
				renderSurface();
			}

			animationFrame = requestAnimationFrame(animate);
		}

		/*
		 * Hero ekranda değilken boşuna piksel hesaplamıyoruz.
		 */
		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				isVisible = entries[0]?.isIntersecting ?? true;
			},
			{
				threshold: 0
			}
		);

		intersectionObserver.observe(container);
		window.addEventListener(
			'pointermove',
			handlePointerMove
		);

		animate();

		return () => {
			cancelAnimationFrame(animationFrame);

			window.removeEventListener(
				'pointermove',
				handlePointerMove
			);

			intersectionObserver.disconnect();
		};
	});
</script>

<div
	bind:this={container}
	class="hero-light-canvas"
	aria-hidden="true"
>
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.hero-light-canvas {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
		background: #0d0e11;
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;

		/*
		 * Düşük çözünürlüklü ışık hesabını büyütürken
		 * piksellerin görünmesini engelliyoruz.
		 */
		filter: blur(0.7px);
		transform: scale(1.01);
	}
</style>
