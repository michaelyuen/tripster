import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Input from "components/Input";
import Form from "components/Form";
import Button from "components/Button";
import { LayoutSmall } from "components/Layout";

const RESET_PASSWORD = gql`
  mutation sendPasswordResetEmail($email: String!) {
    signup(email: $email)
  }
`;

export default function SignUp() {
  const [credentials, setCredentials] = useState({});
  const [sendPasswordResetEmail, { data }] = useMutation(RESET_PASSWORD);

  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <LayoutSmall>
      <Form
        onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (credentials) {
            sendPasswordResetEmail({ variables: credentials });
          }
        }}
      >
        <h1>🏕</h1>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCredentials({
              ...credentials,
              password: e.target.value
            })
          }
          name="Email"
          type="email"
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </LayoutSmall>
  );
}
