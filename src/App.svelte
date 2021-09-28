<script lang="ts">
  import { onMount } from "svelte";
  import { verseToIds } from "./utils/common";

  const SEED = "suostu rakentumaan tarinaksi";

  let inputText: string = "";
  let seedIds: string[] = [];
  let ins: string[] = [];
  let outs: string[] = [];

  $: perfect = seedIds.length && seedIds.length === ins.length && !outs.length;
  $: tooMuch = !!outs.length;

  function checkLetters() {
    const inputIds = verseToIds(inputText);
    const newIns = [];
    const newOuts = [];
    inputIds.forEach((item) => {
      if (seedIds.includes(item)) {
        newIns.push(item);
      } else {
        newOuts.push(item);
      }
    });
    ins = newIns;
    outs = newOuts;
  }

  onMount(() => {
    seedIds = verseToIds(SEED);
  });
</script>

<main>
  <label class="control-item">
    <input
      class="text-input"
      class:text-input--perfect={perfect}
      class:text-input--toomuch={tooMuch}
      type="text"
      bind:value={inputText}
      on:input={() => checkLetters()}
    />
  </label>
  <div class="l-row">
    {#each seedIds as item}
      <div class={ins.includes(item) ? "l jes" : "l nou"}>{item.charAt(0)}</div>
    {/each}
  </div>
  <div class="l-row">
    {#each outs as item}
      <div class="l extra">{item.charAt(0) + " "}</div>
    {/each}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 4em 1em;
    margin: 4rem auto;
    background: #fafafa;
    width: 660px;
    max-width: 95%;
    border-radius: 3px;
    box-shadow: 2px 3px 4px #0003;
  }
  .text-input {
    background: hsl(45, 100%, 80%);
    width: 420px;
    max-width: 100%;
    font-family: "Courier New", Courier, monospace;
  }
  .text-input--perfect {
    background: hsl(90, 100%, 85%);
    box-shadow: 0 0 2px 2px green;
  }
  .text-input--toomuch {
    background: hsl(0, 100%, 85%);
  }
  .l-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
    font-family: "Courier New", Courier, monospace;
    margin: 1rem;
    min-height: 2rem;
  }
  .jes {
    color: hsl(90, 100%, 50%);
  }
  .nou {
    color: hsl(45, 100%, 15%);
  }
  .extra {
    color: hsl(0, 100%, 40%);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
