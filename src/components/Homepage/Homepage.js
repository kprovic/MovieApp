import React, { useState, useEffect } from "react";
import HorizontalScroll from "react-scroll-horizontal";
import "./homepage.css";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const [popMovies, setPopMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loadingPop, setLoadingPop] = useState(true);
  const [loadingR, setLoadingR] = useState(true);
  const [id, setId] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //most popular movies
    fetch(
      "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=88fe90b2eb54e7f74186542fd2905c27"
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
          setPopMovies(data.results.slice(0, 15));
          setLoadingPop(false);
        },
        (error) => {
          setError(error);
        }
      );
    //top rated
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=88fe90b2eb54e7f74186542fd2905c27"
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
          setTopMovies(data.results.slice(0, 15));
          setLoadingR(false);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

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
      {loadingPop ? (
        <div className="bars">
          <Bars color="white" arialLabel="loading-indicator" />
        </div>
      ) : loadingR ? (
        <div className="bars">
          <Bars color="white" arialLabel="loading-indicator" />
        </div>
      ) : (
        <>
          <div>
            <h1 className="heading">Most popular</h1>
            <div className="movies">
              <HorizontalScroll reverseScroll={true}>
                {popMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie"
                    onClick={() => handleClick(movie.id)}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                      }
                      alt="Movie poster"
                      className="img"
                    />
                    <div className="title">
                      <p>{movie.title}</p>
                      <span className="vote">
                        {movie.vote_average}
                        <i className="fas fa-star star"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          </div>
          <div className="toprated">
            <h1 className="heading">Top rated</h1>
            <div className="movies">
              <HorizontalScroll reverseScroll={true}>
                {topMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie"
                    onClick={() => handleClick(movie.id)}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                      }
                      alt="movieposter"
                      className="img"
                    />
                    <div className="title">
                      <p>{movie.title}</p>
                      <span className="vote">
                        {movie.vote_average}
                        <i className="fas fa-star star"></i>
                      </span>
                    </div>
                  </div>
                ))}
              </HorizontalScroll>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Homepage;
