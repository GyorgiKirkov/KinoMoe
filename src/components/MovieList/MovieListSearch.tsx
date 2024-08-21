import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieListSearchStyle from "./MovieListSearch.module.css";
import MovieCard, { Movies } from "../MovieCard/movieCard";

interface SearchPopupProps {
  onClose: () => void;
}

const SearchPopup: React.FC<SearchPopupProps> = ({ onClose }) => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
          throw new Error("Error data not found");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
    onClose();
  };

  return (
    <div className={MovieListSearchStyle.overlay}>
      <div className={MovieListSearchStyle.popup}>
        <div className={MovieListSearchStyle.header}>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={MovieListSearchStyle.searchInput}
          />
          <button
            className={MovieListSearchStyle.closeButton}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className={MovieListSearchStyle.movieList}>
          {filteredMovies.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieClick(movie.id)}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
