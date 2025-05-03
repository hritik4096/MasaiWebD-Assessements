// Users.jsx
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

function Users() {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>Users Page</Text>
      {users.map((user) => (
        <Box key={user.id} mb={3}>
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            <Text fontSize="lg" color="teal.500">{user.name}</Text>
          </Link>
        </Box>
      ))}
    </Box>
  );
}

export default Users;