const resolvers = {
  Query: {
    currentUser: async (_, __, { dataSources: { firebaseAdmin } }) =>
      firebaseAdmin.getCurrentUser(),
    sendEmailVerification: async (_, __, { dataSources }) => {
      const { firebaseAdmin, firebaseClient } = dataSources;
      const customToken = await firebaseAdmin.getCustomToken();
      return firebaseClient.sendEmailVerification(customToken);
    },
    sendPasswordResetEmail: async (
      _,
      { email },
      { dataSources: { firebaseClient } }
    ) => firebaseClient.sendPasswordResetEmail(email)
  },
  Mutation: {
    deleteUser: async (_, __, { dataSources: { firebaseAdmin } }) =>
      firebaseAdmin.deleteUser(),
    login: async (_, args, { dataSources: { firebaseClient } }) =>
      await firebaseClient.login(args),
    signup: async (_, args, { dataSources }) => {
      const { firebaseAdmin, firebaseClient } = dataSources;
      const user = await firebaseClient.signup(args);
      firebaseAdmin.createUser(user.uid, args);
      return user.getIdToken();
    },
    verifyEmail: async (_, { code }, { dataSources: { firebaseClient } }) =>
      firebaseClient.verifyEmail(code)
  }
};

module.exports = resolvers;
