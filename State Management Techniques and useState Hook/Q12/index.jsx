import React, { useState } from 'react';

function CounterWithStepControl() {
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  const handleIncrease = () => {
    setCounter(prevCounter => prevCounter + step);
  };

  const handleDecrease = () => {
    setCounter(prevCounter => Math.max(0, prevCounter - step));
  };

  const handleStepChange = (e) => {
    const newStep = parseInt(e.target.value, 10);
    if (!isNaN(newStep) && newStep > 0) {
      setStep(newStep);
    }
  };

  return (
    <div>
      <h1>Counter with Step Control</h1>
      <p>Counter: {counter}</p>
      <div>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
      </div>
      <div>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={handleStepChange}
          min="1"
        />
      </div>
    </div>
  );
}

export default CounterWithStepControl;