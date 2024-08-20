<script lang="ts">
    import { signUp, logIn } from "../../lib/auth";
    export let additionalClasses = "";
    let email = "";
    let password = "";
    let errorMessage = "";
    let isLogin = true;

    async function handleSubmit() {
        if (isLogin) {
            const { session, error } = await logIn(email, password);
            if (error) {
                errorMessage = error.message;
            } else {
                console.log("User logged in:", session);
            }
        } else {
            const { user, error } = await signUp(email, password);
            if (error) {
                errorMessage = error.message;
            } else {
                console.log("User signed up:", user);
            }
        }
    }

    function toggleMode() {
        isLogin = !isLogin;
        errorMessage = "";
    }
</script>

<div
    class={`flex flex-col items-center space-y-4 bg-white p-4 rounded-md shadow-md ${additionalClasses}`}
>
    <h2 class="text-xl font-semibold mb-4 text-center">
        {isLogin ? "Log In" : "Sign Up"}
    </h2>
    <form
        on:submit|preventDefault={handleSubmit}
        class="flex flex-col space-y-2 w-full"
    >
        <input
            type="email"
            bind:value={email}
            placeholder="Email"
            class="p-2 border border-gray-300 rounded-md text-sm w-full"
        />
        <input
            type="password"
            bind:value={password}
            placeholder="Password"
            class="p-2 border border-gray-300 rounded-md text-sm w-full"
        />
        <button
            type="submit"
            class="py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm w-full"
        >
            {isLogin ? "Log In" : "Sign Up"}
        </button>
        {#if errorMessage}
            <p class="text-red-500 text-sm text-center">{errorMessage}</p>
        {/if}
        <button
            type="button"
            on:click={toggleMode}
            class="text-blue-500 text-sm hover:underline w-full text-center"
        >
            {isLogin
                ? "Need an account? Sign Up"
                : "Already have an account? Log In"}
        </button>
    </form>
</div>
