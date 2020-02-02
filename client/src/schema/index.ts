import { gql } from "apollo-boost";

export const typeDefs = gql`
  type User {
    email: String!
    emailVerified: Boolean!
    firstName: String!
    lastName: String!
  }
`;
