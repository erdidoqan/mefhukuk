import { Metadata } from "next";
import Link from "next/link";
import { toRemixMeta } from "react-datocms/seo";
import slugify from "slugify";

import { fetchHomePage } from "@/lib/fetch-home-page";
import { Section } from "@/components/section";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const result = await fetchHomePage();

  return toRemixMeta(result.homePage._seoMetaTags);
}

export default async function Home() {
  const { siteExtra, homePage } = await fetchHomePage();

  return (
    <div>
      <div className="container px-4">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={siteExtra.logo.url} alt="logo" className="my-4 h-24" />
        </Link>
      </div>
      <div className="sticky top-0 z-10 border-t bg-white shadow">
        <nav className="item-center container flex justify-center gap-4 px-4 py-3 uppercase">
          {homePage.sections.map((section) =>
            section.__typename === "HomeSectionRecord" ? (
              <Link
                key={section.id}
                href={`/#${slugify(section.title, { lower: true })}`}
                scroll={false}
                className="text-sm font-bold text-[#002169] transition-colors hover:text-[#F5333F]"
              >
                {section.menuTitle}
              </Link>
            ) : null,
          )}
        </nav>
      </div>

      {homePage.sections.map((section) => (
        <section key={section.id} id={slugify(section.title, { lower: true })}>
          <Section section={section} />
        </section>
      ))}

      <div className="mt-10 border-t">
        <div className="container flex items-center justify-center gap-8 px-4 py-8">
          <a href={siteExtra.universityUrl} target="_blank">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={siteExtra.logo.url} alt="logo" className="h-16" />
          </a>
          <div className="text-gray-600">{siteExtra.universityAddress}</div>
        </div>
      </div>
    </div>
  );
}
