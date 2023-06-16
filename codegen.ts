import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://graphql.datocms.com": {
        headers: {
          authorization: process.env.DATOCMS_READONLY_TOKEN,
          "X-Exclude-Invalid": "true",
        },
      },
    },
  ],
  documents: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "lib/**/*.ts"],
  generates: {
    "gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        strictScalars: true,
        skipTypename: true,
        scalars: {
          BooleanType: "boolean",
          CustomData: "Record<string, unknown>",
          Date: "string",
          DateTime: "string",
          FloatType: "number",
          IntType: "number",
          ItemId: "string",
          JsonField: "unknown",
          MetaTagAttributes: "Record<string, string>",
          UploadId: "string",
        },
      },
      plugins: [],
    },
  },
};

export default config;
