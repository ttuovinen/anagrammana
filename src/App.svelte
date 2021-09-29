<script lang="ts">
  import BulkValidator from "./BulkValidator.svelte";
  import SingleEditor from "./SingleEditor.svelte";
  import { verseToIds } from "./utils/common";

  enum Tab {
    single,
    bulk,
  }

  let seed: string = "suostu rakentumaan tarinaksi";
  let chosenTab: Tab = Tab.single;

  $: seedIds = verseToIds(seed);

  function setTab(value: Tab) {
    chosenTab = value;
  }
</script>

<main>
  <div class="section text-center">
    <h4>Seed</h4>
    <label class="control-item">
      <input class="input-text" type="text" bind:value={seed} />
    </label>
  </div>
  <div class="tabs">
    <button
      class="tab"
      class:tab--active={chosenTab === Tab.single}
      on:click={() => setTab(Tab.single)}>Single</button
    >
    <button
      class="tab"
      class:tab--active={chosenTab === Tab.bulk}
      on:click={() => setTab(Tab.bulk)}>Bulk</button
    >
  </div>
  <div class="section">
    {#if chosenTab === Tab.single}
      <SingleEditor {seedIds} />
    {/if}
    {#if chosenTab === Tab.bulk}
      <BulkValidator {seedIds} />
    {/if}
  </div>
</main>

<style>
  main {
    margin: 0 auto;
    padding: 4rem 0;
    width: 800px;
    max-width: 95%;
  }
  .section {
    background: #fafafa;
    padding: 1.5em;
    box-shadow: 2px 3px 4px #0003;
  }
  .tabs {
    display: flex;
    border-top: 1px solid #666;
  }
  .tab {
    background: #ccc;
    flex-grow: 1;
    margin: 0;
    cursor: pointer;
    border-radius: 0;
  }
  .tab--active {
    background: #fafafa;
    border: none;
  }
  .input-text {
    width: 420px;
    max-width: 100%;
    font-family: "Courier New", Courier, monospace;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
