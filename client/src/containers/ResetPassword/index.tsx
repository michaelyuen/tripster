import React, { useState, ReactNode } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Input from "components/Input";
import Form from "components/Form";
import Button from "components/Button";
import { LayoutSmall } from "components/Layout";
import { noop } from "utils/fn";

interface FormStateMap {
  [index: string]: ReactNode;
}

const CONFIRM_PASSWORD_RESET = gql`
  mutation confirmPasswordReset($code: String!, $newPassword: String!) {
    confirmPasswordReset(code: $code, newPassword: $newPassword)
  }
`;

export default function ResetPassword(props: any) {
  const code = new URLSearchParams(props.location.search).get("oobCode");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordReset, { called, data, error, loading }] = useMutation(
    CONFIRM_PASSWORD_RESET
  );
  console.log(called, data, error, loading);
  const formStateMap: FormStateMap = {
    defaultState: (
      <>
        <Form
          onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            if (
              newPassword &&
              confirmPassword &&
              newPassword === confirmPassword
            ) {
              confirmPasswordReset({ variables: { code, newPassword } }).catch(
                noop
              );
            }
          }}
        >
          <h1>🏕</h1>
          <Input
            name="New Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            required
            type="password"
          />
          <Input
            name="Confirm Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
            type="password"
          />
          <Button type="submit">Submit</Button>
        </Form>
        {newPassword &&
          confirmPassword &&
          newPassword !== confirmPassword &&
          "Your passwords don't match, dummy!"}
        {error && "Something went wrong. Please try again."}
      </>
    ),
    loading: "Loading...",
    success: (
      <>
        <h1 style={{ textAlign: "center" }}>
          <span role="img" aria-label="UFO emoji">
            🛸
          </span>
        </h1>
        <h3>Great success!</h3>
        <div>Your password has been reset.</div>
      </>
    )
  };
  let state: string = "defaultState";

  if (called) {
    if (loading) {
      state = "loading";
    }

    if (data) {
      state = "success";
    }
  }

  return <LayoutSmall>{formStateMap[state]}</LayoutSmall>;
}
