// https://stackoverflow.com/questions/41214625/firebase-node-js-error-the-xmlhttprequest-compatibility-library-was-not-foun
global["XMLHttpRequest"] = require("xmlhttprequest").XMLHttpRequest;
const { DataSource } = require("apollo-datasource");

class FirebaseAPI extends DataSource {
  constructor({ firebase }) {
    super();
    this.firebase = firebase;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async deleteUser() {
    try {
      if (!this.context.user) {
        return null;
      }

      return await user.delete();
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  getCurrentUser() {
    if (!this.context.user) {
      return null;
    }

    return this.context.user;
  }

  async login(args) {
    try {
      if (this.context.user) {
        return await user.getIdToken();
      }

      const { email, password } = args;
      const { user } = await this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      /**
       * Immediately logout
       * Don't want to interact with firebase in a stateful manner
       * i.e., token is what will determine if user is logged in, not firebase
       */
      await this.firebase.auth().signOut();
      return await user.getIdToken();
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async sendEmailVerification() {
    try {
      if (!this.context.user) {
        return "No user is logged in";
      }

      if (this.context.user.emailVerified) {
        return "User's email is already verified";
      }

      return await this.context.user.sendEmailVerification;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      return await this.firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async signup(args) {
    try {
      if (this.context.user) {
        return "Why are you trying to sign up again?";
      }

      const { email, password } = args;
      const {
        user
      } = await this.firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Attempt to send email verification
      await user.sendEmailVerification();

      /**
       * Immediately logout
       * Don't want to interact with firebase in a stateful manner
       * i.e., token is what will determine if user is logged in, not firebase
       */
      await this.firebase.auth().signOut();
      return await user.getIdToken();
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async verifyEmail(code) {
    try {
      return await this.firebase.auth().applyActionCode(code);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }
}

module.exports = FirebaseAPI;
