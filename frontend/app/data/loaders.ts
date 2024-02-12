"use server";
import qs from "qs";
import { flattenAttributes } from "../utils";

const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export async function getGlobalData() {
  const query = qs.stringify({
    populate: [
      "topNav.logoText",
      "topNav.navItems",
      "topNav.cta",
      "footer.socialLinks",
    ],
  });
  return await fetchData(`${baseUrl}/api/global?${query}`);
}

export async function getHomePageData() {
  const query = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  return await fetchData(`${baseUrl}/api/home-page?${query}`);
}
