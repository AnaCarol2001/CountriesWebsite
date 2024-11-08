import DetailItem from "@components/DetailItem";
import Heading from "@components/ui/Heading";
import Section from "@components/ui/Section";
import useInfiniteScroll from "@pages/Home/CountriesList/useInfiniteScroll";
import { Link } from "react-router-dom";
import { Country } from "types";

export default function CountriesList({ data }: { data: Country[] }) {
  const { displayData, lastElementRef } = useInfiniteScroll(data);

  return (
    <Section className="grid place-items-center grid-rows-auto gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-16 pb-6 md:pb-11 ">
      {displayData?.map((country, i) => (
        <article
          ref={i === displayData.length - 1 ? lastElementRef : undefined}
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
            <DetailItem name="Capital" value={country.capital.join(", ")} />
          </Section>
        </article>
      ))}
    </Section>
  );
}

export const CountriesListSkeleton = () => {
  const array = [0, 1, 2, 3];
  return (
    <section className="grid place-items-center grid-rows-auto gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-16 pb-6 md:pb-11">
      {array.map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-dark-elements w-[264px] grid gap-4 grid-rows-subgrid row-span-3 mb-10 md:mb-16 rounded-md overflow-hidden shadow-sm "
        >
          <div className="w-[264px] h-40 skeleton"></div>
          <div className="h-5 w-4/5 mx-6 skeleton"></div>
          <div className="space-y-2 px-6 pb-4">
            <div className="h-3 w-3/4 skeleton"></div>
            <div className="h-3 w-1/2 skeleton"></div>
            <div className="h-3 w-4/5 skeleton"></div>
          </div>
        </div>
      ))}
    </section>
  );
};
