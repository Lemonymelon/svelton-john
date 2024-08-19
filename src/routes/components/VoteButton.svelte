<script lang="ts">
    export let isGood: boolean;
    export let onClick: () => void;
    export let isDisabled: boolean = false;

    const text = isGood ? "✔" : "✘";
    const colorClass = isGood ? "text-green-500" : "text-red-500";
    const glowClass = isGood
        ? "ring-green-500 bg-green-100"
        : "ring-red-500 bg-red-100";
</script>

<button
    on:click={onClick}
    class="py-2 px-4 rounded-full {colorClass} {glowClass} ring-2 hover:bg-opacity-75"
    disabled={isDisabled}
>
    {text}
</button>
