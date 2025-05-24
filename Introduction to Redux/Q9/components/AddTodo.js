import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import { Input, Button, HStack } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim() === "") return;
    addTodo({ id: uuidv4(), title, status: false });
    setTitle("");
  };

  return (
    <HStack mt={4}>
      <Input
        placeholder="Add new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleAdd}>
        Add
      </Button>
    </HStack>
  );
};

export default connect(null, { addTodo })(AddTodo);
