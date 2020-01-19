require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const env = require("./env");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const FirebaseAPI = require("./datasources/firebase");

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_PROJECT_ID,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.MEASUREMENT_ID
};

const dataSources = () => ({
  firebaseAPI: new FirebaseAPI({ firebaseConfig })
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));
}
