<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style lang="scss">
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

	:root {
		--primary: #3F46EF;
		--secondary: #F90103;
		--secondary-d: #7B120B;

		--orange: #FFA137;
		--creamsicle: #ffebce;

		--fs-l: clamp(2rem, 10vw, 6rem);
		--fs-m: clamp(1.4rem, 6vw, 3.6rem);
		--fs-r: clamp(1rem, 4vw, 2rem);
		--fs-t: clamp(0.8rem, 3vw, 1.5rem);

		--s:#FF9FFC;
		--b: #fab386;
	}

	@font-face {
		font-family: "SpaceGrotesk";
		src: url("$lib/assets/fonts/SpaceGrotesk.ttf") format("truetype");
	}

	@font-face {
		font-family: "NotoKorean";
		src: url("$lib/assets/fonts/NotoSansKR.ttf") format("truetype");
	}
</style>
