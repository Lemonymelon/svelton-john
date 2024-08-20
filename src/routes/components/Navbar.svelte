<script lang="ts">
    import Login from "./Login.svelte";
    let isLoggedIn = false;
</script>

<nav
    class="fixed top-0 left-0 w-full bg-gray-800 text-white p-2 flex shadow-md z-50"
>
    {#if isLoggedIn}
        <button
            type="button"
            class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            on:click={() => (isLoggedIn = false)}
        >
            Log Out
        </button>
    {:else}
        <Login />
    {/if}
</nav>

<div class="pt-12">
    <slot />
</div>
