import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function ComponentB() {
  const { theme } = useContext(ThemeContext);

  const style = {
    padding: "1rem",
    backgroundColor: theme === "light" ? "#eee" : "#555",
    color: theme === "light" ? "#000" : "#fff",
    borderRadius: "8px",
  };

  return (
    <div style={style}>
      <h3>Component B (Themed)</h3>
      <p>The current theme is: {theme}</p>
    </div>
  );
}

export default ComponentB;