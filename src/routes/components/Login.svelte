<script lang="ts">
    import { signUp, logIn } from "../../lib/auth";
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
    class="flex justify-center items-center p-4 bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto"
>
    <form
        on:submit|preventDefault={handleSubmit}
        class="flex items-center space-x-4 w-full"
    >
        <div class="flex flex-col space-y-2 w-2/5">
            <input
                type="email"
                bind:value={email}
                placeholder="Email"
                class="p-2 border border-gray-300 rounded-md text-sm w-full text-black placeholder-gray-500"
                required
            />
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                class="p-2 border border-gray-300 rounded-md text-sm w-full text-black placeholder-gray-500"
                required
            />
        </div>
        <div class="flex flex-col space-y-2 w-2/5">
            <button
                type="submit"
                class="py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm w-full"
            >
                {isLogin ? "Log In" : "Sign Up"}
            </button>
            {#if errorMessage}
                <p class="text-red-500 text-sm">{errorMessage}</p>
            {/if}
            <button
                type="button"
                on:click={toggleMode}
                class="text-blue-500 text-sm hover:underline w-full"
            >
                {isLogin
                    ? "Need an account? Sign Up"
                    : "Already have an account? Log In"}
            </button>
        </div>
    </form>
</div>
