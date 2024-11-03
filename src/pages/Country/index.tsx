import { LeftArrow } from "@assets/Icons";
import DetailItem from "@components/DetailItem";
import Heading from "@components/ui/Heading";
import Section from "@components/ui/Section";
import { HeadingContext } from "@contexts/headingContext";
import useCountry from "@pages/Country/useCountry";
import { Link, useNavigate } from "react-router-dom";

export default function Country() {
  const data = useCountry();
  const navigate = useNavigate();

  return (
    <>
      <HeadingContext.Provider value={1}>
        <main className="mx-8 md:mx-20  pb-6  md:pb-11">
          <div className="">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="tag flex gap-3 items-center my-6 md:my-11 w-fit"
            >
              <LeftArrow /> Back
            </button>
          </div>

          <article className="grid gap-11 md:grid-cols-2 lg:items-center xl:gap-36">
            <img
              src={data.flags.png}
              alt={data.flags.alt}
              className="w-full aspect-[4/3] max-w-[560px] object-contain"
            />
            <div>
              <Heading className="font-extrabold text-xl sm:text-3xl mb-3 md:mb-7">
                {data.name.official}
              </Heading>
              <Section as="div">
                <div className="grid gap-11 mb-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <div>
                    <DetailItem
                      name="Native"
                      value={Object.values(data.name.nativeName)
                        .map((i) => i.common)
                        .join(", ")}
                    />
                    <DetailItem
                      name="Population"
                      value={data.population.toLocaleString()}
                    />
                    <DetailItem name="Region" value={data.region} />
                    <DetailItem name="Sub Region" value={data.subregion} />
                    <DetailItem
                      name="Capital"
                      value={data.capital.join(", ")}
                    />
                  </div>
                  <div>
                    <DetailItem
                      name="Top Level Domain"
                      value={data.tld.join(", ")}
                    />
                    <DetailItem
                      name="Currencies"
                      value={Object.values(data.currencies)
                        .map((i) => i.name)
                        .join(", ")}
                    />
                    <DetailItem
                      name="Languages"
                      value={Object.values(data.languages).join(", ")}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Heading className="font-semibold">Border Countries:</Heading>

                  {data.bordersFullName.length === 0 ? (
                    <p className="italic">No border country</p>
                  ) : (
                    <nav>
                      <ul className="flex flex-wrap gap-2">
                        {data.bordersFullName.map((border) => (
                          <li key={border.name.official} className="tag">
                            <Link to={`/countries/${border.name.official}`}>
                              {border.name.common}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              </Section>
            </div>
          </article>
        </main>
      </HeadingContext.Provider>
    </>
  );
}
