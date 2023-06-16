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

const HomePageQuery = graphql(`
  query HomePage {
    siteExtra {
      logo {
        url
      }
      universityAddress
      universityUrl
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
  const { siteExtra, homePage, allJournalIssues } = await request(
    HomePageQuery,
  );
  if (!siteExtra || !homePage) {
    notFound();
  }

  return { siteExtra, homePage, allJournalIssues };
});
