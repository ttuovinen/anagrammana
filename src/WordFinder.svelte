<script lang="ts">
  import { findPossibleWords } from "./utils/common";

  export let seedIds: string[] = [];
  export let addToWords: (value: string[]) => void;

  let inputText: string = "";
  let pristine = true;
  let possibleWords: string[] = [];

  function handleFindWords() {
    pristine = false;
    possibleWords = findPossibleWords(seedIds, inputText);
  }
</script>

<div class="flex-col gap-md">
  <div class="flex-col gap-sm align-start">
    <label>
      <textarea
        class="w-100"
        rows="8"
        bind:value={inputText}
        placeholder="Paste any text (try e.g. some book from the Gutenberg project)"
      />
    </label>
    <button on:click={handleFindWords}>Find possible words for anagrams</button>
  </div>
  {#if possibleWords.length || !pristine}
    <div class="flex-col gap-sm">
      <div class={possibleWords.length ? "italic c-go" : "italic c-wait"}>
        {possibleWords.length} possible words found
      </div>
      <div class="flex-row gap-sm">
        {#if possibleWords.length}
          <button
            on:click={() =>
              navigator.clipboard.writeText(possibleWords.join("\n"))}
            >Copy to clipboard</button
          >
          <button on:click={() => addToWords(possibleWords)}
            >Add to word suggestions</button
          >
        {/if}
      </div>
    </div>

    <div class="pre-wrap">
      {possibleWords.join("\n")}
    </div>
  {/if}
</div>
