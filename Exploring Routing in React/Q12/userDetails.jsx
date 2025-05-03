// UserDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulated users list
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    return (
      <Box p={5}>
        <Text fontSize="2xl" color="red.500">User not found</Text>
        <Button mt={4} onClick={() => navigate("/users")} colorScheme="teal">
          Go Back to Users List
        </Button>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Text fontSize="2xl">User Details for {user.name}</Text>
      <Text fontSize="lg" mt={2}>ID: {user.id}</Text>
      {/* Additional user details could go here */}
    </Box>
  );
}

export default UserDetails;