import React from "react";
import { connect } from "react-redux";
import { setAuthorFilter, setGenreFilter, setStatusFilter } from "../actions/filterActions";
import {
  Box, Input, Select, HStack, Text,
} from "@chakra-ui/react";

const genres = ["", "Fiction", "Non-fiction", "Mystery", "Sci-fi", "Biography"];

const BookFilter = ({
  author,
  genre,
  status,
  setAuthorFilter,
  setGenreFilter,
  setStatusFilter,
}) => {
  return (
    <Box mb={6}>
      <Text fontWeight="bold" mb={2}>Filter Books</Text>
      <HStack spacing={4}>
        <Input
          placeholder="Filter by Author"
          value={author}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />

        <Select value={genre} onChange={(e) => setGenreFilter(e.target.value)}>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g || "All Genres"}
            </option>
          ))}
        </Select>

        <Select value={status} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </Select>
      </HStack>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  author: state.filters.author,
  genre: state.filters.genre,
  status: state.filters.status,
});

const mapDispatchToProps = {
  setAuthorFilter,
  setGenreFilter,
  setStatusFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookFilter);
