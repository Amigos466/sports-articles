import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles($skip: Int, $take: Int) {
    articles(skip: $skip, take: $take) {
      id
      title
      content
      imageUrl
      createdAt
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content
      imageUrl
      createdAt
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!, $imageUrl: String) {
    createArticle(title: $title, content: $content, imageUrl: $imageUrl) {
      id
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: ID!, $title: String, $content: String, $imageUrl: String) {
    updateArticle(id: $id, title: $title, content: $content, imageUrl: $imageUrl) {
      id
    }
  }
`;
