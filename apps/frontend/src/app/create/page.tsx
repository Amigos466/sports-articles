"use client";
// No sense to make this page server side, because it only for creation functionality

import { useMutation } from "@apollo/client";
import { CREATE_ARTICLE } from "@/lib/queries";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateArticle() {
    const [createArticle, { loading }] = useMutation(CREATE_ARTICLE);
    const router = useRouter();
    const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!form.title || !form.content) {
            setError("Title and Content are required");
            return;
        }

        try {
            await createArticle({ variables: form });
            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-4 sm:p-8 max-w-2xl mx-auto py-8 sm:py-16">
            <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm font-medium transition-colors">
                &larr; Back to List
            </Link>
            <h1 className="text-3xl font-bold mb-8 tracking-tight">Create New Article</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Title</label>
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
                        placeholder="Article title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Content</label>
                    <textarea
                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
                        placeholder="Write your article content..."
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Image URL (Optional)</label>
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
                        placeholder="https://example.com/image.jpg"
                        value={form.imageUrl}
                        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                    />
                </div>
                {error && <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 mb-6 rounded-lg font-medium">{error}</div>}
                <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
                >
                    {loading ? "Creating..." : "Create Article"}
                </button>
            </form>
        </div>
    );
}
