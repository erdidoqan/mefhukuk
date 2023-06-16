import { graphql } from "@/gql";
import { HeroSectionFragment } from "@/gql/graphql";
import { Image } from "react-datocms/image";

graphql(`
  fragment HeroSection on HeroSectionRecord {
    __typename
    id
    caption
    title
    backgroundImage {
      responsiveImage(
        imgixParams: { w: 1920, h: 1080, fit: crop, auto: format }
      ) {
        ...ResponsiveImage
      }
    }
    coverImage {
      responsiveImage(
        imgixParams: { w: 545, h: 800, fit: crop, auto: format }
      ) {
        ...ResponsiveImage
      }
    }
  }
`);

export function HeroSection({ section }: { section: HeroSectionFragment }) {
  return (
    <div className="relative py-14">
      <Image
        data={section.backgroundImage.responsiveImage}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 bg-[#8969D3]/50 backdrop-blur" />

      <div className="container relative grid grid-cols-2 items-center gap-12 px-4">
        <div className="justify-self-start py-24">
          <div className="text-3xl text-white">{section.caption}</div>
          <div className="mt-2 text-6xl font-bold text-white">
            {section.title}
          </div>
        </div>
        <div className="justify-self-end">
          <Image data={section.coverImage.responsiveImage} />
        </div>
      </div>
    </div>
  );
}
