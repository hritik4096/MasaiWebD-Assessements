// App.jsx
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import Users from "/Users";
import UserDetails from "/UserDetails";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" p={5}>
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </ChakraProvider>
  );
}

export default App;