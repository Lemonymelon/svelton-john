<script lang="ts">
    import VoteButton from "./VoteButton.svelte";
    import Card from "./Card.svelte";

    export let responseText: string;
    export let isGoodDisabled: boolean = false;
    export let isBadDisabled: boolean = false;
    export let onGoodClick: () => void;
    export let onBadClick: () => void;

    const highlightClass = "";
</script>

<Card {highlightClass}>
    <p>{responseText}</p>
    <div class="flex justify-center mt-2 space-x-4">
        <VoteButton
            isGood={false}
            onClick={onBadClick}
            isDisabled={isBadDisabled}
        />
        <VoteButton
            isGood={true}
            onClick={onGoodClick}
            isDisabled={isGoodDisabled}
        />
    </div>
</Card>
