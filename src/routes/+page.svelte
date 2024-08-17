<script lang="ts">
    let prompt: string = "";
    let response: string = "";
    let error: string = "";

    async function askQuestion() {
        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (res.ok) {
                const data = await res.json();
                response = data.response;
                error = "";
            } else {
                const data = await res.json();
                response = "";
                error = data.error || "An error occurred";
            }
        } catch (err) {
            response = "";
            error = "An error occurred";
        }
    }
</script>

<main class="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Ask the Language Model</h1>
    <textarea
        bind:value={prompt}
        placeholder="Type your question here..."
        class="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
    <button
        on:click={askQuestion}
        class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        Ask
    </button>

    {#if response}
        <div
            class="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md"
        >
            <h2 class="text-xl font-semibold mb-2">Response:</h2>
            <p>{response}</p>
        </div>
    {/if}

    {#if error}
        <div
            class="mt-4 p-4 border border-red-500 bg-red-100 text-red-700 rounded-lg shadow-md"
        >
            <h2 class="text-xl font-semibold mb-2">Error:</h2>
            <p>{error}</p>
        </div>
    {/if}
</main>
