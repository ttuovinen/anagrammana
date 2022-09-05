<script lang="ts">
  import { difference, findPossibleWords } from "./utils/common";
  import { findInput } from "./stores";

  export let seedIds: string[] = [];
  export let addToWords: (value: string[]) => void;
  export let suggestionList: string[] = [];

  let pristine = true;
  let possibleWords: string[] = [];
  let snack: string | null = null;

  $: newWords = difference(possibleWords, suggestionList);

  function showSnack(text: string) {
    snack = text;
    setTimeout(() => {
      snack = null;
    }, 3000);
  }

  function handleFindWords() {
    pristine = false;
    possibleWords = findPossibleWords(seedIds, $findInput);
  }

  function copyToClipboard(words) {
    navigator.clipboard.writeText(words.join("\n"));
    showSnack(`${words.length} words copied to clipboard!`);
  }
  function handleAddToSuggestions() {
    addToWords(newWords);
    showSnack(`${newWords.length} words added to suggestions!`);
  }
</script>

<div class="flex-col gap-md">
  <div class="flex-col gap-sm align-start">
    <label>
      <textarea
        class="w-100"
        rows="8"
        bind:value={$findInput}
        placeholder="Paste any text (try e.g. some book from the Gutenberg project)"
      />
    </label>
    <div class="flex-row justify-between w-100">
      <button on:click={handleFindWords}
        >Find possible words for anagrams</button
      >
      {#if $findInput.length}
        <button class="button--text" on:click={() => findInput.set("")}
          >clear</button
        >
      {/if}
    </div>
  </div>
  {#if !pristine}
    <div class="flex-col gap-sm">
      <div class={possibleWords.length ? "italic c-go" : "italic c-wait"}>
        {#if !seedIds.length}
          Add your seed phrase first
        {:else}
          {possibleWords.length} possible words found (of which {newWords.length}
          new)
        {/if}
      </div>
      <div class="flex-row gap-sm">
        {#if possibleWords.length}
          <button
            class="button--outlined"
            disabled={!newWords.length}
            on:click={handleAddToSuggestions}>Add to word suggestions</button
          >
          <button
            class="button--outlined"
            on:click={() => copyToClipboard(possibleWords)}
          >
            Copy all words to clipboard
          </button>
          <button
            class="button--outlined"
            disabled={!newWords.length}
            on:click={() => copyToClipboard(newWords)}
          >
            Copy new words to clipboard
          </button>
        {/if}
      </div>
    </div>

    <div class="pre-wrap mono-font">
      {possibleWords.join("\n")}
    </div>
  {/if}

  {#if snack}
    <div class="snack" aria-live="assertive">
      {snack}
    </div>
  {/if}
</div>

<style>
  .snack {
    position: fixed;
    top: 20px;
    right: 20px;
    border-radius: 3px;
    padding: 1rem 2rem;
    box-shadow: 1px 1px 3px #0003;
    background: hsl(45, 100%, 80%);
    color: black;
    opacity: 0;
    animation: fade 2.5s linear;
  }
  @keyframes fade {
    0%,
    100% {
      opacity: 0;
    }
    20%,
    80% {
      opacity: 1;
    }
  }
</style>
