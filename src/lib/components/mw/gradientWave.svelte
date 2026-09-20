<script lang="ts">

    let {
        dist, 
        lengthPx,
        i,
        flipped = false,
        time = 0
    }: {
        dist: number; // distance from the mouse to this wave
        lengthPx: number; // length of wave
        i: number; // index
        flipped?: boolean;
        time?: number; // shared animation clock (seconds), drives the idle sine wave
    } = $props();


</script>

<div class="gradient-wave" 
    style={`
        --i: ${i}; 
        --width: ${lengthPx}px; 
        --dist: ${dist};
        --time: ${time};
        --grad: ${flipped 
            ? `linear-gradient(180deg, var(--primary) 0%, rgba(255, 255, 255, 0) 100%);` 
            : `linear-gradient(0deg, var(--primary) 0%, rgba(255, 255, 255, 0) 100%);`}
        
        ${flipped 
            ? `margin-bottom: calc(var(--max-out) * var(--curve) * 1px + 100px);`
            : `margin-top: calc(var(--max-out) * var(--curve) * 1px + 100px);`
        }

        --dot: ${flipped ? "90%" : "-10%"};
    `}
>

</div>

<style lang="scss">
    .gradient-wave {
        background: var(--primary);
        background: var(--grad);
    
        height: 40px;
        width: var(--width);

        filter: brightness(max(1, calc(var(--i) * 0.05)));

        --dist-px: calc(var(--dist) * 1px);

        --max-out: 350;
        --max-out-px: calc(var(--max-out) * 1px);

        --progress: min(1, calc(var(--dist) / var(--max-out)));
        --curve-mouse: calc((1 + cos(var(--progress) * 180deg)) / 2);

        --w1-freq: 0.35;
        --w1-speed: 1.4;
        --w1-phase: 0;
        --w1-amp: 0.5;

        --w2-freq: 0.21;
        --w2-speed: 0.85;
        --w2-phase: 1.9;
        --w2-amp: 0.3;

        --w3-freq: 0.52;
        --w3-speed: -1.05;
        --w3-phase: 4.2;
        --w3-amp: 0.2;

        --wave-amp-total: calc(var(--w1-amp) + var(--w2-amp) + var(--w3-amp));

        --wave1: calc(var(--w1-amp) * sin(var(--i) * var(--w1-freq) * 1rad - var(--time) * var(--w1-speed) * 1rad + var(--w1-phase) * 1rad));
        --wave2: calc(var(--w2-amp) * sin(var(--i) * var(--w2-freq) * 1rad - var(--time) * var(--w2-speed) * 1rad + var(--w2-phase) * 1rad));
        --wave3: calc(var(--w3-amp) * sin(var(--i) * var(--w3-freq) * 1rad - var(--time) * var(--w3-speed) * 1rad + var(--w3-phase) * 1rad));

        --wave-sum: calc(var(--wave1) + var(--wave2) + var(--wave3));

        --wave-amp: 0.6;
        --mouse-boost: 0.7;
        --wave-amp-effective: calc(var(--wave-amp) + var(--curve-mouse) * var(--mouse-boost));
        --curve-wave: calc(var(--wave-amp-effective) * (1 + var(--wave-sum) / var(--wave-amp-total)) / 2);

        --curve: min(1, var(--curve-wave));

        position: relative;

        &::after {
            content: "";
            position: absolute;
            height: 4px; width: 4px;
            border-radius: 100%;
            background-color: var(--primary);
            left: calc(50% - 4px);

            top: var(--dot);
        }
    }
</style>