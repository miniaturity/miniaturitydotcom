<script lang="ts">
  interface Props {
    dotRadius: number;
    matrixRadius: number;
  }

  let { dotRadius, matrixRadius }: Props = $props();

  interface Dot {
    x: number;
    y: number;
    dist: number;
  }

  const GAP_RATIO = 2.6;
  const spacing = $derived(dotRadius * GAP_RATIO);

  const pixelRadius = $derived(matrixRadius * spacing);

  const containerRadius = $derived(pixelRadius + dotRadius);

  const dots = $derived.by((): Dot[] => {
    const result: Dot[] = [];
    if (spacing <= 0 || matrixRadius <= 0) return result;

    const rowHeight = spacing * 0.8660254; // sqrt(3)/2, for a hex-packed grid
    const maxRow = Math.ceil(pixelRadius / rowHeight);

    for (let row = -maxRow; row <= maxRow; row++) {
      const y = row * rowHeight;
      const offset = row % 2 !== 0 ? spacing / 2 : 0;
      const maxCol = Math.ceil(pixelRadius / spacing) + 1;

      for (let col = -maxCol; col <= maxCol; col++) {
        const x = col * spacing + offset;
        const dist = Math.sqrt(x * x + y * y);
        if (dist <= pixelRadius) {
          result.push({ x, y, dist });
        }
      }
    }
    return result;
  });

  const maxDist = $derived(
    dots.reduce((max, dot) => Math.max(max, dot.dist), 0) || 1
  );


  const travelDuration = 1.6; // seconds
  const restDuration = 0.9; // seconds
  const cycleDuration = $derived(travelDuration + restDuration);

  function delayFor(dist: number): number {
    return (dist / maxDist) * travelDuration;
  }
</script>

<div
  class="circle-dot-matrix"
  style:width="{containerRadius * 2}px"
  style:height="{containerRadius * 2}px"
  style:--cycle="{cycleDuration}s"
  role="img"
  aria-label="Animated circular LED dot matrix"
>
  {#each dots as dot (dot.x + ',' + dot.y)}
    <div
      class="dot-wrap"
      style:left="{containerRadius + dot.x - dotRadius}px"
      style:top="{containerRadius + dot.y - dotRadius}px"
      style:width="{dotRadius * 2}px"
      style:height="{dotRadius * 2}px"
      style:--delay="{delayFor(dot.dist)}s"
    >
      <span class="glow"></span>
      <span class="dot"></span>
    </div>
  {/each}
</div>

<style>
  .circle-dot-matrix {
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .dot-wrap {
    position: absolute;
    display: grid;
    place-items: center;
  }

  .dot {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #fff5cf;
    opacity: 1;
    transform: scale(0.78);
    animation: dot-pulse var(--cycle) ease-in-out infinite;
    animation-delay: var(--delay);
  }

  
  .glow {
    position: absolute;
    inset: -140%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 250, 240, 0.9) 0%,
      rgba(255, 244, 214, 0.45) 10%,
      rgba(255, 244, 214, 0) 70%
    );
    mix-blend-mode: screen;
    opacity: 0;
    transform: scale(0.5);
    animation: glow-pulse var(--cycle) ease-in-out infinite;
    animation-delay: var(--delay);
  }

  @keyframes dot-pulse {
    0% {
      opacity: 0.22;
      transform: scale(0.78);
    }
    8% {
      opacity: 1;
      transform: scale(1);
    }
    22% {
      opacity: 0.22;
      transform: scale(0.78);
    }
    100% {
      opacity: 0.22;
      transform: scale(0.78);
    }
  }

  @keyframes glow-pulse {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    8% {
      opacity: 1;
      transform: scale(1);
    }
    26% {
      opacity: 0;
      transform: scale(1.15);
    }
    100% {
      opacity: 0;
      transform: scale(1.15);
    }
  }

</style>