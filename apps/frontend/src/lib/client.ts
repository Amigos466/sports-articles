import { print } from "graphql";

export const getClient = () => {
    return {
        query: async ({ query, variables }: { query: any; variables?: any }) => {
            const queryString = print(query);

            const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: queryString,
                    variables,
                }),
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const json = await res.json();

            if (json.errors) {
                throw new Error(json.errors[0].message || "GraphQL Error");
            }

            return { data: json.data };
        },
    };
};
