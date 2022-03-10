import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { useParams, useNavigate } from "react-router-dom";
import "./category.css";

function Category() {
  let params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=88fe90b2eb54e7f74186542fd2905c27&sort_by=popularity.desc&with_genres=${params.genre}`
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
    setRedirect(true);
    setId(movie);
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
      ) : (
        <>
          <div className="cat_movies">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="cat_movie"
                onClick={() => handleClick(movie.id)}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                  alt="Movie poster"
                  className="cat_img"
                />
                <div className="cat_title">
                  <p>{movie.title}</p>
                  <span className="cat_vote">
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

export default Category;
