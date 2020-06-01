export const querySPARQL = async (endPoint, query) => {
  const headers = { Accept: "application/sparql-results+json" };
  const res = await fetch(endPoint + "?query=" + encodeURIComponent(query));
  console.log(await res.text());
  return await res.json();
}
