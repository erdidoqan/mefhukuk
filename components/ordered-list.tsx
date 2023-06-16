import { graphql } from "@/gql";
import { OrderedListFragment } from "@/gql/graphql";

graphql(`
  fragment OrderedList on OrderedListRecord {
    __typename
    id
    items {
      id
      description
    }
  }
`);

export function OrderedList({ content }: { content: OrderedListFragment }) {
  return (
    <div className="container px-4 py-6">
      <table className="w-full">
        <tbody>
          {content.items.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="w-12 border border-gray-400/20 bg-[#002169] px-5 py-3 font-semibold text-white">
                  {index + 1}
                </td>
                <td className="border border-gray-400/20 px-4 py-3">
                  {item.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
