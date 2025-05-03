import React, { useState, useEffect } from "react";

function CounterApp() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log(`Counter value: ${counter}`);
  }, [counter]);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Counter: {counter}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default CounterApp;