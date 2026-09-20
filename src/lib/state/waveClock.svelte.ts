let time = $state(0);
let running = false;

function startClock() {
    if (running) return;
    running = true;

    let start: number | null = null;

    function tick(ts: number) {
        if (start === null) start = ts;
        time = (ts - start) / 1000; 
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

export function useWaveClock() {
    startClock();
    return {
        get time() {
            return time;
        }
    };
}