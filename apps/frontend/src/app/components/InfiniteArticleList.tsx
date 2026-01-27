"use client";

import { useQuery } from "@apollo/client";
import { GET_ARTICLES } from "@/lib/queries";
import { useState, useEffect, useRef, useCallback } from "react";
import ArticleItem from "./ArticleItem";

interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
}

export default function InfiniteArticleList({ initialSkip }: { initialSkip: number }) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loadMoreRef = useRef<HTMLButtonElement>(null);

    const { client } = useQuery(GET_ARTICLES, { skip: true });

    const handleLoadMore = useCallback(async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        try {
            const { data } = await client.query({
                query: GET_ARTICLES,
                variables: { skip: initialSkip + articles.length, take: 10 },
                fetchPolicy: "network-only"
            });
            if (data?.articles) {
                if (data.articles.length < 10) {
                    setHasMore(false);
                }
                setArticles((prev) => [...prev, ...data.articles]);
            } else {
                setHasMore(false);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMore(false);
        }
    }, [articles.length, client, loadingMore, hasMore, initialSkip]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [handleLoadMore]);

    const handleItemDeleted = (id: string) => {
        setArticles(prev => prev.filter(a => a.id !== id));
    };

    return (
        <>
            {articles.map((article) => (
                <ArticleItem key={article.id} article={article} onDelete={handleItemDeleted} />
            ))}

            <div className="mt-20 col-span-full flex justify-center">
                {hasMore && (
                    <button
                        ref={loadMoreRef}
                        disabled={loadingMore}
                        onClick={handleLoadMore}
                        className="px-8 py-3 text-sm font-mono text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-50 uppercase tracking-wider"
                    >
                        {loadingMore ? "[ Loading_Data... ]" : "[ Load_More_Entries ]"}
                    </button>
                )}
            </div>
        </>
    );
}
