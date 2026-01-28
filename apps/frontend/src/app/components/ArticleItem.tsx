import Link from "next/link";
import DeleteArticleButton from "./DeleteArticleButton";

interface Article {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
}

interface ArticleItemProps {
    article: Article;
    onDelete?: (id: string) => void;
}

export default function ArticleItem({ article, onDelete }: ArticleItemProps) {
    return (
        <article className="group relative flex flex-col p-6 sm:p-8 rounded-2xl border border-border/50 bg-background/50 hover:bg-border/30 transition-all duration-300 hover:-translate-y-1">
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
                    <DeleteArticleButton id={article.id} onSuccess={onDelete} />
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
                <span className="hidden sm:inline group-hover:text-primary transition-colors">ID: {article.id.slice(0, 8)}</span>
            </div>
        </article>
    );
}
