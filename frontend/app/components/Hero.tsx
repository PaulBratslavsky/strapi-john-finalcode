import Link from "next/link";
import { StrapiImage } from "@/app/components/StrapiImage";

interface HeroProps {
  data: {
    heading: string;
    text: string;
    image: {
      url: string;
      alternativeText: string;
    };
    link: {
      text: string;
      href: string;
    };
  };
}

export default function Hero({ data }: Readonly<HeroProps>) {
  const { heading, text, image, link } = data;
  return (
    <div className="hero my-12 rounded-lg">
      <div className="hero-content p-0 flex-col lg:flex-row">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText}
          height={500}
          width={500}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="mx-8">
          <h1 className="text-5xl font-bold">{heading}</h1>
          <p className="py-6">{text}</p>
          <Link href={link.href} className="btn btn-primary">
            {link.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
