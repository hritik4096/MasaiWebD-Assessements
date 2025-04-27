import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    axios
      .get('https://your-firebase-db.firebaseio.com/users.json')
      .then((response) => {
        const usersData = response.data;
        const usersList = [];
        for (let key in usersData) {
          usersList.push({ id: key, ...usersData[key] });
        }
        setUsers(usersList);
      })
      .catch((err) => {
        setError('Error fetching users: ' + err.message);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (e) => {
    e.preventDefault();
    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid name and email.');
      return;
    }
    axios
      .post('https://your-firebase-db.firebaseio.com/users.json', {
        name,
        email,
      })
      .then(() => {
        setName('');
        setEmail('');
        fetchUsers();
      })
      .catch((err) => {
        setError('Error adding user: ' + err.message);
      });
  };

  const editUser = (id) => {
    const user = users.find((user) => user.id === id);
    setName(user.name);
    setEmail(user.email);
    setEditUserId(id);
  };

  const updateUser = (e) => {
    e.preventDefault();
    if (!name || !email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid name and email.');
      return;
    }
    axios
      .patch(`https://your-firebase-db.firebaseio.com/users/${editUserId}.json`, {
        name,
        email,
      })
      .then(() => {
        setName('');
        setEmail('');
        setEditUserId(null);
        fetchUsers();
      })
      .catch((err) => {
        setError('Error updating user: ' + err.message);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://your-firebase-db.firebaseio.com/users/${id}.json`)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => {
        setError('Error deleting user: ' + err.message);
      });
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={editUserId ? updateUser : addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editUserId ? 'Update' : 'Add'} User</button>
      </form>

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>{user.name} - {user.email}</p>
            <button onClick={() => editUser(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;