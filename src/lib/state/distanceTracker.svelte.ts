export type Position = { x: number, y: number };

export function createDistanceTracker() {
    let mouse = $state<Position>({ x: 0, y: 0 });

    if (typeof window !== "undefined") {
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
    }

    function track(node: HTMLElement, callback: (dist: number) => void) {
        const updateDistance = () => {
            const rect = node.getBoundingClientRect();

            const dx = Math.max(rect.left - mouse.x, 0, mouse.x - rect.right);
            const dy = Math.max(rect.top - mouse.y, 0, mouse.y - rect.bottom);

            const distance = Math.sqrt(dx * dx + dy * dy);

            callback(Math.round(distance));
        };

        const effectCleanup = $effect.root(() => {
            $effect(() => {
                const _ = mouse.x + mouse.y;
                updateDistance();
            });
        });

        return {
            destroy() {
                effectCleanup();
            }
        };
    }

    return { track };
}