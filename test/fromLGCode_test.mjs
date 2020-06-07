import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { fromLGCode } from "../lgcode.mjs";

Deno.test("公共団体コードから住所（数値）", async () => {
  assertEquals(
    fromLGCode(47356),
    ["沖縄県", "島尻郡", "渡名喜村"],
  );
});
Deno.test("公共団体コードから住所（文字列）", async () => {
  assertEquals(
    fromLGCode("18207"),
    ["福井県", "鯖江市"],
  );
});
Deno.test("公共段階コードから住所（存在しないコードはnull）", async () => {
  assertEquals(
    fromLGCode("99999"),
    null,
  );
});
Deno.test("0はエラー", async () => {
  assertEquals(
    fromLGCode(0),
    null,
  );
});
