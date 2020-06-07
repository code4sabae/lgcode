import {
  getLGCode,
  fromLGCode,
} from "https://code4sabae.github.io/lgcode/lgcode.mjs";
// import { getLGCode, fromLGCode } from "./lgcode.mjs";

console.log(getLGCode("東京都", "新宿区"));
console.log(getLGCode("福井県", "鯖江市"));
console.log(getLGCode("北海道", "札幌市"));

console.log(fromLGCode(13104));
console.log(fromLGCode(18207));
