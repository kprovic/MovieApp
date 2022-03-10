import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const options = [
  { value: "28", label: "Action" },
  { value: "12", label: "Adventure" },
  { value: "16", label: "Animation" },
  { value: "35", label: "Comedy" },
  { value: "80", label: "Crime" },
  { value: "99", label: "Documentary" },
  { value: "10751", label: "Family" },
  { value: "14", label: "Fantasy" },
  { value: "36", label: "History" },
  { value: "27", label: "Horror" },
  { value: "10402", label: "Music" },
  { value: "9648", label: "Mystery" },
  { value: "10749", label: "Romance" },
  { value: "878", label: "Science Fiction" },
  { value: "10770", label: "TV movie" },
  { value: "53", label: "Thriller" },
  { value: "10752", label: "War" },
  { value: "37", label: "Western" },
];
const customStyles = {
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 2,
    color: "white",
    cursor: "pointer",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "white",
    marginBottom: 3,
    marginTop: 3,
    width: 1.5,
  }),
  control: () => ({
    backgroundColor: "black",
    border: "",
    display: "flex",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: 25,
    fontFamily: "Raleway, sans-serif",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: 25,
    fontFamily: "Raleway, sans-serif",
    fontWeight: "bold",
    color: "white",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "black",
    fontWeight: "bold",
    minWidth: 180,
  }),
  option: (provided) => ({
    ...provided,
    color: "white",
    fontFamily: "Raleway, sans-serif",
    fontSize: 20,
    backgroundColor: "transparent",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "white",
      color: "black",
    },
  }),
};

function Header() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [redirectCat, setRedirectCat] = useState(false);

  const navigate = useNavigate();
  const notify = () =>
    toast.error("Please enter a search term !", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const clearWaitingQueue = () => {
    toast.clearWaitingQueue();
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value != "") {
      setRedirect(true);
    } else {
      notify();
      clearWaitingQueue();
    }
  };
  useEffect(() => {
    if (redirect) {
      navigate(`/search/${value}`);
      setRedirect(false);
    }
  });
  useEffect(() => {
    let cat = category.value;
    setRedirectCat(true);
    if (redirectCat) {
      navigate(`/category/${cat}`);
    }
  }, [category]);

  return (
    <div className="header_container">
      <div className="home_cat">
        <h1 className="header_h1">
          <Link to="/">Home</Link>
        </h1>
        <Select
          onChange={setCategory}
          className="select"
          options={options}
          placeholder="Category"
          styles={customStyles}
          isSearchable={false}
          value={null}
        />
      </div>
      <div className="header_logocontainer">
        <span className="header_logoicon">
          <i className="fas fa-film"></i>
        </span>
        <h1 className="header_logo">MovieApp</h1>
      </div>

      <div className="header_right">
        <form className="header_searchcontainer" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="header_search"
            onChange={handleChange}
          />
          <span className="header_searchicon" onClick={handleSubmit}>
            <i className="fa fa-search"></i>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Header;
