import React, { useState, useEffect } from "react";

function LoggerComponent() {
  useEffect(() => {
    console.log("Component Mounted");

    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return <div>Hello! I am a component.</div>;
}

function App() {
  const [showComponent, setShowComponent] = useState(true);

  const toggleComponent = () => {
    setShowComponent((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={toggleComponent}>
        {showComponent ? "Hide" : "Show"} Component
      </button>

      {/* Conditional rendering of LoggerComponent */}
      {showComponent && <LoggerComponent />}
    </div>
  );
}

export default App;