import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { getLGCode } from "../lgcode.mjs";

Deno.test("住所から公共団体コード（一件）", async () => {
  assertEquals(
    getLGCode("渡名喜村"),
    47356,
  );
});
Deno.test("住所から公共団体コード（県）", async () => {
  assertEquals(
    getLGCode("福井県"),
    18000,
  );
});
Deno.test("住所から公共団体コード（存在しない）", async () => {
  assertEquals(
    getLGCode("武生市"),
    null,
  );
});
Deno.test("住所から公共団体コード（一意に定まらない）", async () => {
  assertEquals(
    getLGCode("神奈川県", "南区"),
    [14105, 14153],
  );
});
Deno.test("住所から公共団体コード（一意に定まる1）", async () => {
  assertEquals(
    getLGCode("横浜市", "南区"),
    14105,
  );
});
Deno.test("住所から公共団体コード（一意に定まらない）", async () => {
  assertEquals(
    getLGCode("北海道", "泊村"),
    [1403, 1696],
  );
});
Deno.test("住所から公共団体コード（後志総合振興局泊村）", async () => {
  assertEquals(
    getLGCode("後志総合振興局", "泊村"),
    1403,
  );
});
Deno.test("住所から公共団体コード（根室振興局泊村）", async () => {
  assertEquals(
    getLGCode("根室振興局", "泊村"),
    1696,
  );
});
