"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ARTICLES, DELETE_ARTICLE } from "@/lib/queries";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
}

export default function ArticleList({ initialArticles }: { initialArticles: Article[] }) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const { client } = useQuery(GET_ARTICLES, {
        skip: true,
    });

    const [loadingMore, setLoadingMore] = useState(false);

    // Mutation
    const [deleteArticle] = useMutation(DELETE_ARTICLE);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteArticle({ variables: { id } });
                setArticles(articles.filter(a => a.id !== id));
                router.refresh();
            } catch (e) {
                alert("Failed to delete");
            }
        }
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            const { data } = await client.query({
                query: GET_ARTICLES,
                variables: { skip: articles.length, take: 10 },
                fetchPolicy: "network-only"
            });
            if (data?.articles) {
                setArticles([...articles, ...data.articles]);
            }
        } catch (e) {
            console.error(e);
            alert("Failed to load more");
        } finally {
            setLoadingMore(false);
        }
    };

    return (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                    <article key={article.id} className="group relative flex flex-col p-8 rounded-2xl border border-border/50 bg-background/50 hover:bg-border/30 transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-2 text-xs font-mono text-primary">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <time dateTime={new Date(Number(article.createdAt)).toISOString()}>
                                    {new Date(Number(article.createdAt)).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-3 z-20">
                                <Link href={`/edit/${article.id}`} className="text-muted-foreground hover:text-primary transition-colors text-xs font-mono uppercase">
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(article.id);
                                    }}
                                    className="text-muted-foreground hover:text-destructive transition-colors text-xs font-mono uppercase"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/article/${article.id}`} className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                {article.title}
                            </Link>
                        </h3>

                        <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6 flex-grow">
                            {article.content}
                        </p>

                        <div className="mt-auto pt-6 border-t border-border/50 flex justify-between items-center text-xs font-mono text-muted-foreground">
                            <span>READ_MORE_&gt;</span>
                            <span className="group-hover:text-primary transition-colors">ID: {article.id.slice(0, 8)}</span>
                        </div>
                    </article>
                ))}

                {articles.length === 0 && (
                    <div className="col-span-full py-24 text-center border rounded-2xl border-border border-dashed text-muted-foreground">
                        <p className="text-lg">System Empty. Initialize new article.</p>
                    </div>
                )}
            </div>

            <div className="mt-20 flex justify-center">
                <button
                    disabled={loadingMore}
                    onClick={handleLoadMore}
                    className="px-8 py-3 text-sm font-mono text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50 uppercase tracking-wider"
                >
                    {loadingMore ? "[ Loading_Data... ]" : "[ Load_More_Entries ]"}
                </button>
            </div>
        </div>
    );
}
