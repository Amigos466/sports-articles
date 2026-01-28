"use client";
// No sense to make this page server side, because it only for modification functionality

import { useMutation, useQuery } from "@apollo/client";
import { GET_ARTICLE, UPDATE_ARTICLE } from "@/lib/queries";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditArticle() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();

    const { data, loading: queryLoading } = useQuery(GET_ARTICLE, {
        variables: { id },
        skip: !id,
    });

    const [updateArticle, { loading: mutationLoading }] = useMutation(UPDATE_ARTICLE);

    // Form state
    const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
    const [error, setError] = useState("");

    // Populate form when data loads
    useEffect(() => {
        if (data?.article) {
            setForm({
                title: data.article.title,
                content: data.article.content,
                imageUrl: data.article.imageUrl || "",
            });
        }
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!form.title || !form.content) {
            setError("Title and Content are required");
            return;
        }

        try {
            await updateArticle({
                variables: {
                    id,
                    title: form.title,
                    content: form.content,
                    imageUrl: form.imageUrl || null
                }
            });
            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (queryLoading) return <div className="p-8 text-center">Loading article...</div>;

    return (
        <div className="p-4 sm:p-8 max-w-2xl mx-auto py-8 sm:py-16">
            <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm font-medium transition-colors">
                &larr; Back to List
            </Link>
            <h1 className="text-3xl font-bold mb-8 tracking-tight">Edit Article</h1>

            {error && <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 mb-6 rounded-lg font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Title</label>
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-sm"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Content</label>
                    <textarea
                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-sm"
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Image URL</label>
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-sm"
                        value={form.imageUrl}
                        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                    />
                </div>
                <button
                    disabled={mutationLoading}
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                >
                    {mutationLoading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
