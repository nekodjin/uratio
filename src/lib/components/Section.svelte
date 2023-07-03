<script lang="ts">
    import { ratioSigFigs } from "$lib/globals";
    import { Polynomial } from "$lib/polynomial";

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

<svg viewBox="0 0 100 20" class="w-[80vw]">
    <line x1="5" y1="10" x2="95" y2="10" />
    <line x1="5" y1="7" x2="5" y2="13" />
    <line x1="95" y1="7" x2="95" y2="13" />
    {#each sectionLengths as _, i}
        <line
            x1={sectionEndpoints[i] * 90 + 5}
            y1="7"
            x2={sectionEndpoints[i] * 90 + 5}
            y2="13"
        />
    {/each}
</svg>

<p class="text-right pr-[6vw]">
    &phi;<sub>{n}</sub> = {ratio.toFixed(ratioSigFigs)}&hellip;
</p>

<style lang="postcss">
    svg {
        stroke: black;
        stroke-width: 0.4px;
    }
</style>
