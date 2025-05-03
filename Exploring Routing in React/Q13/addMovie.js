// AddMovie.js
import { useState, useEffect } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams(); // for editing a specific movie

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch movie details to prefill the form
      const movieRef = doc(db, "movies", id);
      // Get movie details and prefill form (you would implement a fetch here)
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateDoc(doc(db, "movies", id), { title, description, year });
    } else {
      await setDoc(doc(db, "movies", Date.now().toString()), { title, description, year });
    }
    navigate("/movies");
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Movie" : "Add Movie"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default AddMovie;