import { graphql } from "@/gql";
import { JournalInfoFragment } from "@/gql/graphql";
import { StructuredTextDocument } from "react-datocms/structured-text";

import { StructuredTextContent } from "@/components/structured-text-content";

graphql(`
  fragment JournalInfo on JournalInfoRecord {
    __typename
    id
    content {
      value
    }
    contact {
      value
    }
  }
`);

export function JournalInfo({ content }: { content: JournalInfoFragment }) {
  return (
    <div className="container grid grid-cols-3 items-start px-4 py-6">
      <div className="col-span-2">
        <StructuredTextContent
          data={{
            ...content.content,
            value: content.content.value as StructuredTextDocument,
          }}
        />
      </div>
      <div className="bg-[#8969D3]/10 p-6">
        <StructuredTextContent
          data={{
            ...content.contact,
            value: content.contact.value as StructuredTextDocument,
          }}
        />
      </div>
    </div>
  );
}
