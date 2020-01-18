export const typeDefs = `
  type User {
    id: String,
  }

  type Mutation {
    getUser(user: User!): Object
  }

  type Query {
    user: User
  }
`;
