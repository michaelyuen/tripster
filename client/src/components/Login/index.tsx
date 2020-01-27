import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login() {
  const [credentials, setCredentials] = useState({});
  const [login, { data }] = useMutation(LOGIN);

  if (
    data &&
    data.login !==
      "The password is invalid or the user does not have a password." &&
    data.login !==
      "Too many unsuccessful login attempts. Please try again later."
  )
    return <Redirect to="/dashboard" />;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (credentials) login({ variables: credentials });
      }}
    >
      <input
        onChange={e =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <input
        onChange={e =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit">Sign In</button>
      <Link to="/forgot">Forgot password?</Link>
      <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
    </form>
  );
}
