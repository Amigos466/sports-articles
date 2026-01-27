import { getClient } from "@/lib/client";
import { GET_ARTICLES } from "@/lib/queries";
import ArticleList from "./components/ArticleList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await getClient().query({
    query: GET_ARTICLES,
    variables: { skip: 0, take: 10 }
  });

  return (
    <main className="min-h-screen p-8">
      <ArticleList initialArticles={data.articles} />
    </main>
  );
}
