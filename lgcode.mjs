import lgcodemap from "./lgcodemap.mjs";

const getLGCode = (prefname, cityname) => {
  const res = lgcodemap[cityname];
  if (!res) {
    // "ヶ"と "ケ" の表記ゆれ対応
    if (cityname.indexOf("ヶ") >= 0) { return getLGCode(prefname, cityname.replace("ヶ", "ケ")); }
    if (cityname.indexOf("ケ") >= 0) { return getLGCode(prefname, cityname.replace("ケ", "ヶ")); }
    return null;
  }
  const pres = lgcodemap[prefname];
  if (!pres) { return null; }
  if (Array.isArray(res)) {
    return res.find(a => Math.floor(a / 1000) === Math.floor(pres / 1000));
  }
  if (Math.floor(res / 1000) === Math.floor(pres / 1000)) { return res; }

  return null;
};
// console.log(getLGCode("東京都", "霞が関"));

const findCity = name => {
  const res = [];
  for (const n in lgcodemap) {
    if (n.indexOf(name) >= 0) {
      res.push(n);
    }
  }
  return res;
};

const makeReverseMap = map => {
  const res = {};
  const list = Object.entries(map);
  for (let i = 1; i <= 47; i++) {
    const code = i * 1000;
    res[code] = [list.find(a => a[1] === code)[0]];
  }
  for (const [city, code] of list) {
    if (code % 1000 === 0) { continue }
    if (Array.isArray(code)) {
      for (const c of code) {
        res[c] = [res[Math.floor(c / 1000) * 1000][0], city];
      }
    } else {
      res[code] = [res[Math.floor(code / 1000) * 1000][0], city];
    }
  }
  return res;
}

let lgrevmap = null;

const fromLGCode = code => {
  if (!lgrevmap) {
    lgrevmap = makeReverseMap(lgcodemap);
  }
  return lgrevmap[code];
}

export { getLGCode, findCity, fromLGCode };
