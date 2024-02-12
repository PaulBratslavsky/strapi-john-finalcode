import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";

import { getHomePageData } from "@/app/data/loaders";

export default async function HomeRoute() {
  const data = await getHomePageData();

  if (!data?.blocks) return <p>No items found.</p>;
  const blocks = data.blocks;

  function blockRenderer(block: any, index: number) {
    switch (block.__component) {
      case "layout.hero":
        return <Hero data={block} key={index} />;
      case "layout.features-list":
        return <Features data={block} key={index} />;
      default:
        return null;
    }
  }

  return blocks.map(blockRenderer)
}


