import lgcodemap from "./lgcodemap.mjs";

const getLGCode = (prefname, cityname) => {
  const res = lgcodemap[cityname];
  if (!res) {
    // "ヶ"と "ケ" の表記ゆれ対応
    if (cityname.indexOf("ヶ") >= 0) { return getCityCode(prefname, cityname.replace("ヶ", "ケ")); }
    if (cityname.indexOf("ケ") >= 0) { return getCityCode(prefname, cityname.replace("ケ", "ヶ")); }
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
// console.log(getCityCode("東京都", "霞が関"));

const findCity = name => {
  const res = [];
  for (const n in lgcodemap) {
    if (n.indexOf(name) >= 0) {
      res.push(n);
    }
  }
  return res;
};

export { getLGCode, findCity };
