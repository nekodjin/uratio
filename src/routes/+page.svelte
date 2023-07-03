<script lang="ts">
    import { browser } from "$app/environment";
    import { slide } from "svelte/transition";

    import Section from "$lib/components/Section.svelte";

    let sections = [2];

    const addSection = () => {
        sections.push(sections[sections.length - 1] + 1);
        sections = sections;
    };
</script>

<svelte:head>
    <title>Uniform Ratios</title>
</svelte:head>

<div class="page-container">
    <header class="flex flex-row justify-center items-center w-full p-2">
        <h1 class="text-center text-2xl">Uniform Ratios</h1>
    </header>
    <div class="grow p-2 flex flex-col justify-center items-center gap-4">
        {#if browser}
            <main class="grid grid-cols-[auto]">
                {#each sections as section}
                    <Section sectionCount={section} />
                {/each}
            </main>
            <button
                on:click={addSection}
                class="px-2 py-1 bg-blue-500 rounded text-white"
                >Add Section</button
            >
        {:else}
            <noscript class="p-8 text-white bg-red-500 rounded-md text-3xl">
                This page requires JavaScript. Please enable JavaScript and
                reload the page.
            </noscript>
        {/if}
    </div>
    <footer class="p-2">
        <p>
            Made with love by
            <a
                href="https://nekodjin.org"
                class="text-blue-600 hover:underline focus-active:underline"
                >nekodjin</a
            >.
        </p>
    </footer>
</div>

<style lang="postcss">
    .page-container {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        width: 100%;
        min-height: 100vh;
    }

    @supports (min-height: 100dvh) {
        .page-container {
            min-height: 100dvh;
        }
    }
</style>
