import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@util/fetchData";
import { Country } from "types";
import { useSearchParams } from "react-router-dom";

const COUNTRIES_FIELDS = "?fields=name,population,region,capital,flags";

type Countries = Country[];

export default function useCountries() {
  const [searchParams] = useSearchParams();
  const region = searchParams.get("region");
  const search = searchParams.get("search");

  let queryURL: string;
  let queryKey: string[];

  if (region) {
    queryKey = ["region", region];
    queryURL = `region/${region}`;
  } else if (search) {
    queryKey = ["search", search];
    queryURL = `name/${search}`;
  } else {
    queryKey = ["all"];
    queryURL = "all";
  }

  const query = useQuery({
    queryKey: ["countries", [...queryKey]],
    queryFn: () => fetchData<Countries>(`${queryURL}${COUNTRIES_FIELDS}`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
}
