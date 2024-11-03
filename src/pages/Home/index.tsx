import CountriesList from "@pages/Home/CountriesList";
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
          {isLoading ? (
            <p>Loading...</p>
          ) : data ? (
            <CountriesList data={data} />
          ) : (
            <p>Not found!</p>
          )}
        </main>
      </HeadingContext.Provider>
    </>
  );
}
