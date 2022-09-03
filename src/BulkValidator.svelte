<script lang="ts">
  import AnagramRow from "./AnagramRow.svelte";
  import type { AnagramData } from "./types/types";
  import { checkLetters, nonAlphanumeric } from "./utils/common";

  export let seedIds: string[] = [];

  let inputText: string = "";
  let pristine = true;
  let anagrams: AnagramData[] = [];
  let duplicates: string[] = [];

  $: faultyAnagrams = anagrams.filter(
    (item) => item.missing.length || item.extra.length
  );

  function handleBulkCheck() {
    pristine = false;
    const data: AnagramData[] = [];
    const rows: string[] = inputText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);
    rows.forEach((row) => {
      if (row.replace(nonAlphanumeric, "").length < 1.5 * seedIds.length) {
        // Assume only one anagram candidate for shorter rows
        const justLetters = row.toLowerCase().replace(nonAlphanumeric, "");
        if (justLetters) {
          let [missing, extra] = checkLetters(seedIds, row);
          data.push({
            verse: row.trim(),
            justLetters,
            missing,
            extra,
          });
        }
      } else {
        // Separate anagram candidates in longer rows
        let index = 0;
        let letterCounter = 0;
        const anagramCandidates: string[] = [];
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          anagramCandidates[index] = (anagramCandidates[index] || "") + char;
          if (!char.toLowerCase().match(nonAlphanumeric)) {
            letterCounter++;
            if (letterCounter % seedIds.length === 0) {
              index++;
            }
          }
        }
        anagramCandidates
          .map((item) => {
            let [missing, extra] = checkLetters(seedIds, item);
            return {
              verse: item.trim(),
              justLetters: item.toLowerCase().replace(nonAlphanumeric, ""),
              missing,
              extra,
            };
          })
          .filter((item) => item.justLetters)
          .forEach((item) => {
            data.push(item);
          });
      }
    });
    anagrams = data;

    // Check for possible duplicates
    const buckets = {};

    data.forEach((item) => {
      buckets[item.justLetters] = [
        ...(buckets[item.justLetters] || []),
        item.verse,
      ];
    });
    duplicates = Object.values(buckets)
      .filter((items: string[]) => items.length > 1)
      .map((items: string[]) => items.join(" | "));
  }
</script>

<div class="flex-col gap-md">
  <div class="flex-col gap-sm align-start">
    <label>
      <textarea
        class="w-100"
        rows="8"
        bind:value={inputText}
        placeholder="Paste your anagrams for bulk validation"
      />
    </label>
    <button on:click={handleBulkCheck}>Validate</button>
  </div>
  {#if !pristine}
    {#if !seedIds.length}
      <div class={"italic c-wait"}>Add your seed phrase first</div>
    {:else if anagrams.length}
      <h2 class:c-go={!faultyAnagrams.length}>
        {`${anagrams.length - faultyAnagrams.length} / ${anagrams.length} OK`}
      </h2>
      {#if faultyAnagrams.length}
        <div class="flex-col gap-sm align-start">
          <h2 class="c-stop">
            {`${faultyAnagrams.length} faulty ${
              faultyAnagrams.length > 1 ? "anagrams" : "anagram"
            }`}
          </h2>
          <div class="flex-col gap-sm">
            {#each faultyAnagrams as item}
              <AnagramRow data={item} />
            {/each}
          </div>
        </div>
      {/if}
      {#if duplicates.length}
        <div class="flex-col gap-sm align-start">
          <h2 class="c-wait">Possible duplicates</h2>
          <div class="flex-col gap-md">
            <ol>
              {#each duplicates as item}
                <li class="mb-1 anagram">{item}</li>
              {/each}
            </ol>
          </div>
        </div>
      {/if}
    {/if}
  {/if}
</div>

<style>
  .anagram {
    font-size: 1.1em;
  }
</style>
