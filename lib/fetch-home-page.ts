import { cache } from "react";
import { notFound } from "next/navigation";
import { graphql } from "@/gql";

import { request } from "@/lib/request";

graphql(`
  fragment ResponsiveImage on ResponsiveImage {
    sizes
    src
    width
    height
    alt
    title
    base64
  }
`);

graphql(`
  fragment StructuredTextBlock on StructuredTextBlockRecord {
    __typename
    id
    structuredText {
      value
    }
  }
`);

graphql(`
  fragment SiteExtra on SiteExtraRecord {
    logo {
      url
    }
    universityAddress
    universityUrl
  }
`);

const HomePageQuery = graphql(`
  query HomePage {
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
    homePage {
      _seoMetaTags {
        tag
        attributes
        content
      }
      sections {
        ... on HeroSectionRecord {
          ...HeroSection
        }
        ... on HomeSectionRecord {
          ...HomeSection
        }
      }
    }
    ...JournalIssues
  }
`);

export const fetchHomePage = cache(async () => {
  const { _site, siteExtra, homePage, allJournalIssues } = await request(
    HomePageQuery,
  );
  if (!_site || !siteExtra || !homePage) {
    notFound();
  }

  return { _site, siteExtra, homePage, allJournalIssues };
});
