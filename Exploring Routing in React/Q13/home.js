// Home.js
import { Link } from "react-router-dom";
import MovieList from "./MovieList";

function Home() {
  return (
    <div>
      <h1>Welcome to the Movie Website</h1>
      <Link to="/add-movie">Add New Movie</Link>
      <MovieList />
    </div>
  );
}


// MovieList.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import MovieItem from "/MovieItem";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesCollection = collection(db, "movies");
      const movieSnapshot = await getDocs(moviesCollection);
      const movieList = movieSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map(movie => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default {Home,MovieList};