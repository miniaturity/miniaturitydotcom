<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        items: Snippet[];
        radius?: number;
        // seconds/revolution
        duration?: number;
        reverse?: boolean;
        paused?: boolean;
    }

    let {
        items,
        radius = 150,
        duration = 10,
        reverse = false,
        paused = false,
    }: Props = $props();

    const points = $derived(
        items.map((item, i) => {
            const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            return { item, x, y };
        })
    );
</script>

<div 
    class="circle-container" 
    style="--radius: {radius}px; --duration: {duration}s"
    class:paused
    class:reverse
>
    {#each points as { item, x, y }}
        <div
            class="circle-item"
            style="--x: {x}px; --y: {y}px"
        >
            <div
                class="ci-content"
                class:paused
                class:reverse
            >
                {@render item()}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }

    @keyframes counter-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(-360deg); }
    }

    .circle-container {
        position: relative;
        width: calc(var(--radius) * 2);
        height: calc(var(--radius) * 2);
        margin: 0 auto;
        
        border-radius: 50%;
        animation: spin var(--duration) linear infinite;

        &.reverse {
            animation-direction: reverse;
        }

        &.paused {
            animation-play-state: paused;
        }

         border: 4px dotted rgb(from var(--primary) r g b / 0.3);
        
    }

    .circle-item {  
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y)));
    }

    .ci-content {
        animation: counter-spin var(--duration) linear infinite;

        &.reverse {
            animation-direction: reverse;
        }

        &.paused {
            animation-play-state: paused;
        }
    }
</style>