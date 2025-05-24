import React, { useState, useEffect } from "react";
import {
  Button, FormControl, FormLabel, Input, Select, VStack,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

const genres = ["Fiction", "Non-fiction", "Mystery", "Sci-fi", "Biography"];

const BookForm = ({ onSubmit, initialData = null, onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(genres[0]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setGenre(initialData.genre);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title || !author) return;
    const book = {
      id: initialData ? initialData.id : uuidv4(),
      title,
      author,
      genre,
      read: initialData ? initialData.read : false,
    };
    onSubmit(book);
    if (!initialData) {
      setTitle("");
      setAuthor("");
      setGenre(genres[0]);
    }
    if (onClose) onClose();
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Author</FormLabel>
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Genre</FormLabel>
        <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button colorScheme="teal" onClick={handleSubmit}>
        {initialData ? "Update Book" : "Add Book"}
      </Button>
    </VStack>
  );
};

export default BookForm;
