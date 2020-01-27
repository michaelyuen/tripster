import React from "react";
import { useHistory } from "react-router-dom";
import Trips from "../Trips";
import Copyright from "../Copyright";

export default function NavTabs() {
  const history = useHistory();

  return (
    <>
      <Trips />
      <button
        onClick={() => {
          history.push("/login");
        }}
      >
        Logout
      </button>
      <Copyright />
    </>
  );
}
