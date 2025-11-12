const BASE = "https://swapi.dev/api";
const cache = new Map();

async function cachedFetch(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  cache.set(url, data);
  return data;
}

export async function fetchPeoplePage(url = `${BASE}/people/`) {
  return cachedFetch(url);
}

export async function fetchWorld(url) {
  return cachedFetch(url);
}

export async function fetchSpecies(url) {
  return cachedFetch(url);
}
