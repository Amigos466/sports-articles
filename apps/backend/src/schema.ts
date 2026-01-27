import { gql } from "graphql-tag";
import { AppDataSource } from "./db";
import { SportsArticle } from "./entity";
import { IsNull } from "typeorm";

export const typeDefs = gql`
  type SportsArticle {
    id: ID!
    title: String!
    content: String!
    imageUrl: String
    createdAt: String!
  }

  type Query {
    articles(skip: Int = 0, take: Int = 10): [SportsArticle!]!
    article(id: ID!): SportsArticle
  }

  type Mutation {
    createArticle(title: String!, content: String!, imageUrl: String): SportsArticle!
    updateArticle(id: ID!, title: String, content: String, imageUrl: String): SportsArticle!
    deleteArticle(id: ID!): Boolean!
  }
`;

export const resolvers = {
    Query: {
        articles: async (_: any, { skip, take }: { skip: number; take: number }) => {
            const repo = AppDataSource.getRepository(SportsArticle);
            return repo.find({
                order: { createdAt: "DESC" },
                skip,
                take,
                where: { deletedAt: IsNull() }
            });
        },
        article: async (_: any, { id }: { id: string }) => {
            const repo = AppDataSource.getRepository(SportsArticle);
            const article = await repo.findOneBy({ id, deletedAt: IsNull() });
            if (!article) throw new Error("Article not found");
            return article;
        },
    },
    Mutation: {
        createArticle: async (_: any, { title, content, imageUrl }: any) => {
            if (!title || !content) throw new Error("Title and Content are required");
            const repo = AppDataSource.getRepository(SportsArticle);
            const article = repo.create({ title, content, imageUrl });
            return repo.save(article);
        },
        updateArticle: async (_: any, { id, title, content, imageUrl }: any) => {
            const repo = AppDataSource.getRepository(SportsArticle);
            let article = await repo.findOneBy({ id });
            if (!article) throw new Error("Article not found");

            if (title) article.title = title;
            if (content) article.content = content;
            if (imageUrl !== undefined) article.imageUrl = imageUrl;

            return repo.save(article);
        },
        deleteArticle: async (_: any, { id }: any) => {
            const repo = AppDataSource.getRepository(SportsArticle);
            const article = await repo.findOneBy({ id });
            if (!article) throw new Error("Article not found");
            await repo.softRemove(article);
            return true;
        },
    },
};
