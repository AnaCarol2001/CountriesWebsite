import { LeftArrow } from "@assets/Icons";
import DetailItem from "@components/DetailItem";
import Footer from "@components/Footer";
import Header from "@components/Header";
import Heading from "@components/Heading";
import Section from "@components/Section";
import { HeadingContext } from "@contexts/headingContext";

export default function Country() {
  return (
    <>
      <div className="mb-4">
        <HeadingContext.Provider value={1}>
          <Header />
          <main className="mx-8 md:mx-20  pb-6  md:pb-11">
            <div className="">
              <a
                href="http://"
                className="tag flex gap-3 items-center my-6 md:my-11 w-fit"
              >
                <LeftArrow />
                Back
              </a>
            </div>

            <article className="grid gap-11 md:grid-cols-2 lg:items-center xl:gap-36">
              <img
                src=""
                alt=""
                className="w-full aspect-[4/3] max-w-[560px]"
              />
              <div>
                <Heading className="font-extrabold text-xl sm:text-3xl mb-3 md:mb-7">
                  Belgium
                </Heading>
                <Section as="div">
                  <div className="grid gap-11 mb-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                    <div>
                      <DetailItem name="Native" value="België" />
                      <DetailItem name="Population" value="11,319,511" />
                      <DetailItem name="Region" value="Europe" />
                      <DetailItem name="Sub Region" value="Western Europe" />
                      <DetailItem name="Capital" value="Brussels" />
                    </div>
                    <div>
                      <DetailItem name="Top Level Domain" value=".be" />
                      <DetailItem name="Currencies" value="Euro" />
                      <DetailItem
                        name="Languages"
                        value="Dutch, french, german"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Heading className="font-semibold">
                      Border Countries:
                    </Heading>
                    <nav>
                      <ul className="flex flex-wrap gap-2">
                        <li className="tag">France</li>
                        <li className="tag">Germany</li>
                        <li className="tag">Netherlands</li>
                      </ul>
                    </nav>
                  </div>
                </Section>
              </div>
            </article>
          </main>
        </HeadingContext.Provider>
      </div>
      <Footer />
    </>
  );
}
