# 地方公共団体コード ESモジュール

市区町村から地方公共団体コードを返すESモジュール(83KB) lgcode.mjs  

[![esmodules](https://taisukef.github.com/denolib/esmodulesbadge.svg)](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)
[![deno](https://taisukef.github.com/denolib/denobadge.svg)](https://deno.land/)

## 使用例

```
import { getLGCode, fromLGCode } from "https://code4sabae.github.io/lgcode/lgcode.mjs";

console.log(getLGCode("東京都", "新宿区")); // 13104
console.log(getLGCode("福井県", "鯖江市")); // 18207

console.log(fromLGCode(13104)); // [ "東京都", "新宿区" ]
console.log(fromLGCode(13104)); // [ "福井県", "鯖江市" ]
```

## データ生成

統計LODからSPARQLでデータ取得し lgcodemap.mjs を生成する
```
$ deno run -A tools/make.mjs
```

## 出典

統計LOD  
https://data.e-stat.go.jp/lodw/  

## 関連記事

政府データを使って住所から緯度経度へ、丁目レベルのジオコーディング！ 住所変換コンポーネント移植の準備  
https://fukuno.jig.jp/2867  

日本政府発のJavaScriptライブラリを勝手にweb標準化するプロジェクト、全角-半角統一コンポーネントのESモジュール/Deno対応版公開  
https://fukuno.jig.jp/2865  
