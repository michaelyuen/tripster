import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { defaults, resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Copyright from './components/Copyright';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache,
  resolvers,
  typeDefs
});

cache.writeData({
  data: defaults
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        <Copyright />
      </Router>
    </ApolloProvider>
  );
}

export default App;