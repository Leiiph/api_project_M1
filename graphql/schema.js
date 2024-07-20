import gql from 'graphql-tag';

export const typeDefs = gql`
  type Book {
    id_book: ID!
    name: String!
    author: String!
    state: String!
  }

  type Query {
    books: [Book]
  }
`;