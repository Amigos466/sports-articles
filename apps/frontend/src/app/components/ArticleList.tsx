import ArticleItem from "./ArticleItem";
import InfiniteArticleList from "./InfiniteArticleList";

interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
}

export default function ArticleList({ initialArticles }: { initialArticles: Article[] }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {initialArticles.map((article) => (
                    <ArticleItem key={article.id} article={article} />
                ))}

                {initialArticles.length === 0 && (
                    <div className="col-span-full py-24 text-center border rounded-2xl border-border border-dashed text-muted-foreground">
                        <p className="text-lg">System Empty. Initialize new article.</p>
                    </div>
                )}

                <InfiniteArticleList initialSkip={initialArticles.length} />

            </div>

        </>
    );
}
