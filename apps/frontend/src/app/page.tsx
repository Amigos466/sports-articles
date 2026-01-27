import { getClient } from "@/lib/client";
import { GET_ARTICLES } from "@/lib/queries";
import ArticleList from "./components/ArticleList";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await getClient().query({
    query: GET_ARTICLES,
    variables: { skip: 0, take: 10 }
  });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <header className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-primary font-mono text-sm mb-2 tracking-wider uppercase">TypeScript, Node.js, Next.js, Apollo Server — Sports Articles service</h2>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Sports Articles
            </h1>
          </div>
          <Link
            href="/create"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-primary-foreground transition-all duration-200 bg-primary rounded-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
          >
            <span className="mr-2">CREATE_NEW_ARTICLE</span>
          </Link>
        </header>

        <ArticleList initialArticles={data.articles} />
      </div>
    </main>
  );
}
