<script lang="ts">
    import { untrack } from 'svelte';

    let { 
        dialogue,
        render = false
    }: { 
        dialogue: string | null; 
        render: boolean;
    } = $props();

    const SPEED = 25;

    let finished = $state<boolean>(false);
    let currentText = $state<string>("");
    let index = $state<number>(0);

    let typingTimeout: number | undefined;

    function startTyping() {
        currentText = "";
        index = 0;
        finished = false;

        clearTimeout(typingTimeout);

        typeNextCharacter();
    }

    function typeNextCharacter() {
        if (!dialogue) return;

        if (finished) {
            currentText = dialogue;
            return;
        }

        if (index >= dialogue.length) {
            finished = true;
            return;
        }

        currentText += dialogue[index];
        index++;

        typingTimeout = setTimeout(typeNextCharacter, SPEED);
    }

    function deleteLastCharacter() {
        if (!dialogue) return; 
        
        if (currentText.length === 0) {
            return;
        }

        currentText = currentText.slice(0, -1);

        typingTimeout = setTimeout(deleteLastCharacter, SPEED);
    }

    $effect(() => {
        if (render) {
            untrack(() => {
                startTyping();
            });
        } else {
            untrack(() => {
                if (!dialogue || currentText.length === 0) return;
                deleteLastCharacter();
            });
        }

        return () => clearTimeout(typingTimeout);
    });
</script>

{#if currentText.length > 0}
    <div class="dialogue">
        <div class="d-text">{currentText}</div>
    </div>
{/if}

<style lang="scss">
    .dialogue {
        display: flex;
        padding: 4px;
        background-color: var(--secondary);
        color: #fff;

        z-index: 4;
        font-family: "NotoKorean";
    }

    .d-text {
        padding: 4px;
        border: 2px solid #fff;
    }
</style>