import { LeftArrow } from "@assets/Icons";
import DetailItem from "@components/DetailItem";
import Heading from "@components/ui/Heading";
import Section from "@components/ui/Section";
import { HeadingContext } from "@contexts/headingContext";
import { Suspense } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Country as CountryType } from "types";

export default function Country() {
  const { country } = useLoaderData() as { country: CountryType };
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
            <Suspense fallback={<CountrySkeleton />}>
              <Await resolve={country} errorElement={<p>Error</p>}>
                {(country: CountryType) => (
                  <>
                    <div className="order-2">
                      <Heading className="font-extrabold text-xl sm:text-3xl mb-3 md:mb-7">
                        {country.name.official}
                      </Heading>
                      <Section as="div">
                        <div className="grid gap-11 mb-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                          <div>
                            <DetailItem
                              name="Native"
                              value={Object.values(country.name.nativeName)
                                .map((i) => i.common)
                                .join(", ")}
                            />
                            <DetailItem
                              name="Population"
                              value={country.population.toLocaleString()}
                            />
                            <DetailItem name="Region" value={country.region} />
                            <DetailItem
                              name="Sub Region"
                              value={country.subregion}
                            />
                            <DetailItem
                              name="Capital"
                              value={country.capital.join(", ")}
                            />
                          </div>
                          <div>
                            <DetailItem
                              name="Top Level Domain"
                              value={country.tld.join(", ")}
                            />
                            <DetailItem
                              name="Currencies"
                              value={Object.values(country.currencies)
                                .map((i) => i.name)
                                .join(", ")}
                            />
                            <DetailItem
                              name="Languages"
                              value={Object.values(country.languages).join(
                                ", "
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <Heading className="font-semibold">
                            Border Countries:
                          </Heading>

                          {!country.bordersFullName ||
                          country?.bordersFullName.length === 0 ? (
                            <p className="italic">No border country</p>
                          ) : (
                            <nav>
                              <ul className="flex flex-wrap gap-2">
                                {country.bordersFullName.map((border) => (
                                  <li
                                    key={border.name.official}
                                    className="tag"
                                  >
                                    <Link
                                      to={`/countries/${border.name.official}`}
                                    >
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
                    <img
                      src={country.flags.png}
                      alt={country.flags.alt}
                      className="w-full aspect-[4/3] max-w-[560px] object-contain order-1"
                    />
                  </>
                )}
              </Await>
            </Suspense>
          </article>
        </main>
      </HeadingContext.Provider>
    </>
  );
}

const CountrySkeleton = () => {
  return (
    <>
      <div className="skeleton w-full aspect-[4/3] max-w-[560px]"></div>
      <div>
        <div className="skeleton h-5 sm:h-7 w-full mb-3 md:mb-7">
          <Heading className="sr-only">Loading country details</Heading>
        </div>
        <div>
          <div className="grid gap-11 mb-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="skeleton h-3 w-3/4"></div>
              <div className="skeleton h-3 w-3/5"></div>
              <div className="skeleton h-3 w-1/2"></div>
              <div className="skeleton h-3 w-3/4"></div>
              <div className="skeleton h-3 w-2/3"></div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-3 w-3/5"></div>
              <div className="skeleton h-3 w-3/4"></div>
              <div className="skeleton h-3 w-1/2"></div>
            </div>
          </div>
          <div className="skeleton h-6 w-3/4">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
