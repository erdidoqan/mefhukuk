import { Metadata } from "next";
import { HomeSectionFragment } from "@/gql/graphql";
import { toNextMetadata } from "react-datocms/seo";
import { StructuredTextDocument } from "react-datocms/structured-text";

import { fetchProcessPage } from "@/lib/fetch-process-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StructuredTextContent } from "@/components/structured-text-content";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchProcessPage();

  return toNextMetadata([
    ...result.processPage._seoMetaTags,
    ...result._site.faviconMetaTags,
  ]);
}

export default async function ProcessPage() {
  const { _site, siteExtra, homePage, processPage } = await fetchProcessPage();

  const homeSections = homePage.sections.filter(
    (section): section is HomeSectionFragment =>
      section.__typename === "HomeSectionRecord",
  );

  return (
    <div className="flex min-h-screen max-w-full flex-col overflow-hidden">
      <Header siteExtra={siteExtra} sections={homeSections} />

      <div className="container min-w-0 flex-grow px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <StructuredTextContent
            data={{
              ...processPage.structuredText,
              value: processPage.structuredText.value as StructuredTextDocument,
            }}
          />
        </div>
      </div>

      <Footer siteExtra={siteExtra} />
    </div>
  );
}
