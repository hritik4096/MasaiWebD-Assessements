import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteBook, toggleReadStatus, editBook } from "../actions/bookActions";
import {
  Box, Button, Flex, Text, Badge, Stack, useDisclosure,
} from "@chakra-ui/react";
import BookForm from "./BookForm";

const BookList = ({
  books,
  filters,
  deleteBook,
  toggleReadStatus,
  editBook,
}) => {
  const [editBookData, setEditBookData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filter books by filters state
  const filteredBooks = books.filter((book) => {
    const matchesAuthor = book.author.toLowerCase().includes(filters.author.toLowerCase());
    const matchesGenre = filters.genre ? book.genre === filters.genre : true;
    const matchesStatus =
      filters.status === "read" ? book.read :
      filters.status === "unread" ? !book.read : true;
    return matchesAuthor && matchesGenre && matchesStatus;
  });

  const handleEditClick = (book) => {
    setEditBookData(book);
    onOpen();
  };

  const handleUpdate = (updatedBook) => {
    editBook(updatedBook);
    onClose();
  };

  return (
    <Box>
      {filteredBooks.length === 0 && <Text>No books found.</Text>}

      <Stack spacing={4}>
        {filteredBooks.map((book) => (
          <Flex
            key={book.id}
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box flex="1" minW="200px" mb={{ base: 2, md: 0 }}>
              <Text fontWeight="bold" fontSize="lg">
                {book.title}
              </Text>
              <Text>Author: {book.author}</Text>
              <Text>Genre: {book.genre}</Text>
              <Badge colorScheme={book.read ? "green" : "red"}>
                {book.read ? "Read" : "Unread"}
              </Badge>
            </Box>

            <Flex gap={2} wrap="wrap">
              <Button size="sm" onClick={() => toggleReadStatus(book.id)}>
                Mark {book.read ? "Unread" : "Read"}
              </Button>

              <Button size="sm" colorScheme="blue" onClick={() => handleEditClick(book)}>
                Edit
              </Button>

              <Button size="sm" colorScheme="red" onClick={() => deleteBook(book.id)}>
                Delete
              </Button>
            </Flex>
          </Flex>
        ))}
      </Stack>

      {/* Edit Modal or inline form */}
      {isOpen && (
        <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
          <Text fontSize="lg" mb={4}>
            Edit Book
          </Text>
          <BookForm initialData={editBookData} onSubmit={handleUpdate} onClose={onClose} />
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  books: state.books,
  filters: state.filters,
});

const mapDispatchToProps = {
  deleteBook,
  toggleReadStatus,
  editBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
