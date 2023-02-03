<script lang="ts">
  import BulkValidator from "./BulkValidator.svelte";
  import SingleEditor from "./SingleEditor.svelte";
  import WordFinder from "./WordFinder.svelte";
  import { findPossibleWords, textToWords, verseToIds } from "./utils/common";
  import Logo from "./Logo.svelte";

  enum Tab {
    single,
    bulk,
    findWords,
  }

  let seed: string = "";
  let wordSuggestions: string = "";
  let chosenTab: Tab = Tab.single;
  let blinking = false;
  let pristine = false;

  $: seedIds = verseToIds(seed);
  $: suggestionList = textToWords(wordSuggestions);

  function setTab(value: Tab) {
    chosenTab = value;
  }

  function addToWords(value: string[]) {
    suggestionList = [...new Set([...suggestionList, ...value])];
    wordSuggestions = suggestionList.join(" ");
  }

  function unpristine() {
    pristine = false;
  }

  function blinkValidateTab() {
    blinking = true;
    setTimeout(function () {
      blinking = false;
    }, 300);
  }

  function cleanup() {
    wordSuggestions = findPossibleWords(seedIds, wordSuggestions).join(" ");
    pristine = true;
  }
</script>

<main>
  <header class="site-header">
    <Logo />
  </header>
  <div class="section text-center flex-col gap-md">
    <label class="flex-col gap-sm align-center">
      <h2>Seed</h2>
      <input
        class="w-420"
        type="text"
        bind:value={seed}
        on:input={unpristine}
        placeholder="First write your seed phrase here"
      />
    </label>
    <label class="flex-col gap-sm align-center">
      <h2>
        Word suggestions{suggestionList.length
          ? ` (${suggestionList.length})`
          : ""}
      </h2>
      <div class="w-420">
        <textarea
          class="w-full"
          bind:value={wordSuggestions}
          on:input={unpristine}
          rows="4"
          placeholder="For word suggestions, use Find words tool with any text source you like (or paste your word list here if you already have one)"
        />
        {#if wordSuggestions && !pristine}
          <div class="w-full text-right">
            <button class="button--text" on:click={cleanup}>clean up</button>
          </div>
        {/if}
      </div>
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
      class:tab--blink={blinking}
      on:click={() => setTab(Tab.bulk)}>Validate</button
    >
  </div>
  <div class="section">
    {#if chosenTab === Tab.single}
      <SingleEditor {seedIds} {suggestionList} blink={blinkValidateTab} />
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
  Tools for anagrammatic writing<br />
  Teemu T. Tuovinen 2021-23<br />
  <a
    href="https://github.com/ttuovinen/anagrammana"
    target="_blank"
    rel="noopener">git</a
  >
  |
  <a href="https://nokturno.fi" target="_blank" rel="noopener">nokturno.fi</a>
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
    padding: clamp(2rem, 8vw, 64px) 2em;
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
    transition: color 150ms ease-out;
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
  .tab--blink {
    color: hsl(90, 100%, 85%);
  }

  .site-footer {
    font-size: 0.9rem;
    text-align: center;
    margin: 0 2rem 2rem;
    color: white;
    line-height: 1.5;
  }
  .site-footer a {
    color: white;
  }
</style>
