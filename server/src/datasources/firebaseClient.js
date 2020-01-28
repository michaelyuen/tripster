const { DataSource } = require("apollo-datasource");
const { ApolloError, AuthenticationError } = require("apollo-server-lambda");

class FirebaseClient extends DataSource {
  constructor({ firebase }) {
    super();
    this.firebase = firebase;
  }

  initialize(config) {
    this.context = config.context;
  }

  async login(args) {
    try {
      const { email, password } = args;
      const { user } = await this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      /**
       * Immediately logout
       * Don't want to interact with firebase in a stateful manner
       * i.e., token is what will determine if user is logged in, not firebase
       */
      this.firebase.auth().signOut();
      return user.getIdToken();
    } catch (error) {
      console.error(error);
      throw new AuthenticationError(error.message);
    }
  }

  async sendEmailVerification(customToken) {
    if (!this.context.user) {
      throw new AuthenticationError("Operation requires authenticated user");
    }

    if (this.context.user.emailVerified) {
      throw new ApolloError("User's email is already verified");
    }

    try {
      const { user } = await this.firebase
        .auth()
        .signInWithCustomToken(customToken);
      await user.sendEmailVerification();
      this.firebase.auth().signOut();
      return;
    } catch (error) {
      console.error(error);
      throw new ApolloError(error.message);
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      return await this.firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error(error);
      throw new ApolloError(error.message);
    }
  }

  async signup(args) {
    if (this.context.user) {
      throw new AuthenticationError("Why are you trying to sign up again?");
    }

    try {
      const { email, password } = args;
      const {
        user
      } = await this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      user.sendEmailVerification();

      /**
       * Immediately logout
       * Don't want to interact with firebase in a stateful manner
       * i.e., token is what will determine if user is logged in, not firebase
       */
      this.firebase.auth().signOut();
      return user;
    } catch (error) {
      console.error(error);
      throw new AuthenticationError(error.message);
    }
  }

  async verifyEmail(code) {
    try {
      return await this.firebase.auth().applyActionCode(code);
    } catch (error) {
      console.error(error);
      throw new ApolloError(error.message);
    }
  }
}

module.exports = FirebaseClient;
