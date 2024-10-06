import { Search } from "@assets/Icons";
import DetailItem from "@components/DetailItem";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Heading from "@components/Heading";
import Section from "@components/Section";
import { HeadingContext } from "@contexts/headingContext";

export default function Home() {
  return (
    <>
      <div className="mb-4">
        <HeadingContext.Provider value={1}>
          <Header />
          <main className="mx-4 md:mx-20">
            <Heading className="sr-only">Where in the world?</Heading>

            <div className="w-full flex flex-col md:flex-row md:justify-between my-6  md:my-11 gap-10">
              <div className="w-full max-w-md flex items-center gap-2 bg-white dark:bg-dark-elements py-1.5 sm:py-2 pl-8 pr-2 rounded-md shadow-sm">
                <span>
                  <Search />
                </span>
                <form className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search for a country
                  </label>
                  <input
                    className="w-full pl-2 p-1.5 md:py-2 bg-transparent text-xs sm:text-sm"
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search for a country..."
                  />
                </form>
              </div>
              <div>
                <label htmlFor="filter" className="sr-only">
                  Select a region:
                </label>
                <select
                  name="filter"
                  id="filter"
                  defaultValue={""}
                  className="p-3 md:p-4 bg-white dark:bg-dark-elements text-xs sm:text-sm rounded-md shadow-sm"
                >
                  <option value="" disabled>
                    Filter by Region
                  </option>
                  <option value="africa">Africa</option>
                  <option value="america">America</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>
            </div>

            <Section className="grid place-items-center gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  md:gap-16 pb-6  md:pb-11">
              <article className="bg-white dark:bg-dark-elements rounded-md overflow-hidden shadow-sm">
                <img src="" alt="" width={264} height={160} />
                <div className="p-6 space-y-4">
                  <Heading className="font-extrabold text-lg">
                    Country name
                  </Heading>
                  <Section as="div">
                    <DetailItem name="Population" value="000,000,000" />
                    <DetailItem name="Region" value="region" />
                    <DetailItem name="Capital" value="capital" />
                  </Section>
                </div>
              </article>
            </Section>
          </main>
        </HeadingContext.Provider>
      </div>
      <Footer />
    </>
  );
}
