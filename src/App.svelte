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
  let words: string = "";
  let chosenTab: Tab = Tab.single;

  $: seedIds = verseToIds(seed);
  $: wordList = textToWords(words);

  function setTab(value: Tab) {
    chosenTab = value;
  }

  function addToWords(value: string[]) {
    wordList = [...new Set([...wordList, ...value])];
    words = wordList.join(" ");
  }
</script>

<main>
  <div class="section text-center flex-col gap-md">
    <h1>ANAGRAMMANA</h1>
    <label class="flex-col gap-sm align-center">
      <h4>Seed</h4>
      <input
        class="input-text"
        type="text"
        bind:value={seed}
        placeholder="First write your seed phrase"
      />
    </label>
    <label class="flex-col gap-sm align-center">
      <h4>Word suggestions{wordList.length ? ` (${wordList.length})` : ""}</h4>
      <textarea
        class="input-text"
        bind:value={words}
        rows="4"
        placeholder="Paste your wordlist (if you'd like to have suggestions)"
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
      class:tab--active={chosenTab === Tab.bulk}
      on:click={() => setTab(Tab.bulk)}>Validate</button
    >
    <button
      class="tab"
      class:tab--active={chosenTab === Tab.findWords}
      on:click={() => setTab(Tab.findWords)}>Find Words</button
    >
  </div>
  <div class="section">
    {#if chosenTab === Tab.single}
      <SingleEditor {seedIds} {wordList} />
    {/if}
    {#if chosenTab === Tab.bulk}
      <BulkValidator {seedIds} />
    {/if}
    {#if chosenTab === Tab.findWords}
      <WordFinder {seedIds} {addToWords} />
    {/if}
  </div>
</main>
<footer class="site-footer">
  Tools for anagrammatic writing | Teemu T. Tuovinen 2021-22
</footer>

<style>
  main {
    margin: 2rem 0;
    background: #fafafa;
  }
  @media (min-width: 600px) {
    main {
      margin: 4rem auto;
      box-shadow: 2px 3px 4px #0003;
      border-radius: 3px;
      width: 800px;
      max-width: 95%;
    }
  }
  .section {
    padding: 1.5em;
  }
  .tabs {
    display: flex;
    border-top: 1px solid #aaa;
  }
  .tab {
    background: #ccc;
    font-size: 1rem;
    flex-grow: 1;
    margin: 0;
    cursor: pointer;
    border-radius: 0;
  }
  .tab:not(:last-child) {
    border-right: 1px solid #aaa;
  }
  .tab--active {
    background: #fafafa;
    border: none;
  }
  .input-text {
    width: 420px;
    max-width: 100%;
  }
  .site-footer {
    font-size: 14px;
    text-align: center;
    margin: 0 2rem 2rem;
    color: #fafafa;
  }
</style>
