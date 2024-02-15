import BlogList from "@/app/components/BlogList";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";
import { getAllPostsData } from "@/app/data/loaders";

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  }
}

export default async function BlogRoute({
  searchParams,
}: Readonly<SearchParamsProps> = {
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query ?? "";
  const data = await getAllPostsData(currentPage, query);

  if (!data.data) return <p>No posts found.</p>
  const posts = data.data;
  const pageCount = data.meta.pagination.pageCount;

  return (
    <div>
      <Search />
      <BlogList data={posts} />
      <Pagination totalPages={pageCount}/>
    </div>
  );
}
