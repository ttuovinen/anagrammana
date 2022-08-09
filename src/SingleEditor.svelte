<script lang="ts">
  import { checkLetters, hasNoExtraLetters, lengthSort } from "./utils/common";

  export let seedIds: string[] = [];
  export let wordList: string[] = [];

  let inputText: string = "";
  let missing: string[] = [];
  let extra: string[] = [];

  let wordSuggestions: string[] = [];

  $: {
    // Initialize missing letters array from seed ids
    missing = seedIds;
  }

  $: perfect = !missing.length && !extra.length && inputText.length;
  $: tooMuch = !!extra.length;

  function handleCheck() {
    [missing, extra] = checkLetters(seedIds, inputText);
    if (perfect || tooMuch) {
      wordSuggestions = [];
    }
    if (inputText.slice(-1) === " ") {
      wordSuggestions = wordList
        .filter((item) => hasNoExtraLetters(missing, item))
        .sort(lengthSort);
    } else {
      const lastWord = inputText.split(" ").pop();

      wordSuggestions =
        !lastWord && !extra.length
          ? []
          : wordList
              .filter((item) => item.startsWith(lastWord))
              .filter((item) =>
                hasNoExtraLetters(missing, item.substring(lastWord.length))
              )
              .sort(lengthSort);
    }
  }
</script>

<label class="text-center">
  <input
    class="input-text"
    class:input-text--perfect={perfect}
    class:input-text--toomuch={tooMuch}
    type="text"
    placeholder="Start composing your anagram"
    bind:value={inputText}
    on:input={handleCheck}
  />
</label>
<div class="l-row">
  {#each missing as item}
    <div class="l c-wait">
      {item.charAt(0)}
    </div>
  {/each}
</div>
<div class="l-row">
  {#each extra as item}
    <div class="l c-stop">{item.charAt(0) + " "}</div>
  {/each}
</div>
{#if wordSuggestions.length}
  <div class="l-row">
    {#each wordSuggestions as item}
      <div class="lowercase">
        {item}
      </div>
    {/each}
  </div>
{/if}
<div />

<style>
  .input-text {
    background: hsl(45, 100%, 80%);
    width: 420px;
    max-width: 100%;
    font-family: "Courier New", Courier, monospace;
  }
  .input-text--perfect {
    background: hsl(90, 100%, 85%);
    box-shadow: 0 0 2px 2px green;
  }
  .input-text--toomuch {
    background: hsl(0, 100%, 85%);
  }
  .l-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
    font-family: "Courier New", Courier, monospace;
    margin: 1rem 1rem 0;
    min-height: 2rem;
  }
</style>
