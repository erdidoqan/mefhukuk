import { graphql } from "@/gql";
import { EditorialBoardFragment } from "@/gql/graphql";
import { StructuredTextDocument } from "react-datocms/structured-text";

import { StructuredTextContent } from "@/components/structured-text-content";

graphql(`
  fragment EditorialBoard on EditorialBoardRecord {
    __typename
    id
    columns {
      id
      structuredText {
        value
      }
    }
  }
`);

export function EditorialBoard({
  content,
}: {
  content: EditorialBoardFragment;
}) {
  return (
    <div className="container px-4 py-6">
      <div className="grid grid-flow-col gap-8">
        {content.columns.map((column) => (
          <div key={column.id} className="text-center">
            <StructuredTextContent
              data={{
                ...column.structuredText,
                value: column.structuredText.value as StructuredTextDocument,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
