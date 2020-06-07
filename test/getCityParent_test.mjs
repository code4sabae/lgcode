import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { getCityParent } from "../lgcode.mjs";

Deno.test("公共団体コードから上位地方公共団体を得る（数値）", async () => {
  assertEquals(
    getCityParent(47340),
    [47000, "沖縄県"],
  );
});
Deno.test("公共団体コードから上位地方公共団体を得る（文字列）", async () => {
  assertEquals(
    getCityParent("47340"),
    [47000, "沖縄県"],
  );
});
Deno.test("上位地方公共団体を得る（名前）", async () => {
  assertEquals(
    getCityParent("渡名喜村"),
    [47340, "島尻郡"],
  );
});
Deno.test("上位地方公共団体を得る", async () => {
  assertEquals(
    getCityParent("渡名喜村"),
    [47340, "島尻郡"],
  );
});
Deno.test("複数該当するものは名前では不可", async () => {
  assertEquals(
    getCityParent("西区"),
    null,
  );
});
Deno.test("都道府県名を得る", async () => {
  assertEquals(
    getCityParent("鯖江市"),
    [18000, "福井県"],
  );
});
Deno.test("全国を得る", async () => {
  assertEquals(
    getCityParent("福井県"),
    [0, "全国"],
  );
});
