import { Metadata } from "next";
import { HomeSectionFragment } from "@/gql/graphql";
import { toNextMetadata } from "react-datocms/seo";
import slugify from "slugify";

import { fetchHomePage } from "@/lib/fetch-home-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Section } from "@/components/section";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchHomePage();

  return toNextMetadata([
    ...result.homePage._seoMetaTags,
    ...result._site.faviconMetaTags,
  ]);
}

export default async function Home() {
  const { siteExtra, homePage } = await fetchHomePage();

  const homeSections = homePage.sections.filter(
    (section): section is HomeSectionFragment =>
      section.__typename === "HomeSectionRecord",
  );

  return (
    <div>
      <Header siteExtra={siteExtra} sections={homeSections} />

      {homePage.sections.map((section) => (
        <section key={section.id} id={slugify(section.title, { lower: true })}>
          <Section section={section} />
        </section>
      ))}

      <Footer siteExtra={siteExtra} />
    </div>
  );
}
