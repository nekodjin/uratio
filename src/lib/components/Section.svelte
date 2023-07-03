<script lang="ts">
    import { ratioSigFigs } from "$lib/globals";
    import { Polynomial } from "$lib/polynomial";
    import { fade, slide } from "svelte/transition";

    export let sectionCount: number;
    $: n = sectionCount;

    $: if (n < 2) throw new Error("section count must be at least 2");

    let p: Polynomial;

    $: p = (() => {
        let coeffs: number[] = [];

        coeffs.push(1);
        coeffs.push(-2);

        for (let i = 0; i < n - 1; ++i) {
            coeffs.push(0);
        }

        coeffs.push(1);

        return new Polynomial(...coeffs);
    })();

    let ratio: number;
    $: ratio = p.newton(2);
    $: console.log(`ratio: ${ratio}`);

    let sectionLengths: number[] = [];
    $: sectionLengths = (() => {
        console.log(sectionCount);
        const sections = new Array(sectionCount - 1);

        for (let i = 0; i < sections.length; ++i) {
            sections[i] = 1 / Math.pow(ratio, i + 1);
        }

        return sections;
    })();
    $: console.log(`sectionLengths: ${sectionLengths}`);

    let sectionEndpoints: number[] = [];
    $: sectionEndpoints = (() => {
        let lastEndpoint = 0;

        return sectionLengths.map((length) => {
            lastEndpoint += length;
            return lastEndpoint;
        });
    })();
</script>

<svg in:fade viewBox="0 0 100 10" class="w-[80vw] max-w-sm">
    <line x1="5" y1="5" x2="95" y2="5" />
    <line x1="5" y1="3" x2="5" y2="7" />
    <line x1="95" y1="3" x2="95" y2="7" />
    {#each sectionLengths as _, i}
        <line
            x1={sectionEndpoints[i] * 90 + 5}
            y1="3"
            x2={sectionEndpoints[i] * 90 + 5}
            y2="7"
        />
    {/each}
</svg>

<p in:fade class="text-right pr-[6vw] md:text-right md:pr-0 md:my-auto">
    &phi;<sub>{n}</sub> &thickapprox; {ratio.toFixed(ratioSigFigs)}
</p>

<style lang="postcss">
    svg {
        stroke: black;
        stroke-width: 0.6px;
    }

    @media (prefers-color-scheme: dark) {
        svg {
            stroke: white;
        }
    }
</style>
