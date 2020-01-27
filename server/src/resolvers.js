const resolvers = {
  Query: {
    currentUser: (_, __, { dataSources: { firebaseAPI } }) =>
      firebaseAPI.getCurrentUser(),
    sendEmailVerification: async (_, __, { dataSources: { firebaseAPI } }) =>
      firebaseAPI.sendEmailVerification(),
    sendPasswordResetEmail: async (
      _,
      { email },
      { dataSources: { firebaseAPI } }
    ) => firebaseAPI.sendPasswordResetEmail(email)
  },
  Mutation: {
    deleteUser: async (_, __, { dataSources: { firebaseAPI } }) =>
      firebaseAPI.deleteUser(),
    login: async (_, args, { dataSources: { firebaseAPI } }) =>
      await firebaseAPI.login(args),
    signup: async (_, args, { dataSources: { firebaseAPI } }) =>
      await firebaseAPI.signup(args),
    verifyEmail: async (_, { code }, { dataSources: { firebaseAPI } }) =>
      firebaseAPI.verifyEmail(code)
  }
};

module.exports = resolvers;
