import React from "react";
import { useNavigate } from "react-router-dom";

// TMDB Img API
const IMG_API = process.env.REACT_APP_IMG_API_KEY;

const setVote = (vote) => {
  if (vote >= 8) {
    return "greenColor";
  } else if (vote >= 5) {
    return "orangeColor";
  } else {
    return "redColor";
  }
};

function Movie({ title, poster_path, overview, vote_average, id }) {
  let navigate = useNavigate();

  function countTitle() {
    if (title.length <= 15) {
      return title;
    } else {
      return title.substring(0, 15) + "...";
    }
  }

  var posterPath =
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80";

  if (poster_path) {
    posterPath = IMG_API + poster_path;
  }

  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=859&q=80"
        }
        alt={title}
      />
      <div className="movie-info">
        <h3>{countTitle()}</h3>
        <span className={`tag ${setVote(vote_average)}`}>{vote_average}</span>
      </div>

      <div className="movie-over">
        <p>{overview.substring(0, 150) + "..."}</p>
        <br />
        <button
          class="button-37"
          onClick={() => {
            navigate("/details", {
              state: { id: id, overview: overview, title, posterPath },
            });
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default Movie;
