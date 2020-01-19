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

  isLoggedIn() {
    return firebase.auth().currentUser ? true : false;
  }

  async login(args) {
    try {
      const { email, password } = args;
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return res && res.user && res.user.uid;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }

  async signup(args) {
    try {
      const { email, password } = args;
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return res && res.user && res.user.uid;
    } catch (error) {
      console.error(error);
      return error.message;
    }
  }
}

module.exports = FirebaseAPI;
