import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export default function SignUp() {
  const [credentials, setCredentials] = useState({});
  const [signup, { data }] = useMutation(SIGNUP);

  if (data) return <Redirect to="/" />;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (credentials) signup({ variables: credentials });
      }}
    >
      <label>email</label>
      <input
        onChange={e =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <label>password</label>
      <input
        onChange={e =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit">Sign Up</button>
      <Link to="login">Already have an account? Sign in</Link>
    </form>
  );
}
