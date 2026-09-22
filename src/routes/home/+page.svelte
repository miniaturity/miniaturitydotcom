<script lang="ts">
    import RippleGrain from "$lib/components/background/rippleGrain.svelte";
    import CircleMatrix from "$lib/components/foreground/circleMatrix.svelte";
    import CirclePoints from "$lib/components/home/circlePoints.svelte";
    import Dialogue from "$lib/components/home/dialogue.svelte";
    import LastFM from "$lib/components/home/lastFM.svelte";

    let render = $state<boolean>(false);
    let dialogue = $state<string | null>(null);

    function activateDialogue(text: string) {
        render = true;
        dialogue = text;
    }

    let rippleSpeed = $state<number>(6);
    let lastDate = $state<string>("");

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#snippet cardA()}
    <div class="a-card" 
        onmouseenter={() => activateDialogue("that's me")}
        onmouseleave={() => render = false}
    >
        <div class="ac-content">
            <span class="acc-title">mini</span>
            <span class="acc-jap">(バニー)</span>
            <span class="acc-text">
                miniaturity: a game and website developer
                <br /> based in nyc
            </span>
            <div class="mini-sticker">
                <img alt="" src="/stickers/mini.png"/>
            </div>
        </div>
    </div>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#snippet cardB()}
    <div class="b-card"
        onmouseenter={() => activateDialogue(`musiccc.. listened at: ${lastDate}`)}
        onmouseleave={() => render = false}
    >
        <div class="bc-content">
            <LastFM 
                bind:lastDate
            />
        </div>
    </div>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#snippet cardC()}
    <div class="c-card"
        onmouseenter={() => activateDialogue(`something`)}
        onmouseleave={() => render = false}
    >
        <div class="cc-content">
            <div
                style="width: 100%; height: 100%; overflow: hidden;"
            >
                <span class="cc-title">
                    Hello world
                </span>

                <span class="cc-title">
                    你好世界
                </span>


                <span class="cc-title">
                    こんにちは世界
                </span>
                
            </div>

        </div>
    </div>
{/snippet}

<div class="page">
    <div class="circle-path">
        <CirclePoints 
            items={[cardA, cardB, cardC]}
            radius={250}
            duration={120}
        />
    </div>

    <div class="main">
        <a class="gallery-link" href="/gallery"
            onmouseenter={() => { 
                activateDialogue("enter the gallery")
                rippleSpeed = 40;
            }}
            onmouseleave={() => { 
                render = false
                rippleSpeed = 6;
            }}
        >
            <div class="gl-content">gallery</div>
        </a>
    </div>

    <div class="balls">
        <CircleMatrix 
            dotRadius={10}
            matrixRadius={4}
        />
    </div>

    <div class="dialogue">
        <Dialogue 
            {dialogue}
            {render}
        />
    </div>
</div>

<div class="bg">
    <RippleGrain 
        {rippleSpeed}
    />
</div>

<style lang="scss">
    .balls {
        position: absolute;
        z-index: -1;
        margin: auto;
    }

    .cc-title {
        display: inline-block;
        width: 100%;
        text-align: right;
        color: #fff;

        font-size: var(--fs-t);
        white-space: nowrap;
        font-family: "Kiwami";
        transform-origin: right;
    }

    .c-card {
        pointer-events: all;

        height: 150px;
        aspect-ratio: 5 / 4;
        padding: 8px;

        background-color: var(--primary);
    }

    .cc-content {
        padding: 4px;
        border: 2px solid #fff;
        width: 100%; height: 100%;

        display: flex;
        flex-direction: column;
    }

    .dialogue {
        position: absolute;
        margin: auto;
        bottom: 5%;
    }


    .a-card {
        display: flex;
        align-items: center;
        justify-content: center;

        aspect-ratio: 1 / 1;
        width: clamp(150px, 10vw, 300px);

        background-color: var(--primary);
        pointer-events: all;
    }

    .ac-content {
        position: relative;

        margin: 8px;
        padding: 4px;
        width: 100%; height: 100%;
        border: 2px solid #fff;

        display: flex;
        flex-direction: column;
    }


    .acc-title {
        display: inline-block;
        font-family: "Kiwami";
        font-size: var(--fs-r);
        color: #fff;

        transform: scaleX(1.6);
        transform-origin: left;
    }

    .acc-jap {
        font-family: "NotoKorean";
        font-size: var(--fs-t-l);
        color: #fff;
    }

    .acc-text {
        display: inline-block;
        font-family: Arial, Helvetica, sans-serif;
        font-size: var(--fs-t-c);
        color: #fff;

        margin-top: 4px;

        transform: scaleX(0.8);
        transform-origin: left;
    }

    .mini-sticker {
        position: absolute;
        bottom: -20%;
        right: -25%;

        width: 80px;
        height: auto;

        & img {
            object-fit: contain;
            width: 100%; height: 100%;
        }
    }

    .circle-path {
        position: absolute;
        top: 0; left: 0;
        overflow: hidden;
        width: 100vw; height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;
    }

    .gallery-link {
        display: flex;
        padding: 4px;
        background-color: var(--primary);
        text-decoration: none;

        transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
            scale: 1.2;
        }
    }

    .gl-content {
        font-family: "SpaceGrotesk";
        border: 2px solid #fff;
        padding: 4px;
        color: #fff;
        font-size: var(--fs-r);
        
    }

    .page {
        width: 100vw;
        height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;

        background: linear-gradient(0deg,rgba(255, 245, 219, 1) 30%, rgba(255, 255, 255, 0) 100%);

    }

    .bg {
        position: absolute;
        top: 0; left: 0;
        width: 100dvw; height: 100dvh;
        pointer-events: none;
    }
</style>