import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.md" p={6}>
        <AddTodo />
        <TodoList />
      </Container>
    </ChakraProvider>
  );
}

export default App;
