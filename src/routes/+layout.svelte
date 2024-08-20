<script>
    import NavBar from "./components/Navbar.svelte";
    import "../app.css";
</script>

<main class="flex flex-col">
    <NavBar />
    <slot />
</main>
