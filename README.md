# 地方公共団体コード ESモジュール

市区町村から地方公共団体コードを返すESモジュール(83KB) lgcode.mjs  

[![esmodules](https://taisukef.github.com/denolib/esmodulesbadge.svg)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)
[![deno](https://taisukef.github.com/denolib/denobadge.svg)](https://deno.land/)

## 使用例

```
import { getLGCode } from "https://code4sabae.github.io/lgcode/lgcode.mjs";

console.log(getLGCode("東京都", "新宿区"));
console.log(getLGCode("福井県", "鯖江市"));
```

## データ生成

統計LODからSPARQLでデータ取得し lgcodemap.mjs を生成する
```
$ deno run -A tools/make.mjs
```

## 出典

統計LOD  
https://data.e-stat.go.jp/lodw/  
