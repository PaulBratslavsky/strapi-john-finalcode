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

const ITEMS_PER_PAGE = 3;

export async function getAllPostsData(
  currentPage?: number,
  queryString?: string
) {
  const query = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
      category: { populate: true },
      author: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
        },
      },
    },
    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { content: { $containsi: queryString } },
        { description: { $containsi: queryString } },
      ],
    },
    pagination: {
      pageSize: ITEMS_PER_PAGE,
      page: currentPage,
    },
  });

  return await fetchData(`${baseUrl}/api/posts?${query}`);
}

export async function getPostBySlug(slug: string) {
  const query = qs.stringify({
    filters: { slug: slug },
    populate: {
      category: { populate: true },
      image: { fields: ["url", "alternativeText"] },
      author: { populate: { image: { fields: ["url", "alternativeText"] } } },
    }
  });

  return await fetchData(`${baseUrl}/api/posts?${query}`);
}
