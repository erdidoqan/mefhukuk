import Link from "next/link";
import { graphql } from "@/gql";
import { Image } from "react-datocms/image";

import { fetchHomePage } from "@/lib/fetch-home-page";

graphql(`
  fragment IssueGallery on IssueGalleryRecord {
    __typename
    id
  }
`);

graphql(`
  fragment JournalIssues on Query {
    allJournalIssues {
      id
      name
      url
      image {
        responsiveImage(
          imgixParams: { w: 340, h: 500, fit: crop, auto: format }
        ) {
          ...ResponsiveImage
        }
      }
    }
  }
`);

export async function IssueGallery() {
  const { allJournalIssues } = await fetchHomePage();

  return (
    <div className="container px-4 py-6">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
        {allJournalIssues.map((issue) => (
          <div key={issue.id}>
            <Link href={issue.url} target="_blank" className="relative block">
              <Image data={issue.image.responsiveImage} className="invisible" />
              <Image
                data={issue.image.responsiveImage}
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className="mt-4 text-center text-xl text-gray-600">
              {issue.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
