import CountriesList, {
  CountriesListSkeleton,
} from "@pages/Home/CountriesList";
import Heading from "@components/ui/Heading";
import { HeadingContext } from "@contexts/headingContext";
import useCountries from "@pages/Home/useCountries";
import SearchBar from "@pages/Home/SearchBar";
import FilterByRegion from "@pages/Home/FilterByRegion";

export default function Home() {
  const { data, isLoading } = useCountries();

  return (
    <>
      <HeadingContext.Provider value={1}>
        <main className="mx-4 md:mx-20">
          <Heading className="sr-only">Where in the world?</Heading>

          <div className="w-full flex flex-col md:flex-row md:justify-between my-6  md:my-11 gap-10">
            <SearchBar />
            <FilterByRegion />
          </div>
          <div role="region" aria-live="polite" className="sr-only">
            <Heading>
              {isLoading
                ? "Loading content."
                : data
                ? `${data.length} countries.`
                : "An problem ocurred. Try later."}
            </Heading>
          </div>
          {isLoading ? (
            <CountriesListSkeleton />
          ) : data ? (
            <CountriesList data={data} />
          ) : (
            <Heading>An problem ocurred. Try later.</Heading>
          )}
        </main>
      </HeadingContext.Provider>
    </>
  );
}
