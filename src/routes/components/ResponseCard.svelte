<script lang="ts">
    import Card from "./Card.svelte";

    export let responseText: string;
    export let isGood: boolean | null = null;
    export let onGoodClick: () => void;
    export let onBadClick: () => void;

    // Determine card background color
    const backgroundColor =
        isGood === true
            ? "bg-green-100"
            : isGood === false
              ? "bg-red-100"
              : "bg-white";

    // Determine button colors
    const defaultGoodButtonClass = "text-green-500 ring-green-500 bg-green-100";
    const defaultBadButtonClass = "text-red-500 ring-red-500 bg-red-100";
    const disabledButtonClass = "text-gray-500 ring-gray-300 bg-gray-100";

    const goodButtonClass =
        isGood === true ? disabledButtonClass : defaultGoodButtonClass;
    const badButtonClass =
        isGood === false ? disabledButtonClass : defaultBadButtonClass;

    const buttonDisabledGood = isGood === true;
    const buttonDisabledBad = isGood === false;
</script>

<Card extraClass={backgroundColor}>
    <p>{responseText}</p>
    <div class="flex justify-center mt-2 space-x-4">
        <button
            on:click={onBadClick}
            class={`py-2 px-4 rounded-full ring-2 hover:bg-opacity-75 ${badButtonClass}`}
            disabled={buttonDisabledBad}
        >
            ✘
        </button>
        <button
            on:click={onGoodClick}
            class={`py-2 px-4 rounded-full ring-2 hover:bg-opacity-75 ${goodButtonClass}`}
            disabled={buttonDisabledGood}
        >
            ✔
        </button>
    </div>
</Card>
