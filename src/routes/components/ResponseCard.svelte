<script lang="ts">
    import Card from "./Card.svelte";
    import { Icon, Check, XMark } from "svelte-hero-icons";

    export let responseText: string;
    export let isGood: boolean | null = null;
    export let onGoodClick: () => void;
    export let onBadClick: () => void;
    export let buttonsDisabled: boolean = false;

    let backgroundColor = "bg-white";
    let goodButtonClass = "";
    let badButtonClass = "";

    $: {
        backgroundColor =
            isGood === true
                ? "bg-green-100"
                : isGood === false
                  ? "bg-red-100"
                  : "bg-white";

        const selectedGoodButtonClass = "text-green-500 bg-green-100";
        const selectedBadButtonClass = "text-red-500 bg-red-100";
        const unselectedGoodButtonClass =
            "text-green-500 ring-green-500 ring-2";
        const unselectedBadButtonClass = "text-red-500 ring-red-500 ring-2";

        goodButtonClass =
            isGood === true
                ? selectedGoodButtonClass
                : `bg-white ${unselectedGoodButtonClass}`;
        badButtonClass =
            isGood === false
                ? selectedBadButtonClass
                : `bg-white ${unselectedBadButtonClass}`;
    }
</script>

<Card extraClass={backgroundColor}>
    <p>{responseText}</p>
    <div class="flex justify-center mt-2 space-x-4">
        <button
            on:click={onBadClick}
            class={`py-2 px-4 rounded-full hover:bg-opacity-75 ${badButtonClass}`}
            disabled={buttonsDisabled}
        >
            <Icon src={XMark} class={`w-6 h-6`} size="24" />
        </button>
        <button
            on:click={onGoodClick}
            class={`py-2 px-4 rounded-full hover:bg-opacity-75 ${goodButtonClass}`}
            disabled={buttonsDisabled}
        >
            <Icon src={Check} class={`w-6 h-6`} size="24" />
        </button>
    </div>
</Card>
