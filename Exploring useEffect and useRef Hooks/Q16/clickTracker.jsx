import React, { useRef, useEffect } from "react";

function ClickTracker() {
  const clickCountRef = useRef(0);

  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  const handleClick = () => {
    clickCountRef.current += 1;
    console.log(`Button clicked ${clickCountRef.current} times`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

export default ClickTracker;