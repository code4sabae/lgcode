import { querySPARQL } from "./querySPARQL.mjs";

const ESTAT = "https://data.e-stat.go.jp/lod/sparql/alldata/query";

const labeljson = await querySPARQL(ESTAT, `PREFIX sacs: <http://data.e-stat.go.jp/lod/terms/sacs#>
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX ic: <http://imi.go.jp/ns/core/rdf#>

  select ?id ?label ?valid where {?id a sacs:StandardAreaCode ; ic:表記 ?label. optional {?id dcterms:valid ?valid.}}`
);
console.log(labeljson);
// Deno.writeTextFileSync("temp/sac_label.json", JSON.stringify(res));

const map = {};

// const labeljson = JSON.parse(Deno.readTextFileSync("temp/sac_label.json"))
labeljson.results.bindings.forEach(e => {
  const code = parseInt(e.id.value.substring("http://data.e-stat.go.jp/lod/sac/C".length).split("-")[0]);
  const name = e.label.value;
  const date = e.valid ? e.valid.value : "1800-01-01";
  const m = map[name];
  const val = [code, date];
  if (!m) {
    map[name] = [val];
  } else {
    const hit = m.find(a => Math.floor(a[0] / 1000) === Math.floor(code / 1000));
    if (hit) {
      if (new Date(date).getTime() > new Date(hit.date).getTime()) {
        hit.date = date;
      }
    } else {
      m.push(val);
    }
  }
});
console.log(map);
console.log(Object.entries(map).length);
console.log(JSON.stringify(Object.entries(map).filter(a => Array.isArray(a[1]) && a[1].length > 3), null, 2));
// 日付なしに
const map2 = Object.fromEntries(Object.entries(map).map(a => {
  const next = a[1].map(a2 => a2[0]);
  return [a[0], next.length == 1 ? next[0] : next];
}))
console.log(JSON.stringify(Object.entries(map2).filter(a => Array.isArray(a[1]) && a[1].length > 3), null, 2));

const makeMJS = function (name, json) {
  return `const ${name} = ${JSON.stringify(json)}\nexport default ${name};\n`
};

Deno.writeTextFileSync("../lgcodemap.mjs", makeMJS("lgcode", map2));
