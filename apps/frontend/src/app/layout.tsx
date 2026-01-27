import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

export const metadata = {
  title: "Sports Articles",
  description: "Assessment Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen antialiased">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
