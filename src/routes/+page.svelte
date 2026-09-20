<script lang="ts">
    import MouseWave from "$lib/components/mw/mouseWave.svelte";
    import PokemonCard from "$lib/components/home/pokemonCard.svelte";
    import { draggable } from "@neodrag/svelte";

</script>

<div class="page">
    <div class="main-card">
        <header class="header">
            <div class="name">miniaturity</div>
            <div class="logos">
                <img alt="dts" src="/logos/dts.png"/>
                
                <div class="caption">
                    <strong>© 2026 mini factory INC.</strong>
                    <div>all rights reserved</div>
                    <div id="dolby">
                        <img alt="dolby stereo" src="/logos/dolby.png"/>
                    </div>
                </div>
            </div>
        </header>

        <div class="korean-blurb">
            <img alt="hi" src="/logos/hi.png"/>
        </div>

        <div class="hc-sticker" 
            use:draggable={{ 
                defaultClassDragging: "sticker-dragging", 
                defaultPosition: { x: 400, y: -40 }    
            }}
            
        >
            <img alt="" src="/stickers/hcin.webp" draggable="false"/>
        </div>

        <div class="pcard">
            <PokemonCard />
        </div>
    </div>
</div>

<div class="wave">
    <MouseWave flipped={false}/>
    <MouseWave flipped />
</div>

<style lang="scss">
    .page {
        width: 100vw;
        height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main-card {
        display: flex;
        flex-direction: column;

        position: relative;
    }

    .hc-sticker {
        position: absolute;
        width: 100px;

        

        cursor: pointer;

        transform: rotateZ(-3deg);

        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }

        

        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .pcard {
        position: absolute;
        right: 7%;
        top: -30%;
        transform: rotateZ(4deg);
    }

    .name {
        font-family: "SpaceGrotesk";
        font-size: var(--fs-l);
        color: #fff;
        background-color: var(--secondary);
        padding: 0px 6px;
    }

    .header {
        display: flex;
        flex-direction: column;
    }

    .logos {
        display: flex;
        flex-direction: row;
        height: 80px;
    }

    #dolby {
        width: 100px;

        & img {
            object-fit: contain;
            width: 100%; height: 100%;
        }
    }

    .caption {
        font-family: Arial, Helvetica, sans-serif;
        padding: 8px;
        color: var(--secondary);

        display: flex;
        flex-direction: column;
    }

    .korean-blurb {
        position: absolute;
        height: auto;
        width: 150px;
        font-family: "NotoKorean";

        top: -60px;
        left: -60px;

        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }

        &:hover {
            scale: 1.1;
            transform: rotateZ(4deg);
        }

        transition: scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

</style>