const { gql } = require('apollo-server-express');
const pool = require('./db');

const typeDefs = gql`
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
