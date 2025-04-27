import React, { useState } from 'react';

const ControlledForm = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === '') {
      setError('Username cannot be empty!');
    } else {
      setError('');
      alert(`Submitted username: ${username}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      
      {/* Error message display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ControlledForm;