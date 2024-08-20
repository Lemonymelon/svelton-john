<script lang="ts">
    import { signUp, logIn } from "../../lib/auth";

    export let layoutVariant: "row" | "column" = "column";
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
    class={`flex ${layoutVariant === "row" ? "flex-row gap-6" : "flex-col gap-4"} ${additionalClasses} border p-4 rounded-lg shadow-md bg-white`}
>
    <h2 class="text-xl font-bold mb-4">
        {isLogin ? "Log In" : "Sign Up"}
    </h2>

    <input
        type="email"
        placeholder="Email"
        bind:value={email}
        class="border p-2 mb-4 rounded w-full"
    />
    <input
        type="password"
        placeholder="Password"
        bind:value={password}
        class="border p-2 mb-4 rounded w-full"
    />

    {#if errorMessage}
        <div class="text-red-500 mb-4">
            {errorMessage}
        </div>
    {/if}

    <button
        on:click={handleSubmit}
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
    >
        {isLogin ? "Log In" : "Sign Up"}
    </button>

    <button
        on:click={toggleMode}
        class="mt-4 text-blue-500 hover:underline w-full"
    >
        {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Log In"}
    </button>
</div>
