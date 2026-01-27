"use client";

import { useMutation } from "@apollo/client";
import { DELETE_ARTICLE } from "@/lib/queries";
import { useRouter } from "next/navigation";

interface DeleteArticleButtonProps {
    id: string;
    onSuccess?: (id: string) => void;
}

export default function DeleteArticleButton({ id, onSuccess }: DeleteArticleButtonProps) {
    const [deleteArticle, { loading }] = useMutation(DELETE_ARTICLE);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await deleteArticle({ variables: { id } });
            if (onSuccess) {
                onSuccess(id);
            }
            router.refresh();
        } catch (e) {
            console.error(e);
            alert("Failed to delete");
        }
    };

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleDelete();
            }}
            disabled={loading}
            className="text-muted-foreground hover:text-destructive transition-colors text-xs font-mono uppercase disabled:opacity-50"
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}
