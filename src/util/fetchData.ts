const BASE_URL = "https://restcountries.com/v3.1/";

export async function fetchData<T>(url: string) {
  const response = await fetch(BASE_URL + url);

  if (!response.ok) throw new Error("Failed to fetch");

  return response.json() as T;
}
