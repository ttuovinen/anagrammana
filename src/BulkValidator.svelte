<script lang="ts">
  import AnagramRow from "./AnagramRow.svelte";
  import { checkLetters, specialChars } from "./utils/common";

  export let seedIds: string[] = [];

  let inputText: string = "";
  let faultyRows: string[] = [];
  let anagrams: AnagramData[] = [];
  let duplicates: string[] = [];

  $: faultyAnagrams = anagrams.filter(
    (item) => item.missing.length || item.extra.length
  );

  function handleBulkCheck() {
    const data = [];
    const rows = inputText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);
    rows.forEach((row) => {
      const stripped = row.toLowerCase().replace(specialChars, "");
      if (
        stripped.length > 1.5 * seedIds.length &&
        stripped.length % seedIds.length
      ) {
        faultyRows.push(row);
      } else {
        // const foundAnagrams = row.match(new RegExp(`.{1,${seedIds.length}}`, "g"));
        const foundAnagrams = [row]; // TMP
        foundAnagrams
          .map((item) => {
            let [missing, extra] = checkLetters(seedIds, item);
            return {
              verse: item,
              justLetters: item.toLowerCase().replace(specialChars, ""),
              missing,
              extra,
            };
          })
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

<div class="flex-col gap-1">
  <div>
    <div class="text-center">
      <i>Works only with one anagram per line (for now)</i>
    </div>
    <label>
      <textarea class="w-100" rows="8" bind:value={inputText} />
    </label>
    <button on:click={handleBulkCheck}>Check</button>
  </div>
  {#if anagrams.length}
    <h3>
      {`${anagrams.length - faultyAnagrams.length} / ${anagrams.length} OK`}
    </h3>
    {#if faultyAnagrams.length}
      <h3 class="c-stop">{`${faultyAnagrams.length} faulty anagrams`}</h3>
      <div class="flex-col gap-1">
        {#each faultyAnagrams as item}
          <AnagramRow data={item} />
        {/each}
      </div>
    {/if}
    {#if duplicates.length}
      <h3 class="c-wait">Possible duplicates</h3>
      <div class="flex-col gap-1">
        <ul>
          {#each duplicates as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    {/if}
  {/if}
</div>
