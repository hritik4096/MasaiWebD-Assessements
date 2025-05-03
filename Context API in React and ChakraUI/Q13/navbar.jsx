import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);

  return (
    <nav style={{ padding: "1rem", background: "#ddd" }}>
      <button onClick={toggleAuth}>
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </nav>
  );
}

export default Navbar;