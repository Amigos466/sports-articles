"use client";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { useMemo } from "react";

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
    const client = useMemo(() => {
        return new ApolloClient({
            link: new HttpLink({
                uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/graphql",
            }),
            cache: new InMemoryCache(),
        });
    }, []);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
