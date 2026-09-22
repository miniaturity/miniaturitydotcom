<script lang="ts">
    import { HoverTilt } from "hover-tilt";
    import cinderace from "$lib/assets/images/cinderace.webp";

</script>
<div class="pokemon-card">
    <HoverTilt 
        class="pc-wrapper"
        glareIntensity={2}
        scaleFactor={1.1}
        shadow
    >
        <img src={cinderace} alt=""/>
        <div class="card-shine"></div>
    </HoverTilt>
</div>

<style lang="scss">
    .pokemon-card {
        --w: clamp(100px, 8vw, 250px);
        --br: calc(var(--w) * 0.05);

        display: flex;
        position: absolute;
        width: var(--w);
        height: auto;
        left: calc(var(--w) * -0.3);
        top: calc(var(--w) * -0.5);

        transform: rotateZ(4deg);

        

        & img {
            object-fit: cover;
            width: 100%; height: 100%;
            border-radius: var(--br);
        }
    }



    .card-shine {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;

        --angle: -22deg;
        --space: 5%;
        background-size: 300% 300%; 
        background-image: repeating-linear-gradient(var(--angle), hsla(283, 49%, 60%, 0.75) calc(var(--space) * 1), hsla(2, 74%, 59%, 0.75) calc(var(--space) * 2), hsla(53, 67%, 53%, 0.75) calc(var(--space) * 3), hsla(93, 56%, 52%, 0.75) calc(var(--space) * 4), hsla(176, 38%, 50%, 0.75) calc(var(--space) * 5), hsla(228, 100%, 77%, 0.75) calc(var(--space) * 6), hsla(283, 49%, 61%, 0.75) calc(var(--space) * 7));
        background-blend-mode: color-dodge;
        
        background-position: var(--gradient-x, 50%) var(--gradient-y, 50%);
        pointer-events: none;
        border-radius: var(--br);
        
        mask-image: radial-gradient(
            circle at var(--gradient-x) var(--gradient-y), 
            rgba(0, 0, 0, 1) 10%, 
            rgba(0, 0, 0, 0) 70%
        );

        opacity: 0.4;
        transition: opacity 0.4s ease;
    }
    :global(.pc-wrapper) {
        border-radius: var(--br);
        position: relative;

    }

    :global(.hover-tilt::after) {
        --h: url("https://poke-holo.b-cdn.net/foils/151/birthday-holo-dank-2.webp");
        --hover-tilt-custom-gradient: conic-gradient(
            from calc(var(--hover-tilt-angle, 0)) at center center,
            rgba(255, 255, 255, calc(var(--hover-tilt-glare-intensity, 1) * 0.2)),
            rgba(222, 182, 82, calc(var(--hover-tilt-glare-intensity, 1) * 0.1)),
            rgba(255, 255, 255, calc(var(--hover-tilt-glare-intensity, 1) * 0.2))
        );
        --sparkle-rainbow-gradient: linear-gradient(to top left, #f9b3eb, #e2a6fc, #88a2f8, #a2f5a9 90%);
        --sparkles-image: url(/images/sparkles.webp);
        --sparkles-offset: calc(50% + var(--hover-tilt-x, 0) * 1.5px) calc(50% + var(--hover-tilt-y, 0) * 1.5px);
        --hover-tilt-default-gradient: radial-gradient(farthest-corner circle at var(--gradient-x) var(--gradient-y), lch(95% 2.7 var(--hover-tilt-glare-hue, 270) / calc(var(--hover-tilt-glare-intensity, 1) * 0.66)) 8%, lch(88% 5.5 var(--hover-tilt-glare-hue, 270) / calc(var(--hover-tilt-glare-intensity, 1) * 0.5)) 28%, lch(05% 3.5 var(--hover-tilt-glare-hue, 270) / calc(var(--hover-tilt-glare-intensity, 1) * 0.25)) 90%);
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-image:
        var(--sparkle-rainbow-gradient),
        var(--h),
        var(--hover-tilt-custom-gradient);
        background-size: 120% 160%, cover;
        background-position: center, var(--sparkles-offset), center;
        background-repeat: no-repeat, repeat, no-repeat;
        background-blend-mode: color-burn;
        mix-blend-mode: screen;
        will-change: background-image, opacity;
        pointer-events: none;
        
    }
</style>