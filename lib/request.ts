import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ASTNode, print } from "graphql";
import { GraphQLClient, RequestDocument, Variables } from "graphql-request";

import "server-only";

export async function request<TDocument = any>(
  document: RequestDocument | TypedDocumentNode<TDocument, Variables>,
  options?: { variables?: Variables; includeDrafts?: boolean },
) {
  const graphQLClient = new GraphQLClient("https://graphql.datocms.com/", {
    fetch,
    headers: {
      Authorization: process.env.DATOCMS_READONLY_TOKEN,
      "X-Exclude-Invalid": "true",
      ...(options?.includeDrafts ? { "X-Include-Drafts": "true" } : {}),
    },
    cache: "no-cache",
  });

  const result = await graphQLClient.rawRequest<TDocument, Variables>(
    print(document as ASTNode),
    options?.variables,
  );

  return result.data;
}
