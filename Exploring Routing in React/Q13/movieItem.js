// MovieItem.js
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function MovieItem({ movie }) {
  const deleteMovie = async () => {
    await deleteDoc(doc(db, "movies", movie.id));
  };

  return (
    <li>
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>{movie.year}</p>
      <Link to={`/add-movie/${movie.id}`}>Edit</Link>
      <button onClick={deleteMovie}>Delete</button>
    </li>
  );
}

export default MovieItem;