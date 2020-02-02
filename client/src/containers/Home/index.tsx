import React from "react";
import { useHistory } from "react-router-dom";
import Trips from "components/Trips";
import Copyright from "components/Copyright";
import { LayoutLarge } from "components/Layout";
import Button from "components/Button";

export default function NavTabs() {
  const history = useHistory();

  return (
    <LayoutLarge>
      <Trips />
      <Button
        onClick={() => {
          history.push("/login");
        }}
      >
        Logout
      </Button>
      <Copyright />
    </LayoutLarge>
  );
}
