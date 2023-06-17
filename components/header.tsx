import Link from "next/link";
import { HomeSectionFragment, SiteExtraFragment } from "@/gql/graphql";
import slugify from "slugify";

import MobileMenu from "@/components/mobile-menu";

export function Header({
  siteExtra,
  sections,
}: {
  siteExtra: SiteExtraFragment;
  sections: HomeSectionFragment[];
}) {
  const menuItems = [];
  for (const section of sections) {
    if (section.__typename === "HomeSectionRecord") {
      menuItems.push({
        id: section.id,
        href: `/#${slugify(section.title, { lower: true })}`,
        scroll: false,
        text: section.menuTitle,
      });
    }
  }

  menuItems.push({
    id: "degerlendirme-sureci",
    href: "/degerlendirme-sureci",
    scroll: true,
    text: "DEĞERLENDİRME SÜRECİ",
  });

  return (
    <>
      <div className="sticky top-0 z-10 min-w-0 bg-white shadow lg:relative lg:shadow-none">
        <div className="container flex items-center justify-between gap-8 px-4">
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteExtra.logo.url}
              alt="logo"
              className="my-2 h-10 lg:my-4 lg:h-24"
            />
          </Link>
          <MobileMenu menuItems={menuItems} />
        </div>
      </div>

      <div className="sticky top-0 z-10 hidden min-w-0 border-t bg-white shadow lg:block">
        <nav className="item-center container flex justify-center gap-4 px-4 py-3 uppercase">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              scroll={item.scroll}
              className="text-sm font-bold text-[#002169] transition-colors hover:text-[#F5333F]"
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
