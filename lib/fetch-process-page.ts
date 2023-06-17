import { cache } from "react";
import { notFound } from "next/navigation";
import { graphql } from "@/gql";

import { request } from "@/lib/request";

const ProcessPageQuery = graphql(`
  query ProcessPage {
    _site {
      faviconMetaTags {
        tag
        attributes
        content
      }
    }
    siteExtra {
      ...SiteExtra
    }
    processPage {
      _seoMetaTags {
        tag
        attributes
        content
      }
      structuredText {
        value
      }
    }
    homePage {
      sections {
        ... on HeroSectionRecord {
          __typename
        }
        ... on HomeSectionRecord {
          ...HomeSection
        }
      }
    }
  }
`);

export const fetchProcessPage = cache(async () => {
  const { _site, siteExtra, homePage, processPage } = await request(
    ProcessPageQuery,
  );
  if (!_site || !siteExtra || !homePage || !processPage) {
    notFound();
  }

  return { _site, siteExtra, homePage, processPage };
});
