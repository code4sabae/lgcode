import { getLGCode, findCity } from "./lgcode.mjs";

const geocodecache = {};
const getGeocode = async code => {
  const cache = geocodecache[code];
  if (cache) { return cache; };
  let data = null;
  const fn = `./geocode/${code}.json`;
  if (window.Deno) {
    data = JSON.parse(await Deno.readTextFile(fn));
  } else {
    data = await (await fetch(fn)).json();
  }
  geocodecache[code] = data;
  return data;
};

const getLatLng = async (prefname, cityname, chome) => {
  const code = getLGCode(prefname, cityname);
  // console.log("code", code);
  const citygeo = await getGeocode(code);
  // console.log(citygeo);
  const latlng = citygeo[chome];
  return latlng;
};

export { getLatLng };
