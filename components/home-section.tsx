import { graphql } from "@/gql";
import {
  EditorialBoardFragment,
  HomeSectionFragment,
  IssueGalleryFragment,
  JournalInfoFragment,
  OrderedListFragment,
  StructuredTextBlockFragment,
} from "@/gql/graphql";
import { StructuredTextDocument } from "react-datocms/structured-text";

import { EditorialBoard } from "@/components/editorial-board";
import { IssueGallery } from "@/components/issue-gallery";
import { JournalInfo } from "@/components/journal-info";
import { OrderedList } from "@/components/ordered-list";
import { StructuredTextContent } from "@/components/structured-text-content";

graphql(`
  fragment HomeSection on HomeSectionRecord {
    __typename
    id
    title
    menuTitle
    content {
      ... on JournalInfoRecord {
        ...JournalInfo
      }
      ... on IssueGalleryRecord {
        ...IssueGallery
      }
      ... on StructuredTextBlockRecord {
        ...StructuredTextBlock
      }
      ... on OrderedListRecord {
        ...OrderedList
      }
      ... on EditorialBoardRecord {
        ...EditorialBoard
      }
    }
  }
`);

function HomeSectionContent({
  content,
}: {
  content:
    | IssueGalleryFragment
    | JournalInfoFragment
    | StructuredTextBlockFragment
    | OrderedListFragment
    | EditorialBoardFragment;
}) {
  switch (content.__typename) {
    case "JournalInfoRecord": {
      return <JournalInfo content={content} />;
    }
    case "IssueGalleryRecord": {
      return <IssueGallery />;
    }
    case "StructuredTextBlockRecord": {
      return (
        <div className="container px-4 py-6 prose-a:bg-red-500 prose-a:px-4 prose-a:py-3 prose-a:text-sm prose-a:text-white prose-a:no-underline hover:prose-a:!text-white">
          <StructuredTextContent
            data={{
              ...content.structuredText,
              value: content.structuredText.value as StructuredTextDocument,
            }}
          />
        </div>
      );
    }
    case "OrderedListRecord": {
      return <OrderedList content={content} />;
    }
    case "EditorialBoardRecord": {
      return <EditorialBoard content={content} />;
    }
    default: {
      throw new Error("Invalid content");
    }
  }
}

export function HomeSection({ section }: { section: HomeSectionFragment }) {
  return (
    <div className="mx-auto max-w-6xl py-16">
      <div className="container px-4 text-3xl font-bold">{section.title}</div>
      {section.content.map((item) => (
        <div key={item.id}>
          <HomeSectionContent content={item} />
        </div>
      ))}
    </div>
  );
}
