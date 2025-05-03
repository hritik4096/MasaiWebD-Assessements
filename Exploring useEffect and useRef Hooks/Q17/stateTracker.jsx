import React, { useState, useEffect } from "react";

function StateTracker() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log(`State updated: ${number}`);
  }, [number]);

  const updateNumber = () => {
    const randomNum = Math.floor(Math.random() * 100);
    setNumber(randomNum);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Current Number: {number}</h1>
      <button onClick={updateNumber}>Generate Random Number</button>
    </div>
  );
}

export default StateTracker;