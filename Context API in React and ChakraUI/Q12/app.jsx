import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import ComponentA from "/ComponentA";

function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const appStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "2rem",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyle}>
      <h1>Context API Theme Toggle</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <ComponentA />
    </div>
  );
}

export default App;