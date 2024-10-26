import { fetchData } from "@util/fetchData";
import { Country, CountryName } from "types";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

const COUNTRY_FIELDS =
  "fields=name,population,region,subregion,capital,flags,tld,currencies,languages,borders";

export default function useCountry() {
  const data = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loader>>
  >;

  return data;
}

export function loader(queryClient: QueryClient) {
  return async ({ params }: LoaderFunctionArgs) => {
    const countryId = params.countryId;

    if (!countryId) throw new Error("No country id provided.");

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
