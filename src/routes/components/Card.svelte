<script lang="ts">
    export let extraClass: string = "";
</script>

<div class={`border p-4 rounded-lg shadow-md ${extraClass}`}>
    <slot></slot>
</div>
