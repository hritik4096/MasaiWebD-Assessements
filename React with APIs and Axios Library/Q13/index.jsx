import React, { useState } from 'react';

const DynamicEmailForm = () => {
  const [emails, setEmails] = useState(['']);
  const [errors, setErrors] = useState([]);

  const handleEmailChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const validateEmails = () => {
    const newErrors = emails.map((email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return !regex.test(email) && email !== '' ? 'Invalid email' : '';
    });

    setErrors(newErrors);
    return !newErrors.some((error) => error !== '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmails()) {
      alert('Form submitted successfully!');
    } else {
      alert('Please fix the errors.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Dynamic Email Form</h2>
        {emails.map((email, index) => (
          <div key={index}>
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e)}
              placeholder={`Enter email ${index + 1}`}
            />
            {errors[index] && <span style={{ color: 'red' }}>{errors[index]}</span>}
          </div>
        ))}
        <button type="button" onClick={addEmailField}>
          Add Email
        </button>
        <button type="submit">Submit</button>
      </form>
      
      {/* Display the entered emails below */}
      <div>
        <h3>Entered Emails:</h3>
        <ul>
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicEmailForm;