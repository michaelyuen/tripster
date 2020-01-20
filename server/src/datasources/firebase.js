const { DataSource } = require("apollo-datasource");
const firebase = require("firebase/app").default;
require("firebase/auth");
// https://stackoverflow.com/questions/41214625/firebase-node-js-error-the-xmlhttprequest-compatibility-library-was-not-foun
global["XMLHttpRequest"] = require("xmlhttprequest").XMLHttpRequest;

class FirebaseAPI extends DataSource {
  constructor({ firebaseConfig }) {
    super();

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
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
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        return "User doesn't exist";
      }

      return await currentUser.delete();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  getCurrentUser() {
    return firebase.auth().currentUser || null;
  }

  isLoggedIn() {
    return this.getCurrentUser() ? true : false;
  }

  async login(args) {
    try {
      const { email, password } = args;
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return user.uid;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async logout() {
    try {
      return await firebase.auth().signOut();
    } catch (error) {
      console.error;
      return error.message;
    }
  }

  async reloadUser() {
    try {
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        return "No user is logged in";
      }

      return await currentUser.reload();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async sendEmailVerification() {
    try {
      const currentUser = this.getCurrentUser();

      if (!currentUser) {
        return "No user is logged in";
      }

      if (currentUser.emailVerified) {
        return "User's email is already verified";
      }

      return await currentUser.sendEmailVerification();
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      return await firebase.auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async signup(args) {
    try {
      const { email, password } = args;
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Attempt to send email verification
      await this.sendEmailVerification();

      return user.uid;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async verifyEmail(code) {
    try {
      const _ = await firebase.auth().applyActionCode(code);
      return await this.reloadUser();
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }
}

module.exports = FirebaseAPI;
