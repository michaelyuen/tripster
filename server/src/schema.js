const { gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    currentUser: User
    sendEmailVerification: String
    sendPasswordResetEmail(email: String!): String
  }

  type Mutation {
    deleteUser: String
    login(email: String!, password: String!): String
    signup(email: String!, password: String!): String
    verifyEmail(code: String!): String
  }

  type User {
    email: String
    emailVerified: Boolean!
  }
`;

module.exports = typeDefs;
