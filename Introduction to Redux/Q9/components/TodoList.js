import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";
import { VStack, Heading, Box } from "@chakra-ui/react";

const TodoList = ({ todos }) => {
  return (
    <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" maxW="md" mx="auto">
      <Heading size="md" mb={4} textAlign="center">
        Todo List
      </Heading>
      <VStack spacing={3} align="stretch">
        {todos.length === 0 && <Box textAlign="center">No todos yet!</Box>}
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </VStack>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(TodoList);
