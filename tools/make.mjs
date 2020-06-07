import { querySPARQL } from "./querySPARQL.mjs";

const ESTAT = "https://data.e-stat.go.jp/lod/sparql/alldata/query";

/*
https://data.e-stat.go.jp/lod/sparql/

PREFIX sacs: <http://data.e-stat.go.jp/lod/terms/sacs#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX ic: <http://imi.go.jp/ns/core/rdf#>

select ?id ?label ?valid where {
  ?id a sacs:StandardAreaCode;
    ic:表記 ?label.
  optional { ?id dcterms:valid ?valid. }
} limit 10

2	<http://data.e-stat.go.jp/lod/sac/C41321-20060320> "神埼町"@ja "2006-03-20"^^xsd:date

--
PREFIX sacs: <http://data.e-stat.go.jp/lod/terms/sacs#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX ic: <http://imi.go.jp/ns/core/rdf#>

select ?id ?label ?valid where {
  ?id a sacs:StandardAreaCode;
    ic:表記 "西区"@ja.
  optional { ?id dcterms:valid ?valid. }
} limit 10

1	<http://data.e-stat.go.jp/lod/sac/C27144-20060401>
2	<http://data.e-stat.go.jp/lod/sac/C14103-19700401>
3	<http://data.e-stat.go.jp/lod/sac/C34104-19800401>

-
select ?id ?label ?valid where {
  ?id a sacs:StandardAreaCode;
    ic:表記 "武生市"@ja.
  optional { ?id dcterms:valid ?valid. }
} limit 10

1	<http://data.e-stat.go.jp/lod/sac/C18203-19700401>"1979-03-01"^^xsd:date
2	<http://data.e-stat.go.jp/lod/sac/C18203-19790301>"1984-05-01"^^xsd:date
3	<http://data.e-stat.go.jp/lod/sac/C18203-20051001>"2005-10-01"^^xsd:date
4	<http://data.e-stat.go.jp/lod/sac/C18203-19840501>"2005-10-01"^^xsd:date

武生市 廃止日	2005年10月1日
dcterms:valid	 2005-10-01 (xsd:date) - 廃止日を意味する
1948年（昭和23年）4月1日 - 南条郡武生町・神山村が合併して発足。
dcterms:issued	1984-05-01 (xsd:date)　 - 誕生？
-
select ?id ?label ?valid where {
  ?id a sacs:StandardAreaCode;
    ic:表記 "鯖江市"@ja.
  filter not exists { ?id dcterms:valid ?valid. }
} limit 10

1	<http://data.e-stat.go.jp/lod/sac/C18203-19700401>"1979-03-01"^^xsd:date
2	<http://data.e-stat.go.jp/lod/sac/C18203-19790301>"1984-05-01"^^xsd:date
3	<http://data.e-stat.go.jp/lod/sac/C18203-20051001>"2005-10-01"^^xsd:date
4	<http://data.e-stat.go.jp/lod/sac/C18203-19840501>"2005-10-01"^^xsd:date
-

上位とラベルで全件取得
select ?id ?label ?parent {
  ?id a sacs:StandardAreaCode;
    ic:表記 ?label;
    ic:上位コード ?parent;
  filter not exists { ?id dcterms:valid ?valid. }
  filter not exists { ?parent dcterms:valid ?valid. }
} limit 10

ic:上位コード


select * {
  <http://data.e-stat.go.jp/lod/sac/C27144-20060401> ?p ?o.
}

select * {
  <http://data.e-stat.go.jp/lod/sac/C27144-20060401> <http://purl.org/dc/terms/isPartOf> ?city.
  ?city ic:表記 ?label.
}
-> 区の場合
city	label
1	<http://data.e-stat.go.jp/lod/sac/C27140-20060401> "堺市"@ja

select * {
  <http://data.e-stat.go.jp/lod/sac/C41321-20060320> <http://purl.org/dc/terms/isPartOf> ?city.
  ?city ic:表記 ?label.
}
1	<http://data.e-stat.go.jp/lod/sac/C41320-19700401> "神埼郡"@ja

select * {
  <http://data.e-stat.go.jp/lod/sac/C41320-19700401> <http://purl.org/dc/terms/isPartOf> ?city.
  ?city ic:表記 ?label.
}
1	<http://data.e-stat.go.jp/lod/sac/C41000-19700401> "佐賀県"@ja


全国、都道府県の上位コードとなっていてほしい
http://data.e-stat.go.jp/lod/page/sac/allArea

*/

const queryCities = async function (fn) {
  const labels = [];

  const prefs = (await querySPARQL(
    ESTAT,
    `PREFIX sacs: <http://data.e-stat.go.jp/lod/terms/sacs#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX ic: <http://imi.go.jp/ns/core/rdf#>

    select ?lgcode ?label ?parent {
      ?id a sacs:StandardAreaCode;
        ic:表記 ?label;
        dcterms:identifier ?lgcode.
      filter not exists { ?id dcterms:valid ?valid. }
      filter not exists { ?id ic:上位コード ?parent. }
    }
  `,
  )).results.bindings;
  // console.log(JSON.stringify(prefs, null, 2));
  /// Deno.exit(0);
  labels.push(prefs);

  const cities = (await querySPARQL(
    ESTAT,
    `PREFIX sacs: <http://data.e-stat.go.jp/lod/terms/sacs#>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX ic: <http://imi.go.jp/ns/core/rdf#>

    select ?lgcode ?label ?parentcode {
      ?id a sacs:StandardAreaCode;
        ic:表記 ?label;
        ic:上位コード ?parent;
        dcterms:identifier ?lgcode.
      ?parent dcterms:identifier ?parentcode.
      filter not exists { ?id dcterms:valid ?valid. }
      filter not exists { ?parent dcterms:valid ?valid. }
    }
  `,
  )).results.bindings;

  labels.push(cities);

  try {
    Deno.mkdirSync("temp");
  } catch (e) {
  }
  Deno.writeTextFileSync(fn, JSON.stringify(labels.flat(), null, 2));
  //Deno.writeTextFileSync(fn, JSON.stringify(labels.flat()));
};

const fn = "temp/sparql_results.json";
try {
  Deno.readTextFileSync(fn);
} catch (e) {
  await queryCities(fn);
}
const labels = JSON.parse(Deno.readTextFileSync(fn));
// const labels = Deno.readTextFileSync(fn);
console.log(labels);

// Deno.exit(0);

const map = {};

labels.forEach((e) => {
  const code = parseInt(e.lgcode.value);
  const name = e.label.value;
  const parent = parseInt(e.parentcode ? e.parentcode.value : (code ? 0 : -1));
  const m = map[code];
  if (!m) {
    map[code] = [parent, name];
  } else {
    throw new Error("double code", code, name, parent);
  }
});
console.log(map);
console.log(Object.entries(map).length);

// check
// 同じ名前チェック
const same = {};
for (const n in map) {
  const v = map[n];
  const [parent, name] = v;
  if (!same[name]) {
    same[name] = [[...v, n]];
  } else {
    same[name].push([...v, n]);
  }
}
// 重複リスト
const dup = Object.entries(same).sort((a, b) => b[1].length - a[1].length)
  .filter((a) => a[1].length > 1).map((a) => a[1]);
// 重複ランキング、同じ名前で同一県のものがあるか？
dup.forEach((a) => {
  console.log(a.length, a[0][1]);
  const list = a.map((a) => {
    return [map[Math.floor(a[0] / 1000) * 1000], map[a[0]], a[2]];
  });
  const pref = {};
  list.forEach((a) => {
    console.log(a);
    if (pref[a[0]]) {
      console.log("!!!!!!!!!!!!!!!!重複!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    pref[a[0]] = true;
  });
});
/*
13 南区
[ [ 0, "北海道" ], [ 1000, "札幌市" ], "1106" ]
[ [ 0, "埼玉県" ], [ 11000, "さいたま市" ], "11108" ]
[ [ 0, "神奈川県" ], [ 14000, "横浜市" ], "14105" ]
[ [ 0, "神奈川県" ], [ 14000, "相模原市" ], "14153" ]
!!!!!!!!!!!!!!!!重複!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
[ [ 0, "新潟県" ], [ 15000, "新潟市" ], "15106" ]
[ [ 0, "静岡県" ], [ 22000, "浜松市" ], "22134" ]
[ [ 0, "愛知県" ], [ 23000, "名古屋市" ], "23112" ]
[ [ 0, "京都府" ], [ 26000, "京都市" ], "26107" ]
[ [ 0, "大阪府" ], [ 27000, "堺市" ], "27145" ]
[ [ 0, "岡山県" ], [ 33000, "岡山市" ], "33104" ]
[ [ 0, "広島県" ], [ 34000, "広島市" ], "34103" ]
[ [ 0, "福岡県" ], [ 40000, "福岡市" ], "40134" ]
[ [ 0, "熊本県" ], [ 43000, "熊本市" ], "43104" ]

12 北区
[ [ 0, "北海道" ], [ 1000, "札幌市" ], "1102" ]
[ [ 0, "埼玉県" ], [ 11000, "さいたま市" ], "11102" ]
[ [ 0, "東京都" ], [ 13000, "特別区部" ], "13117" ]
[ [ 0, "新潟県" ], [ 15000, "新潟市" ], "15101" ]
[ [ 0, "静岡県" ], [ 22000, "浜松市" ], "22135" ]
[ [ 0, "愛知県" ], [ 23000, "名古屋市" ], "23103" ]
[ [ 0, "京都府" ], [ 26000, "京都市" ], "26101" ]
[ [ 0, "大阪府" ], [ 27000, "大阪市" ], "27127" ]
[ [ 0, "大阪府" ], [ 27000, "堺市" ], "27146" ]
!!!!!!!!!!!!!!!!重複!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
[ [ 0, "兵庫県" ], [ 28000, "神戸市" ], "28109" ]
[ [ 0, "岡山県" ], [ 33000, "岡山市" ], "33101" ]
[ [ 0, "熊本県" ], [ 43000, "熊本市" ], "43105" ]

12 西区
[ [ 0, "北海道" ], [ 1000, "札幌市" ], "1107" ]
[ [ 0, "埼玉県" ], [ 11000, "さいたま市" ], "11101" ]
[ [ 0, "神奈川県" ], [ 14000, "横浜市" ], "14103" ]
[ [ 0, "新潟県" ], [ 15000, "新潟市" ], "15107" ]
[ [ 0, "静岡県" ], [ 22000, "浜松市" ], "22133" ]
[ [ 0, "愛知県" ], [ 23000, "名古屋市" ], "23104" ]
[ [ 0, "大阪府" ], [ 27000, "大阪市" ], "27106" ]
[ [ 0, "大阪府" ], [ 27000, "堺市" ], "27144" ]
!!!!!!!!!!!!!!!!重複!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
[ [ 0, "兵庫県" ], [ 28000, "神戸市" ], "28111" ]
[ [ 0, "広島県" ], [ 34000, "広島市" ], "34104" ]
[ [ 0, "福岡県" ], [ 40000, "福岡市" ], "40135" ]
[ [ 0, "熊本県" ], [ 43000, "熊本市" ], "43103" ]

5 緑区
[ [ 0, "埼玉県" ], [ 11000, "さいたま市" ], "11109" ]
[ [ 0, "千葉県" ], [ 12000, "千葉市" ], "12105" ]
[ [ 0, "神奈川県" ], [ 14000, "横浜市" ], "14113" ]
[ [ 0, "神奈川県" ], [ 14000, "相模原市" ], "14151" ]
!!!!!!!!!!!!!!!!重複!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
[ [ 0, "愛知県" ], [ 23000, "名古屋市" ], "23114" ]

2 泊村
[ [ 0, "北海道" ], [ 1000, "後志総合振興局" ], "1403" ]
[ [ 0, "北海道" ], [ 1000, "根室振興局" ], "1696" ]
*/

const makeMJS = function (name, json) {
  return `const ${name} = ${JSON.stringify(json)}\nexport default ${name};\n`;
};

Deno.writeTextFileSync("../lgcodemap.mjs", makeMJS("lgcode", map));
