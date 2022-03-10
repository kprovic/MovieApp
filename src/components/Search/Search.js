import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./search.css";
import { Bars } from "react-loader-spinner";

function Search() {
  let params = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=88fe90b2eb54e7f74186542fd2905c27&query=${params.movie}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(
        (data) => {
          setMovies(data.results.slice(0, 16));
          setLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
  }, [params]);

  const handleClick = (movie) => {
    setId(movie);
    setRedirect(true);
  };
  useEffect(() => {
    if (redirect) {
      navigate(`/details/${id}`);
    }
  });

  return (
    <>
      {loading ? (
        <div className="bars">
          <Bars color="white" arialLabel="loading-indicator" />
        </div>
      ) : movies.length === 0 && loading === false ? (
        <h1 className="search_nothing">Sorry,nothing found...</h1>
      ) : (
        <>
          <div className="search_movies">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="search_movie"
                onClick={() => handleClick(movie.id)}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                  alt="Movie poster"
                  className="search_img"
                />
                <div className="search_title">
                  <p>{movie.title}</p>
                  <span className="search_vote">
                    {movie.vote_average}
                    <i className="fas fa-star star"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
export default Search;
