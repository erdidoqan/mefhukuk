import { HeroSectionFragment, HomeSectionFragment } from "@/gql/graphql";

import { HeroSection } from "@/components/hero-section";
import { HomeSection } from "@/components/home-section";

export function Section({
  section,
}: {
  section: HeroSectionFragment | HomeSectionFragment;
}) {
  switch (section.__typename) {
    case "HeroSectionRecord": {
      return <HeroSection section={section} />;
    }
    case "HomeSectionRecord": {
      return <HomeSection section={section} />;
    }
    default: {
      throw new Error("Invalid section");
    }
  }
}
