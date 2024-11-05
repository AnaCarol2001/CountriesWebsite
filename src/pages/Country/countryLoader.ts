import { fetchData } from "@util/fetchData";
import { Country, CountryName } from "types";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import { defer, LoaderFunctionArgs } from "react-router-dom";

const COUNTRY_FIELDS =
  "fields=name,population,region,subregion,capital,flags,tld,currencies,languages,borders";

export function loader(queryClient: QueryClient) {
  return ({ params }: LoaderFunctionArgs) => {
    const countryId = params.countryId;

    if (!countryId) throw new Error("No country id provided.");

    const countryDetails = getAllCountryDetails(countryId, queryClient);

    return defer({ country: countryDetails });
  };
}

async function getAllCountryDetails(
  countryId: string,
  queryClient: QueryClient
) {
  const [country] = await queryClient.ensureQueryData(
    getCountryDetails(countryId)
  );

  if (!country.borders || country?.borders?.length === 0)
    return { ...country, bordersFullName: [] };

  const bordersNames = await queryClient.ensureQueryData(
    getCountryBorders(countryId, country.borders.join(","))
  );

  return {
    ...country,
    bordersFullName: bordersNames,
  };
}

function getCountryDetails(countryName: string) {
  return queryOptions({
    queryKey: ["countries", countryName],
    queryFn: () =>
      fetchData<[Country]>(
        `name/${countryName}?fullText=true&${COUNTRY_FIELDS}`
      ),
    staleTime: Infinity,
    enabled: !!countryName,
  });
}

function getCountryBorders(countryName: string, codes: string) {
  return queryOptions({
    queryKey: ["countries", countryName, "borders"],
    queryFn: () => fetchData<CountryName[]>(`alpha?codes=${codes}&fields=name`),
    enabled: !!codes,
    staleTime: Infinity,
  });
}
