<script lang="ts">
    import "../app.css";

    let prompt: string = "";
    let response: string = "";
    let error: string = "";
    let responses: { text: string; rank: number }[] = [];
    let lastQuestion: string = "";
    let isLoading: boolean = false;
    let sidebarOpen: boolean = false;
    let showFullQuestion: boolean = false;

    const characterLimit: number = 30;
    let currentImage: string = "/8bit-elton.jpeg";
    let typingInterval: number | undefined;
    let animationInterval: number | undefined;

    async function askQuestion() {
        if (prompt !== lastQuestion) {
            responses = [];
            lastQuestion = prompt;
            showFullQuestion = false;
        }

        isLoading = true;

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, responses }),
            });

            if (res.ok) {
                const data = await res.json();
                const newResponse = data.response;

                response = "";
                responses = [{ text: newResponse, rank: 0 }, ...responses];
                animateResponse(newResponse);
                error = "";
            } else {
                const data = await res.json();
                response = "";
                error = data.error || "An error occurred";
            }
        } catch (err) {
            response = "";
            error = "An error occurred";
        } finally {
            isLoading = false;
        }
    }

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
    }

    function moveUp(index: number) {
        if (index > 0) {
            [responses[index - 1], responses[index]] = [
                responses[index],
                responses[index - 1],
            ];
        }
    }

    function moveDown(index: number) {
        if (index < responses.length - 1) {
            [responses[index + 1], responses[index]] = [
                responses[index],
                responses[index + 1],
            ];
        }
    }

    function animateResponse(newResponse: string) {
        let charIndex = 0;
        const minInterval = 250;
        const maxInterval = 500;

        typingInterval = window.setInterval(() => {
            if (charIndex < newResponse.length) {
                response += newResponse[charIndex];
                charIndex++;
            } else {
                clearInterval(typingInterval);
                clearInterval(animationInterval);
                currentImage = "/8bit-elton.jpeg";
            }
        }, 50);

        animationInterval = window.setInterval(
            () => {
                currentImage =
                    currentImage === "/8bit-elton_partially-open-mouth.jpg"
                        ? "/8bit-elton_open-mouth.jpg"
                        : "/8bit-elton_partially-open-mouth.jpg";
            },
            Math.random() * (maxInterval - minInterval) + minInterval,
        );
    }

    const mostRecentResponse = responses.length > 0 ? responses[0].text : "";
    const highestRankedResponse =
        responses.length > 0
            ? responses.reduce((prev, curr) =>
                  prev.rank > curr.rank ? prev : curr,
              ).text
            : "";
</script>

<main
    class="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen relative"
>
    <div class="w-full max-w-md">
        <textarea
            bind:value={prompt}
            placeholder="Type your question here..."
            class="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            on:keydown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    askQuestion();
                }
            }}
        ></textarea>
        <button
            on:click={askQuestion}
            class="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
            disabled={isLoading || !prompt}
        >
            {#if isLoading}
                Loading...
            {:else}
                Ask
            {/if}
        </button>

        <div class="flex justify-center mt-4">
            <img
                src={currentImage}
                alt="Elton John"
                class="w-40 h-40 rounded-full border border-gray-300"
            />
        </div>

        {#if response}
            <div
                class="relative bg-white p-4 border border-gray-300 rounded-lg shadow-md max-w-xs mt-4"
            >
                <p><strong>Response:</strong> {response}</p>
            </div>
        {/if}

        {#if highestRankedResponse && highestRankedResponse !== response}
            <div
                class="relative bg-white p-4 border border-gray-300 rounded-lg shadow-md max-w-xs mt-4"
            >
                <p><strong>Most Popular:</strong> {highestRankedResponse}</p>
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
    </div>

    <div
        class={`fixed top-0 right-0 w-80 h-full bg-gray-200 border-l border-gray-300 overflow-y-auto transition-transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
    >
        <div class="p-4">
            <button on:click={toggleSidebar} class="text-xl font-bold">×</button
            >
            {#if lastQuestion}
                <div class="mb-4">
                    <p class="font-semibold mb-2">Current Question:</p>
                    <p>
                        {#if lastQuestion.length > characterLimit}
                            {#if showFullQuestion}
                                {lastQuestion}
                                <button
                                    on:click={() => (showFullQuestion = false)}
                                    class="text-blue-500 hover:underline"
                                    >See less</button
                                >
                            {:else}
                                {lastQuestion.slice(0, characterLimit)}...
                                <button
                                    on:click={() => (showFullQuestion = true)}
                                    class="text-blue-500 hover:underline"
                                    >See more</button
                                >
                            {/if}
                        {:else}
                            {lastQuestion}
                        {/if}
                    </p>
                </div>
            {/if}
            <div>
                {#each responses as { text }, index}
                    <div
                        class="bg-white p-4 border border-gray-300 rounded-lg shadow-md mb-2"
                    >
                        <p>{text}</p>
                        <div class="flex justify-between mt-2">
                            <button
                                on:click={() => moveUp(index)}
                                class="text-blue-500 hover:underline"
                                disabled={index === 0}>▲</button
                            >
                            <button
                                on:click={() => moveDown(index)}
                                class="text-blue-500 hover:underline"
                                disabled={index === responses.length - 1}
                                >▼</button
                            >
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <button
        on:click={toggleSidebar}
        class="fixed top-4 right-4 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
    >
        ☰
    </button>
</main>
