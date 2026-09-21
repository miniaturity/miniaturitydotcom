<script lang="ts">
    import GradientWave from "./gradientWave.svelte";
    import { createDistanceTracker } from "$lib/state/distanceTracker.svelte";
    import { useWaveClock } from "$lib/state/waveClock.svelte";

    let {
        flipped
    }: {
        flipped: boolean
    } = $props();

    const { track } = createDistanceTracker();
    const clock = useWaveClock(); // shared across both MouseWave instances -> stays in sync

    let desyncDelay = $derived(!flipped ? Math.max(0.2, Math.random() * 2) : 0);

    let mousePos = $state({ x: 0, y: 0 });
    
    let innerWidth = $state<number>(0);
    let lengthPx = $state<number>(20);
    
    let count = $derived<number>(Math.ceil(innerWidth / lengthPx) + 2);

    let distances = $state<number[]>([]);

    function handleMousemove(e: MouseEvent) {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    }
    
</script>

<svelte:window bind:innerWidth onmousemove={handleMousemove} />

<div class="mw-container" style={`--mx: ${mousePos.x}px; --my: ${mousePos.y}px; --count: ${count}; --length: ${lengthPx}px`}>
    {#each { length: count } as _, i}
        <div use:track={(dist) => (distances[i] = dist)}>
            <GradientWave 
                dist={distances[i] ?? 0}
                {lengthPx}
                {i}
                {flipped}
                time={clock.time - desyncDelay}
            />
        </div>
    {/each}
</div>

<style lang="scss">
    .mw-container {
        position: absolute;
        top: 0;
        left: 0;
        right: calc((var(--count) * var(--length)) / -2);
        width: 100vw;
        height: 100vh;

        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;

        pointer-events: none;
        z-index: -1;
    }
</style>