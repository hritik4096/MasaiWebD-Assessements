import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <header>
        <h1>My Vite Website</h1>
      </header>

      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <main>
        <h2>Welcome to My Vite App!</h2>
        <p>This is a simple layout created using React and Vite.</p>
      </main>

      <footer>
        <p>&copy; 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;