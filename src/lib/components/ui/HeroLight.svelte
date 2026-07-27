<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let container!: HTMLDivElement;

	onMount(() => {
		const scene = new THREE.Scene();

		/*
		 * OrthographicCamera kullanıyoruz.
		 * Perspektif bozulması olmadan Hero yüzeyini ekran gibi göreceğiz.
		 */
		const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 100);
		camera.position.set(0, 0, 10);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});

		/*
		 * Retina ekranlarda gereksiz GPU yükünü engelliyoruz.
		 */
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.setClearColor(0x000000, 0);

		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 0.8;

		container!.appendChild(renderer.domElement);

		/*
		 * Hero'nun arkasındaki fiziksel yüzey.
		 * Işık bu materyalin üzerinde hesaplanacak.
		 */
		const surfaceGeometry = new THREE.PlaneGeometry(16, 10, 1, 1);

		const surfaceMaterial = new THREE.MeshStandardMaterial({
			color: new THREE.Color('#101113'),
			roughness: 0.88,
			metalness: 0.08,
			side: THREE.FrontSide
		});

		const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
		surface.position.set(0, 0, 0);
		scene.add(surface);

		/*
		 * Ortam tamamen siyah olmasın diye çok düşük yoğunluklu ışık.
		 */
		const ambientLight = new THREE.AmbientLight(0x606572, 0.04);
		scene.add(ambientLight);

		/*
		 * Gerçek spot ışığımız.
		 * Sağ üstte ve yüzeyin önünde bulunuyor.
		 */
		const spotLight = new THREE.SpotLight(
			0xeaf2ff, // Hafif soğuk beyaz
			45, // Yoğunluk
			30, // Etki mesafesi
			Math.PI * 0.18, // Işık konisinin açısı
			0.72, // Kenar yumuşaklığı
			1.4 // Mesafeyle zayıflama
		);

		spotLight.position.set(6.5, 4.5, 6);
		scene.add(spotLight);

		/*
		 * SpotLight doğrudan konuma değil, bir Object3D hedefe bakar.
		 */
		const lightTarget = new THREE.Object3D();
		lightTarget.position.set(0.5, 0, 0);
		scene.add(lightTarget);

		spotLight.target = lightTarget;

		/*
		 * Mouse'un gerçek hedefi ve lambanın yumuşatılmış hedefi.
		 */
		const pointerTarget = new THREE.Vector2(0.5, 0);
		const smoothedTarget = new THREE.Vector2(0.5, 0);

		let animationFrame = 0;

		function handlePointerMove(event: PointerEvent) {
			const rect = container.getBoundingClientRect();

			if (rect.width === 0 || rect.height === 0) return;

			const normalizedX = (event.clientX - rect.left) / rect.width;
			const normalizedY = (event.clientY - rect.top) / rect.height;

			/*
			 * Ekran koordinatlarını Three.js dünya koordinatlarına çeviriyoruz.
			 *
			 * X:
			 * Sol kenar  = -8
			 * Sağ kenar =  8
			 *
			 * Y:
			 * Üst kenar =  5
			 * Alt kenar = -5
			 */
			pointerTarget.x = THREE.MathUtils.lerp(-8, 8, normalizedX);
			pointerTarget.y = THREE.MathUtils.lerp(5, -5, normalizedY);
		}

		function resize() {
			const width = container.clientWidth;
			const height = container.clientHeight;

			if (width === 0 || height === 0) return;

			const aspect = width / height;
			const verticalSize = 5;

			camera.left = -verticalSize * aspect;
			camera.right = verticalSize * aspect;
			camera.top = verticalSize;
			camera.bottom = -verticalSize;

			camera.updateProjectionMatrix();

			/*
			 * Yüzeyin kamera görüntüsünü tamamen doldurmasını sağlıyoruz.
			 */
			const surfaceWidth = verticalSize * aspect * 2;
			const surfaceHeight = verticalSize * 2;

			surface.scale.set(surfaceWidth / 16, surfaceHeight / 10, 1);

			renderer.setSize(width, height, false);
		}

		function animate() {
			/*
			 * Yatay takip 0.08, dikey takip 0.06.
			 * Daha önce beğendiğimiz hareket karakteri korunuyor.
			 */
			smoothedTarget.x +=
				(pointerTarget.x - smoothedTarget.x) * 0.08;

			smoothedTarget.y +=
				(pointerTarget.y - smoothedTarget.y) * 0.06;

			lightTarget.position.set(
				smoothedTarget.x,
				smoothedTarget.y,
				0
			);

			renderer.render(scene, camera);
			animationFrame = requestAnimationFrame(animate);
		}

		const resizeObserver = new ResizeObserver(resize);

		resizeObserver.observe(container);
		window.addEventListener('pointermove', handlePointerMove);

		resize();
		animate();

		return () => {
			cancelAnimationFrame(animationFrame);

			window.removeEventListener('pointermove', handlePointerMove);
			resizeObserver.disconnect();

			surfaceGeometry.dispose();
			surfaceMaterial.dispose();
			renderer.dispose();

			renderer.domElement.remove();
		};
	});
</script>

<div
	bind:this={container}
	class="hero-light"
	aria-hidden="true"
></div>

<style>
	.hero-light {
		position: absolute;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.hero-light :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
