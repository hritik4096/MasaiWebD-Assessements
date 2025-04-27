import React, { useState } from 'react';

function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);  

  const toggleMessage = () => {
    setIsVisible(!isVisible); 
  };

  return (
    <div>
      <button onClick={toggleMessage}>
        {isVisible ? 'Hide' : 'Show'}  {/* Dynamically toggle button label */}
      </button>
      {isVisible && <p>Hello, welcome to React state management!</p>}  {/* Conditionally render message */}
    </div>
  );
}

export default ToggleMessage;