require("dotenv").config();
const { ApolloServer } = require("apollo-server-lambda");
const firebase = require("firebase/app").default;
require("firebase/auth");
const env = require("../env");
const typeDefs = require("../schema");
const resolvers = require("../resolvers");
const FirebaseAPI = require("../datasources/firebase");

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_PROJECT_ID,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const dataSources = () => ({
  firebaseAPI: new FirebaseAPI({ firebase })
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  // TODO: Make these ENV specific
  playground: true,
  introspection: true
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
