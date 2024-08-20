<script lang="ts">
    import Login from "./Login.svelte";
    import { user } from "../../lib/authStore";
    import { logOut } from "../../lib/auth";

    let isLoggedIn = false;

    $: {
        user.subscribe((currentUser) => {
            isLoggedIn = !!currentUser;
        });
    }

    async function handleLogOut() {
        const { error } = await logOut();
        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            isLoggedIn = false;
        }
    }
</script>

<nav
    class="fixed top-0 left-0 w-full bg-gray-800 text-white p-2 flex items-center justify-between shadow-md z-50"
>
    <div>
        {#if isLoggedIn}
            <button
                type="button"
                class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                on:click={handleLogOut}
            >
                Log Out
            </button>
        {:else}
            <Login />
        {/if}
    </div>
</nav>

<div class="pt-12">
    <slot />
</div>
