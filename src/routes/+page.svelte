<script lang="ts">
    import "../app.css";
    import ResponseCard from "./components/ResponseCard.svelte";

    let prompt: string = "";
    let response: string = "";
    let error: string = "";
    let goodResponses: { text: string }[] = [];
    let badResponses: { text: string }[] = [];
    let lastQuestion: string = "";
    let isLoading: boolean = false;
    let sidebarOpen: boolean = false;
    let showFullQuestion: boolean = false;
    const characterLimit: number = 30;
    let currentImage: string = "/8bit-elton.jpeg";
    let typingInterval: number | undefined;
    let animationInterval: number | undefined;
    let selectedResponse: string | null = null;

    async function askQuestion() {
        if (prompt !== lastQuestion) {
            lastQuestion = prompt;
            goodResponses = [];
            badResponses = [];
            showFullQuestion = false;
        }

        isLoading = true;

        try {
            const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, goodResponses, badResponses }),
            });

            if (res.ok) {
                const data = await res.json();
                const newResponse = data.response;

                response = "";
                selectedResponse = null;
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

    function rateResponse(isGood: boolean) {
        if (isGood) {
            if (!goodResponses.some((r) => r.text === response)) {
                if (response) {
                    badResponses = badResponses.filter(
                        (r) => r.text !== response,
                    );
                    goodResponses = [{ text: response }, ...goodResponses];
                }
            }
            selectedResponse = response;
        } else {
            if (!badResponses.some((r) => r.text === response)) {
                if (response) {
                    goodResponses = goodResponses.filter(
                        (r) => r.text !== response,
                    );
                    badResponses = [{ text: response }, ...badResponses];
                }
            }
            selectedResponse = response;
        }
    }

    function moveResponseToGood(index: number) {
        const movedResponse = badResponses[index];
        if (movedResponse) {
            if (!goodResponses.some((r) => r.text === movedResponse.text)) {
                goodResponses = [movedResponse, ...goodResponses];
                badResponses = badResponses.filter((_, i) => i !== index);
            }
        }
    }

    function moveResponseToBad(index: number) {
        const movedResponse = goodResponses[index];
        if (movedResponse) {
            if (!badResponses.some((r) => r.text === movedResponse.text)) {
                badResponses = [movedResponse, ...badResponses];
                goodResponses = goodResponses.filter((_, i) => i !== index);
            }
        }
    }

    function toggleSidebar() {
        sidebarOpen = !sidebarOpen;
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

        <div class="flex flex-col items-center mt-4">
            <img
                src={currentImage}
                alt="Elton John"
                class="w-40 h-40 rounded-full border border-gray-300"
            />
            {#if response}
                <ResponseCard
                    responseText={response}
                    isGoodDisabled={goodResponses.some(
                        (r) => r.text === response,
                    )}
                    isBadDisabled={badResponses.some(
                        (r) => r.text === response,
                    )}
                    onGoodClick={() => rateResponse(true)}
                    onBadClick={() => rateResponse(false)}
                />
            {/if}
        </div>

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
                <p class="font-semibold mb-2">Good Responses:</p>
                {#each goodResponses as { text }, index}
                    <ResponseCard
                        responseText={text}
                        isGoodDisabled={true}
                        isBadDisabled={badResponses.some(
                            (r) => r.text === text,
                        )}
                        onGoodClick={() => moveResponseToGood(index)}
                        onBadClick={() => moveResponseToBad(index)}
                    />
                {/each}

                <p class="font-semibold mt-4 mb-2">Bad Responses:</p>
                {#each badResponses as { text }, index}
                    <ResponseCard
                        responseText={text}
                        isGoodDisabled={goodResponses.some(
                            (r) => r.text === text,
                        )}
                        isBadDisabled={true}
                        onGoodClick={() => moveResponseToGood(index)}
                        onBadClick={() => moveResponseToBad(index)}
                    />
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
