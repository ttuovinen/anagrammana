<script lang="ts">
  import { findPossibleWords } from "./utils/common";

  export let seedIds: string[] = [];

  let inputText: string = "";
  let pristine = true;
  let possibleWords: string[] = [];

  function handleFindWords() {
    pristine = false;
    possibleWords = findPossibleWords(seedIds, inputText);
  }
</script>

<div class="flex-col gap-1">
  <div>
    <label>
      <textarea
        class="w-100"
        rows="8"
        bind:value={inputText}
        placeholder="Paste any text here (try eg. some book from the Gutenberg project)"
      />
    </label>
    <button on:click={handleFindWords}>Find possible anagram words</button>
  </div>
  {#if possibleWords.length || !pristine}
    <div class={possibleWords.length ? "italic c-go" : "italic c-wait"}>
      {possibleWords.length} possible anagram words found
    </div>
    <div style="white-space: pre-wrap">
      {possibleWords.join("\n")}
    </div>
  {/if}
</div>
