import { SiteExtraFragment } from "@/gql/graphql";

export function Footer({ siteExtra }: { siteExtra: SiteExtraFragment }) {
  return (
    <div className="mt-10 min-w-0 border-t">
      <div className="container flex items-center justify-center gap-8 px-4 py-8">
        <a href={siteExtra.universityUrl} target="_blank">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={siteExtra.logo.url} alt="logo" className="h-16" />
        </a>
        <div className="text-gray-600">{siteExtra.universityAddress}</div>
      </div>
    </div>
  );
}
