<script lang="ts">
    import { HoverTilt } from "hover-tilt";
    import scorbunny from "$lib/assets/images/scorbunny.jpg";

</script>
<div class="pokemon-card">
    <HoverTilt 
        class="pc-wrapper"
        glareIntensity={1}
        scaleFactor={1.1}
        shadow
    >
        <img src={scorbunny} alt=""/>
        <div class="card-shine"></div>
    </HoverTilt>
</div>

<style lang="scss">
    .pokemon-card {
        --w: clamp(100px, 10vw, 280px);
        --br: calc(var(--w) * 0.05);

        display: flex;
        position: absolute;
        width: var(--w);
        height: auto;
        left: 0;
        top: 0;

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
</style>