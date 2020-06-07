import lgcodemap from "./lgcodemap.mjs";

const fromLGCode = (code) => {
  let ncode = parseInt(code);
  if (isNaN(ncode) || !ncode) return null;
  const res = [];
  for (;;) {
    const l = lgcodemap[ncode];
    if (!l) return null;
    res.unshift(l[1]);
    ncode = l[0];
    if (!ncode) break;
  }
  return res;
};

let lgrevmap = null; // [code, name]

const queryMap = (cityname) => {
  if (!lgrevmap) {
    lgrevmap = makeReverseMap(lgcodemap);
  }
  let res = lgrevmap[cityname];
  if (res) return res;
  if (cityname.indexOf("ヶ") >= 0) return lgrevmap[cityname.replace("ヶ", "ケ")];
  if (cityname.indexOf("ケ") >= 0) return lgrevmap[cityname.replace("ケ", "ヶ")];
  return null;
};

const makeCodeResult = (res) => {
  if (!res) return null;
  if (res.length === 1) return res[0][0];
  return res.map((a) => a[0]);
};
const getLGCodeFrom2 = (cityname1, cityname2) => {
  const l = queryMap(cityname2);
  if (!l) return null;
  const l2 = queryMap(cityname1);
  if (l2.length !== 1) return null;
  const pcode = parseInt(l2[0][0]);
  const l3 = l.filter((a) => {
    if (a[1] == pcode) return true;
    return lgcodemap[a[1]][0] == pcode;
  });
  return makeCodeResult(l3);
};

const getLGCode = (cityname1, cityname2 = null, cityname3 = null) => {
  if (!cityname1) { // 0 params
    return null;
  }
  if (!cityname2) { // 1 param
    return makeCodeResult(queryMap(cityname1));
  }
  if (!cityname3) { // 2 params
    return getLGCodeFrom2(cityname1, cityname2);
  }
  // 3params (ignore cityname1)
  return getLGCodeFrom2(cityname2, cityname3);
};

const makeReverseMap = (map) => {
  const res = {};
  for (const code in lgcodemap) {
    const [parent, name] = lgcodemap[code];
    let a = res[name];
    if (!a) {
      a = res[name] = [];
    }
    a.push([parseInt(code), parent]);
  }
  return res;
};

const queryCode = (nameorcode) => {
  let code = parseInt(nameorcode);
  if (isNaN(code)) {
    code = getLGCode(nameorcode);
    if (!code || Array.isArray(code)) return null;
  }
  return [...lgcodemap[code], code];
};

const getCityChildrenWithDistrict = (nameorcode) => {
  const l = queryCode(nameorcode);
  if (!l) return null;
  const code = l[2];
  const res = [];
  for (const c in lgcodemap) {
    const d = lgcodemap[c];
    if (d[0] == code) {
      const name = d[1];
      res.push([parseInt(c), name]);
    }
  }
  return res;
};

const getCityChildren = (nameorcode) => {
  const code = getCityChildrenWithDistrict(nameorcode);
  if (!code) return null;
  const res = [];
  code.forEach((c) => {
    if (c[1].endsWith("郡")) {
      const district = getCityChildrenWithDistrict(c[0]);
      district.forEach((d) => res.push(d));
    } else {
      res.push(c);
    }
  });
  return res;
};

const getCityParent = (nameorcode) => {
  const l = queryCode(nameorcode);
  if (!l) return null;
  return [l[0], lgcodemap[l[0]][1]];
};

const searchCities = (name) => {
  const res = [];
  for (const n in lgcodemap) {
    const city = lgcodemap[n];
    const cityname = city[1];
    if (cityname.indexOf(name) >= 0) {
      res.push([n, cityname]);
    }
  }
  return res;
};

if (import.meta.main) {
  console.log(getCityParent("全国"));
  console.log(getLGCode("鯖江市"));
  console.log(getLGCode("全国"));
  /*
  console.log(getLGCode("池田町"));
  console.log(getLGCode("福井県"));
  console.log(getLGCode("西区"));
  // console.log(getLGCode("札幌市", "西区"));
  
  console.log(getLGCode("北海道", "札幌市", "西区"));
  console.log(getLGCode("北海道", "西区"));
  console.log(getLGCode("北海道", "西区"));
    */
  console.log(getCityChildren(0));
  console.log(getCityChildren(18000));
  console.log(getCityChildren(18400));
  console.log(getCityChildren("広島市"));
  console.log(getCityChildren("広島県"));
  console.log(getCityChildren(34360));
  // console.log(getLGCode("札幌市")); // 1100, 1000
}

export {
  getLGCode,
  fromLGCode,
  getCityChildren,
  getCityChildrenWithDistrict,
  getCityParent,
  searchCities,
};
