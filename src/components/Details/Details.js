import React, { useState, useEffect } from "react";
import "./details.css";
import { Bars } from "react-loader-spinner";
import { useParams } from "react-router-dom";

function Details() {
  const params = useParams();
  const [id, setId] = useState(params.id);
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendationMovies, setRecommendationMovies] = useState([]);
  const [loadingR, setLoadingR] = useState(true);
  const [errorR, setErrorR] = useState(null);

  useEffect(() => {
    //movie details
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=88fe90b2eb54e7f74186542fd2905c27`
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
          setMovie(data);
          setLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    //recommendation
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=88fe90b2eb54e7f74186542fd2905c27`
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
          setRecommendationMovies(data.results.slice(0, 5));
          setLoadingR(false);
        },
        (error) => {
          setErrorR(error);
        }
      );
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="bars">
          <Bars color="white" arialLabel="loading-indidetailsor" />
        </div>
      ) : loadingR ? (
        <div className="bars">
          <Bars color="white" arialLabel="loading-indidetailsor" />
        </div>
      ) : (
        <div className="container">
          <div className="container_details">
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
              alt="Movie Poster"
              className="img_details"
            />
            <div className="container_text_details">
              <div>
                <h1 className="title_details">{movie.original_title}</h1>
                <div className="sm_container_details">
                  <span className="sm_item_details">
                    {movie.genres.map((genre) => genre.name + ",")}
                  </span>
                  <span className="sm_item_details">
                    {movie.runtime + " min"}
                  </span>
                  <span className="sm_item_details">
                    {movie.original_language}
                  </span>
                  <span className="sm_item_details exc">
                    {movie.vote_average}
                    <i className="fas fa-star star"></i>
                  </span>
                </div>
              </div>
              <p className="overview_details">{movie.overview}</p>
              <p>{"Release date: " + movie.release_date}</p>
              <div>
                <p>
                  {"Production companies: " +
                    movie.production_companies.map((comp) => comp.name + " ")}
                </p>
                <p>
                  {"Production countries: " +
                    movie.production_countries.map(
                      (country) => country.name + " "
                    )}
                </p>
              </div>
            </div>
          </div>

          <h1 className="rec_title">Recommendation</h1>
          <div className="recommendation_movies">
            {recommendationMovies.map((movie) => (
              <div
                key={movie.id}
                className="details_movie"
                onClick={() => setId(movie.id)}
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                  alt="Movie poster"
                  className="details_img"
                />
                <div className="details_title">
                  <p>{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Details;
