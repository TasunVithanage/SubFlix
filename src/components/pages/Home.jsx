import React, { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import Title from "../Title";
import Movie from "../Movie";

// TMDB APIs
const FEATURED_API = process.env.REACT_APP_FEATURED_API_KEY;
const SEARCH_API = process.env.REACT_APP_SEARCH_API_KEY;

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Popular movies from landing page
  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  // Loop to get all result pages
  function getUrl(API) {
    console.log(API);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 1; i <= data.total_pages; i++) {
          getMovies(API + "&page=" + i);
        }
      });
  }

  // Add all movies to the array
  const getMovies = (API) => {
    setMovies([]);
    console.log(API);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        var newMovies = data.results;
        console.log(newMovies);
        setMovies((prevMovies) => {
          return [...prevMovies, ...newMovies];
        });
        console.log(movies);
      });
  };

  // Movies from search
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getUrl(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="Home">
      <div className="top-container">
        <div className="top-son">
          <Title />
          <SearchBox
            searchTerm={searchTerm}
            handleOnSubmit={handleOnSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </div>
  );
}

export default Home;
