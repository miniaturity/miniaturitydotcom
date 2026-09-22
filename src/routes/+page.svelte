<script lang="ts">
   import MouseWave from "$lib/components/mw/mouseWave.svelte";
    import PokemonCard from "$lib/components/home/scorbunnyCard.svelte";
    import { draggable } from "@neodrag/svelte";
    import CircleMatrix from "$lib/components/foreground/circleMatrix.svelte";
    import { onMount } from "svelte";

    interface Logo {
        src: string;
        width: number;
    }

    const introLogos: Logo[] = [
        { src: "Scorbunny.png", width: 60 },
    ]
    let introLogo = $state<Logo>();

    onMount(() => {
        const rand = Math.floor(Math.random() * introLogos.length);
        introLogo = introLogos[rand];
    });

    const DEFAULT_TEXT = "<enter>";
    let enterText = $state<string>(DEFAULT_TEXT);
    let scrambleToken = 0; 

    function easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }

    type LetterState = {
        char: string;
        fixed: boolean;
        current: string;
        resolved: boolean;
        resolveAt: number;   // timestamp when this letter locks in
        nextUpdate: number;
    };

    function onEnterTextHover() {
        const alpha = "abcdefghijklmnopqrstuvwxyz";
        const duration = 2200;    
        const minTick = 30;
        const maxTick = 220;

        const myToken = ++scrambleToken;
        const startTime = performance.now();

        const randomLetter = () => alpha[Math.floor(Math.random() * alpha.length)];

        const letters: LetterState[] = DEFAULT_TEXT.split("").map((ch) => {
            const fixed = ch === "<" || ch === ">";
            return {
                char: ch,
                fixed,
                current: fixed ? ch : randomLetter(),
                resolved: fixed,
                resolveAt: startTime + duration * (0.4 + Math.random() * 0.6),
                nextUpdate: startTime + Math.random() * minTick,
            };
        });

        function frame(now: number) {
            if (myToken !== scrambleToken) return;

            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);

            let allResolved = true;

            for (const l of letters) {
                if (l.fixed) continue;

                if (!l.resolved) {
                    if (now >= l.resolveAt) {
                        l.current = l.char;
                        l.resolved = true;
                    } else {
                        allResolved = false;

                        if (now >= l.nextUpdate) {
                            l.current = randomLetter();
                            const baseDelay = minTick + (maxTick - minTick) * eased;
                            const jitter = baseDelay * (0.5 + Math.random());
                            l.nextUpdate = now + jitter;
                        }
                    }
                }
            }

            enterText = letters.map((l) => l.current).join("");

            if (allResolved) return;

            requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }
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

        <div class="links">
            <div class="link-wrapper">
                <a href="/home" class="btn" onmouseenter={onEnterTextHover}>{enterText}</a>
            </div>
        </div>

        <div class="korean-blurb">
            <div class="hi_part" style="--anim-delay: 0.6s;">
                <img alt="hi" src="/logos/hi_a.png"/>
            </div>

            <div class="hi_part">
                <img alt="hi" src="/logos/hi_b.png"/>
            </div>
        </div>

        <div class="circle-wrapper" id="cw-0">
            <CircleMatrix 
                dotRadius={10}
                matrixRadius={4.5}
            />
        </div>

        <div class="circle-wrapper" id="cw-1">
            <CircleMatrix 
                dotRadius={10}
                matrixRadius={2.5}
            />
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

<div class="bg">
    <img alt="" src="/bg/skybg.png"/>
</div>

<div class="intro-overlay">
    <img alt="" src={`/intro-logos/${introLogo?.src}`} id="intro-logo" style={`width: ${introLogo?.width ?? 0}px`}/>
</div>

<style lang="scss">

    .intro-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        background-color: #fff;

        display: flex;
        align-items: center;
        justify-content: center;

        animation: out 1s ease-out forwards;
        animation-delay: 0.5s;
    }

    #intro-logo {
        height: auto;
    }

    @keyframes out {
        100% {
            opacity: 0;
            pointer-events: none;
        }
    }

    .circle-wrapper {
        position: absolute;
        z-index: -1;
    }

    #cw-0 {
        top: -33%;
        left: -20%;
    }

    #cw-1 {
        bottom: -10%;
        right: 0%;
        
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -99;

        opacity: 0.8;
        width: 100%;
        height: 100%;

        overflow: hidden;
        
        background: linear-gradient(240deg,rgba(255, 245, 219, 0.6) 0%, rgba(255, 255, 255, 0) 100%);


        & img {
            object-fit: cover;
            width: 100%; height: 100%;
        }
    }

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

    }

    .links {
        position: absolute;
        top: -10%;
        left: 45%;

        display: flex;
        flex-direction: row;
    }

    .link-wrapper {
        & a {
            color: #fff;
            font-family: monospace;
            background-color: var(--primary);
            padding: 8px;
            text-decoration: none;
            font-size: var(--fs-t);
            position: relative;
            
        }

        transition: all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
            
        &:hover {
            scale: 1.2;
            transform: rotateZ(-3deg);
        }

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
        height: 100px;
        width: 140px;
        font-family: "NotoKorean";

        display: flex;
        flex-direction: row;

        top: -60px;
        left: -60px;


        transition: scale 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .hi_part {
        width: 300px;
        height: auto;
        
        & img {
            object-fit: contain;
            width: 100%; height: 100%;

            &:hover {
                scale: 1.1;
                transform: rotateZ(4deg);
            }

            transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        animation: float 2.4s ease-in-out infinite;
        animation-delay: var(--anim-delay, 0s);
    }

    @keyframes float {
        0% {
            transform: translateY(0px);
        } 50% {
            transform: translateY(8px);
        } 100% {
            transform: translateY(0px);
        }
    }
</style>