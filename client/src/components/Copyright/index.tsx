import React from "react";

export default function Copyright() {
  return (
    <footer>
      {"Copyright © "}
      <a href="https://tripster.vip">Tripster</a> {new Date().getFullYear()}
      {"."}
    </footer>
  );
}
