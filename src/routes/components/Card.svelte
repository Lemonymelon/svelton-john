<script lang="ts">
    export let highlightClass: string = "";
    export let classes: string = "";
</script>

<div class={`p-4 border rounded-lg ${highlightClass} ${classes}`}>
    <slot></slot>
</div>
