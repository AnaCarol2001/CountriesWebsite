import DetailItem from "@components/DetailItem";
import Filters from "@components/Filters";
import Heading from "@components/ui/Heading";
import Section from "@components/ui/Section";
import { HeadingContext } from "@contexts/headingContext";
import useCountries from "@hooks/useCountries";
import { Link } from "react-router-dom";

export default function Home() {
  const { data } = useCountries();

  return (
    <>
      <HeadingContext.Provider value={1}>
        <main className="mx-4 md:mx-20">
          <Heading className="sr-only">Where in the world?</Heading>

          <Filters />

          <Section className="grid place-items-center grid-rows-auto gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-16 pb-6 md:pb-11 ">
            {data?.map((country) => (
              <article
                data-component="card"
                className="bg-white dark:bg-dark-elements w-[264px] grid gap-4 grid-rows-subgrid row-span-3 mb-10 md:mb-16 rounded-md overflow-hidden shadow-sm "
                key={country.name.common}
              >
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  width={264}
                  height={160}
                  className="object-cover object-center h-full"
                />

                <Heading className="font-extrabold text-lg px-6 self-center">
                  <Link to={`/countries/${country.name.official}`}>
                    {country.name.common}
                  </Link>
                </Heading>

                <Section as="div" className="px-6 pb-4">
                  <DetailItem
                    name="Population"
                    value={country.population.toLocaleString()}
                  />
                  <DetailItem name="Region" value={country.region} />
                  <DetailItem
                    name="Capital"
                    value={country.capital.join(", ")}
                  />
                </Section>
              </article>
            ))}
          </Section>
        </main>
      </HeadingContext.Provider>
    </>
  );
}
