import CardsList from "@components/CardsList";
import Filters from "@components/Filters";
import Heading from "@components/ui/Heading";
import { HeadingContext } from "@contexts/headingContext";
import useCountries from "@hooks/useCountries";

export default function Home() {
  const { data, isLoading } = useCountries();

  return (
    <>
      <HeadingContext.Provider value={1}>
        <main className="mx-4 md:mx-20">
          <Heading className="sr-only">Where in the world?</Heading>

          <Filters />
          {isLoading ? (
            <p>Loading...</p>
          ) : data ? (
            <CardsList data={data} />
          ) : (
            <p>Not found!</p>
          )}
        </main>
      </HeadingContext.Provider>
    </>
  );
}
