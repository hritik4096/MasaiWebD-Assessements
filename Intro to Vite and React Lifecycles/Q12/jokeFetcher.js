import React, { useEffect, useState } from "react";
import "./JokeFetcher.css";

function JokeFetcher() {
  const [joke, setJoke] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((data) => setJoke(data))
      .catch((err) => console.error("Error fetching joke:", err));
  }, [reload]);

  const getAnotherJoke = () => {
    setReload((prev) => !prev);
  };

  return (
    <div className="joke-container">
      <div className="joke-card">
        <h3>{joke.setup}</h3>
        <p>{joke.punchline}</p>
        <button onClick={getAnotherJoke}>Get Another Joke</button>
      </div>
    </div>
  );
}

export default JokeFetcher;