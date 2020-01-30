import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import 'modern-normalize/modern-normalize.css';

const isProduction = process.env.NODE_ENV === "production";

const client = new ApolloClient({
  uri: `${
    isProduction
      ? "https://tripster-apollo.netlify.com"
      : "http://localhost:9000"
  }/.netlify/functions/graphql`,
  cache: new InMemoryCache(),
  resolvers,
  typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
