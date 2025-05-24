import React from "react";
import { Provider } from "react-redux";
import { ChakraProvider, Box, Heading, Container } from "@chakra-ui/react";
import store from "./store";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import BookFilter from "./components/BookFilter";
import { addBook } from "./actions/bookActions";
import { connect } from "react-redux";

const App = ({ addBook }) => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Container maxW="container.md" p={4}>
          <Heading mb={6} textAlign="center">
            Book Library
          </Heading>

          <Box mb={8}>
            <BookForm onSubmit={addBook} />
          </Box>

          <BookFilter />

          <BookList />
        </Container>
      </Provider>
    </ChakraProvider>
  );
};

const mapDispatchToProps = {
  addBook,
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);

export default ConnectedApp;
