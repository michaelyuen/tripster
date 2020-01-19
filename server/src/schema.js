const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    isLoggedIn: Boolean!
  }

  type Mutation {
    login(email: String!, password: String!): String # login token
    signup(email: String!, password: String!): String
  }
`;

module.exports = typeDefs;
