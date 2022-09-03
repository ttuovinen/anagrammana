<script lang="ts">
  import BulkValidator from "./BulkValidator.svelte";
  import SingleEditor from "./SingleEditor.svelte";
  import WordFinder from "./WordFinder.svelte";
  import { textToWords, verseToIds } from "./utils/common";

  enum Tab {
    single,
    bulk,
    findWords,
  }

  let seed: string = "";
  let wordSuggestions: string = "";
  let chosenTab: Tab = Tab.single;

  $: seedIds = verseToIds(seed);
  $: suggestionList = textToWords(wordSuggestions);

  function setTab(value: Tab) {
    chosenTab = value;
  }

  function addToWords(value: string[]) {
    suggestionList = [...new Set([...suggestionList, ...value])];
    wordSuggestions = suggestionList.join(" ");
  }
</script>

<main>
  <header class="site-header">
    <h1>ANAGRAMMANA</h1>
  </header>
  <div class="section text-center flex-col gap-md">
    <label class="flex-col gap-sm align-center">
      <h2>Seed</h2>
      <input
        class="input-text"
        type="text"
        bind:value={seed}
        placeholder="First write your seed phrase"
      />
    </label>
    <label class="flex-col gap-sm align-center">
      <h2>
        Word suggestions{suggestionList.length
          ? ` (${suggestionList.length})`
          : ""}
      </h2>
      <textarea
        class="input-text"
        bind:value={wordSuggestions}
        rows="4"
        placeholder="Paste your word list if you'd like to have suggestions – or use Find  words tool with any text source"
      />
    </label>
  </div>
  <div class="tabs">
    <button
      class="tab"
      class:tab--active={chosenTab === Tab.single}
      on:click={() => setTab(Tab.single)}>Write</button
    >
    <button
      class="tab"
      class:tab--active={chosenTab === Tab.findWords}
      on:click={() => setTab(Tab.findWords)}>Find Words</button
    >
    <button
      class="tab"
      class:tab--active={chosenTab === Tab.bulk}
      on:click={() => setTab(Tab.bulk)}>Validate</button
    >
  </div>
  <div class="section">
    {#if chosenTab === Tab.single}
      <SingleEditor {seedIds} {suggestionList} />
    {/if}
    {#if chosenTab === Tab.bulk}
      <BulkValidator {seedIds} />
    {/if}
    {#if chosenTab === Tab.findWords}
      <WordFinder {seedIds} {addToWords} {suggestionList} />
    {/if}
  </div>
</main>
<footer class="site-footer">
  Tools for anagrammatic writing | Teemu T. Tuovinen 2021-22
</footer>

<style>
  main {
    margin: 0 0 2rem;
    background: var(--col-background);
  }
  @media (min-width: 600px) {
    main {
      margin: 4rem auto;
      box-shadow: 2px 4px 20px #0004;
      border-radius: 3px;
      width: 800px;
      max-width: 95%;
    }
  }

  .site-header {
    padding: 36px 9px;
    color: white;
    background: #306e6b;
    text-align: center;
  }
  .section {
    padding: 2em;
  }
  .tabs {
    display: flex;
    border-top: 1px solid var(--col-border);
  }
  .tab {
    background: #bdc8c8;
    color: #333;
    font-size: 1rem;
    width: calc(100% / 3);
    margin: 0;

    cursor: pointer;
    border-radius: 0;
  }
  .tab:not(:last-child) {
    border-right: 1px solid var(--col-border);
  }
  .tab--active {
    background: var(--col-background);
    color: black;
    border: none;
  }
  .input-text {
    width: 420px;
    max-width: 100%;
  }
  .site-footer {
    font-size: 0.9rem;
    text-align: center;
    margin: 0 2rem 2rem;
    color: white;
  }
</style>
