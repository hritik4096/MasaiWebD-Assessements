import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Main() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <main style={{ padding: "1rem" }}>
      <h1>{isAuthenticated ? "You are logged in!" : "Please log in to continue."}</h1>
    </main>
  );
}

export default Main;