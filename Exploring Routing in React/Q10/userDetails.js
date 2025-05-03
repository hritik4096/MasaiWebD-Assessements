import React from 'react';
import { useParams } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();  // Capture the dynamic 'id' parameter from the URL

  // User data based on the id (in a real-world app, you'd fetch this from an API or database)
  const users = [
    { id: 1, name: 'Alice', details: 'Details of Alice' },
    { id: 2, name: 'Bob', details: 'Details of Bob' },
    { id: 3, name: 'Charlie', details: 'Details of Charlie' }
  ];

  const user = users.find(user => user.id === parseInt(id)); // Find the user by ID

  return (
    <div>
      {user ? (
        <h1>{user.details}</h1>
      ) : (
        <h1>User not found</h1>
      )}
    </div>
  );
}

export default UserDetails;