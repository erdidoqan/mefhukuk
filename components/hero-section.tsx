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

      <div className="container relative grid items-center gap-12 px-4 sm:grid-cols-2">
        <div className="justify-self-start py-24">
          <div className="text-2xl text-white sm:text-3xl">
            {section.caption}
          </div>
          <div className="mt-2 text-4xl font-bold text-white sm:text-6xl">
            {section.title}
          </div>
        </div>
        <div className="hidden justify-self-end sm:block">
          <Image data={section.coverImage.responsiveImage} />
        </div>
      </div>
    </div>
  );
}
