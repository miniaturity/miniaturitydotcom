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

		--fs-l: clamp(2rem, 10vw, 6rem);

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
