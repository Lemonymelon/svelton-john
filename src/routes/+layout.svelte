<script>
    import NavBar from "./components/Navbar.svelte";
    import "../app.css";
</script>

<main>
    <NavBar />
    <div class="pt-32">
        <slot />
    </div>
</main>
