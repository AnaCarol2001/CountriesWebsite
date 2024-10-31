import DetailItem from "@components/DetailItem";
import Heading from "@components/ui/Heading";
import Section from "@components/ui/Section";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Country } from "types";

const itemsPerPage = 5;

export default function CardsList({ data }: { data: Country[] }) {
  const [displayData, setDisplayData] = useState<Country[]>([]);
  const lastCardObserver = useRef<IntersectionObserver | null>(null);
  const location = useLocation();

  const displayMoreItems = useCallback(() => {
    if (!data) return;
    setDisplayData((prev) => {
      let newData = [];
      if (data.length === prev.length) return data;
      if (data.length <= prev.length + itemsPerPage) return data;
      else newData = data.slice(prev.length, prev.length + itemsPerPage);
      return [...prev, ...newData];
    });
  }, [data, setDisplayData]);

  const lastCardRef = useCallback(
    (node: HTMLElement) => {
      if (lastCardObserver.current) lastCardObserver.current.disconnect();

      lastCardObserver.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) displayMoreItems();
        },
        { root: null }
      );

      if (node) lastCardObserver.current.observe(node);
    },
    [displayMoreItems]
  );
  useEffect(() => {
    setDisplayData(() => []);
    displayMoreItems();
  }, [displayMoreItems, location, setDisplayData]);

  return (
    <Section className="grid place-items-center grid-rows-auto gap-x-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-16 pb-6 md:pb-11 ">
      {displayData?.map((country, i) => (
        <article
          ref={i === displayData.length - 1 ? lastCardRef : undefined}
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
