import React from "react";
import { connect } from "react-redux";
import { toggleTodo, deleteTodo } from "../actions";
import { Checkbox, IconButton, HStack, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <HStack justifyContent="space-between" my={2}>
      <Checkbox
        isChecked={todo.status}
        onChange={() => toggleTodo(todo.id)}
        flex="1"
      >
        <Text as={todo.status ? "s" : undefined}>{todo.title}</Text>
      </Checkbox>
      <IconButton
        aria-label="Delete todo"
        icon={<DeleteIcon />}
        onClick={() => deleteTodo(todo.id)}
        colorScheme="red"
        size="sm"
      />
    </HStack>
  );
};

export default connect(null, { toggleTodo, deleteTodo })(TodoItem);
