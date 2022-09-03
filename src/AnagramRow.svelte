<script lang="ts">
  import type { AnagramData } from "./types/types";

  export let data: AnagramData;
</script>

<div class="anagram-row">
  <div class="anagram">{data.verse}</div>
  <ul>
    {#if data.missing.length > 0}
      <li>
        <span class="small-label">{"MISSING "}</span>
        <span class="c-wait mono-font">
          {data.missing.map((i) => i.charAt(0).toUpperCase()).join(" ")}</span
        >
      </li>
    {/if}
    {#if data.extra.length > 0}
      <li>
        <span class="small-label">{"EXTRA "}</span>
        <span class="c-stop mono-font">
          {data.extra.map((i) => i.charAt(0).toUpperCase()).join(" ")}
        </span>
      </li>
    {/if}
  </ul>
</div>

<style>
  .anagram {
    font-size: 1.1em;
  }
  .small-label {
    font-weight: bold;
    font-size: 0.8em;
    min-width: 5rem;
    display: inline-block;
  }
</style>
