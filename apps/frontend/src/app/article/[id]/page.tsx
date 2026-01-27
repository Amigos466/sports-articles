import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { notFound } from "next/navigation";

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content
      imageUrl
      createdAt
    }
  }
`;

export const dynamic = "force-dynamic";

export default async function ArticleDetails({ params }: { params: { id: string } }) {
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    try {
        const { data } = await getClient().query({
            query: GET_ARTICLE,
            variables: { id }
        });

        if (!data.article) return notFound();

        const { article } = data;

        return (
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <Link href="/" className="group text-muted-foreground hover:text-foreground mb-8 inline-flex items-center text-sm font-medium transition-colors">
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">&larr;</span> Back to List
                </Link>

                <article className="prose prose-zinc dark:prose-invert max-w-none">
                    <header className="not-prose mb-8">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-foreground">{article.title}</h1>
                        <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
                            <time dateTime={new Date(Number(article.createdAt)).toISOString()}>
                                {new Date(Number(article.createdAt)).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            <Link
                                href={`/edit/${article.id}`}
                                className="text-primary hover:text-primary/80 transition-colors"
                            >
                                Edit Article
                            </Link>
                        </div>
                    </header>

                    {article.imageUrl && (
                        <div className="not-prose mb-10 overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    )}

                    <div className="text-foreground leading-relaxed text-lg">
                        {article.content}
                    </div>
                </article>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}
