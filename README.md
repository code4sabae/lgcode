# 地方公共団体コード ESモジュール

市区町村から地方公共団体コードを返すESモジュール(80KB) lgcode.mjs  

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

# API

## getLGCode(cityname1, cityname2 = null, cityname3 = null)

都市名から地方公共団体コードを返す

## fromLGCode(code)

地方公共団体コードから都市名を返す

## getCityChildren(city)

地方公表団体コードまたは一意に定まる都市名から下位公共団体一覧を返す（郡を含まない、北海道の振興局は含む）

## getCityChildrenWithDistinct(city)

地方公表団体コードまたは一意に定まる都市名から下位公共団体一覧を返す（郡、北海道の振興局共に含む）

## getCityParent(city)

地方公表団体コードまたは一意に定まる都市名から上位公共団体一覧を返す（都道府県の場合は0、全国）

## searchCities(name)

部分一致する地方公表団体コードと都市名を配列で返す

## テスト

```
$ deno test *.mjs
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
