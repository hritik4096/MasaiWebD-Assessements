import React, { useRef } from 'react';

const UncontrolledForm = () => {
 
  const usernameRef = useRef();

 
  const handleSubmit = (event) => {
    event.preventDefault();

    
    const enteredUsername = usernameRef.current.value;

    alert(`Submitted username: ${enteredUsername}`);

    
    usernameRef.current.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            ref={usernameRef} 
            placeholder="Enter username"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;