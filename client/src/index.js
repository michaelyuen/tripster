import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { defaults, resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import * as serviceWorker from './serviceWorker';
import App from './App';

const isProduction = process.env.NODE_ENV === 'production';
const cache = new InMemoryCache().writeData({ data: defaults });

const client = new ApolloClient({
  uri: `${isProduction ? 'https://tripster-apollo.netlify.com' : 'http://localhost:9000'}/.netlify/functions/graphql`, 
  cache,
  resolvers,
  typeDefs
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
);

serviceWorker.register();
