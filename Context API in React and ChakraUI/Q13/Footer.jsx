import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Footer() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <footer style={{ padding: "1rem", background: "#eee" }}>
      <p>{isAuthenticated ? "Welcome, User" : "Please log in"}</p>
    </footer>
  );
}

export default Footer;