import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { searchCities } from "../lgcode.mjs";

Deno.test("都市名検索（部分一致）", async () => {
  assertEquals(
    searchCities("池田町"),
    [["1644", "池田町"], ["18382", "池田町"], ["20481", "池田町"], ["21404", "池田町"]],
  );
});
Deno.test("都市名検索（現存しない）", async () => {
  assertEquals(
    searchCities("武生市"),
    [],
  );
});
Deno.test("都市名検索（部分一致）", async () => {
  assertEquals(
    searchCities("福"),
    [
      ["1332", "福島町"],
      ["7000", "福島県"],
      ["7201", "福島市"],
      ["13218", "福生市"],
      ["18000", "福井県"],
      ["18201", "福井市"],
      ["26201", "福知山市"],
      ["27103", "福島区"],
      ["28443", "福崎町"],
      ["34207", "福山市"],
      ["40000", "福岡県"],
      ["40130", "福岡市"],
      ["40224", "福津市"],
      ["40610", "福智町"],
    ],
  );
});
