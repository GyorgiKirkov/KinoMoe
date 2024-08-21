import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MoviesHomePage.module.css";
import MovieCard, { Movies } from "../../components/MovieCard/movieCard";
import Banner from "../../components/Banner/Banner";
import MoviePopOutCard from "../../components/MoviePopOutCard/MoviePopOutCard";

const MoviesHomePage = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");


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

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const clickStartTime = useRef(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const threshold = 10;

  const handleMouseDown = (e: React.MouseEvent) => {
    clickStartTime.current = new Date().getTime();
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent, movie: Movies) => {
    const clickEndTime = new Date().getTime();
    const endX = e.clientX;
    const endY = e.clientY;

    const timeDiff = clickEndTime - clickStartTime.current;
    const xDiff = Math.abs(endX - startX.current);
    const yDiff = Math.abs(endY - startY.current);

    if (timeDiff < 200 && xDiff < threshold && yDiff < threshold) {
      setSelectedMovie(movie);
    }
  };

  const renderMoviesByType = (type: string) => {
    return movies
      .filter((movie) => movie.type.toLowerCase() === type.toLowerCase())
      .map((movie) => (
        <div key={movie.id} onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, movie)}>
          <MovieCard movie={movie} />
        </div>
      ));
  };

  const renderMoviesByCategoryInline = (category: string) => {
    return (
      <div className={styles.inlineMovieList}>
        {movies
          .filter((movie) => movie.type.toLowerCase() === category.toLowerCase())
          .map((movie) => (
            <div key={movie.id} onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, movie)}>
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    );
  };

  const renderMoviesByCategory = (category: string) => {
    if (category === "Popular") {
      return (
        <div className={styles.movieSection}>
          <h2 className="text-white">Most Watched</h2>
          <div className={styles.inlineMovieList}>{renderTopWatchedMovies()}</div>
        </div>
      );
    } else if (category && category !== "showAll") {
      return (
        <div className={styles.movieSection}>
          <h2 className="text-white">{category}</h2>
          {renderMoviesByCategoryInline(category)}
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.movieSection}>
            <h2 className="text-white">Most Watched</h2>
            <Slider {...sliderSettings} className={styles.slider}>{renderTopWatchedMovies()}</Slider>
          </div>
          <div className={styles.movieSection}>
            <h2 className="text-white">Action</h2>
            <Slider {...sliderSettings} className={styles.slider}>{renderMoviesByType("action")}</Slider>
          </div>
          <div className={styles.movieSection}>
            <h2 className="text-white">Kids</h2>
            <Slider {...sliderSettings} className={styles.slider}>{renderMoviesByType("kids")}</Slider>
          </div>
          <div className={styles.movieSection}>
            <h2 className="text-white">Horror</h2>
            <Slider {...sliderSettings} className={styles.slider}>{renderMoviesByType("horror")}</Slider>
          </div>
          <div className={styles.movieSection}>
            <h2 className="text-white">Drama</h2>
            <Slider {...sliderSettings} className={styles.slider}>{renderMoviesByType("drama")}</Slider>
          </div>
        </>
      );
    }
  };

  const renderTopWatchedMovies = () => {
    const topWatchedMovies = [...movies]
      .sort((a, b) => b.watched - a.watched)
      .slice(0, 10);

    return topWatchedMovies.map((movie) => (
      <div key={movie.id} onMouseDown={handleMouseDown} onMouseUp={(e) => handleMouseUp(e, movie)}>
        <MovieCard movie={movie} />
      </div>
    ));
  };

  return (
    <div className={styles.moviesHomepage}>
      <Banner onSelectCategory={setSelectedCategory} />
      <div className="container-fluid">
        {renderMoviesByCategory(selectedCategory)}
      </div>
      {selectedMovie && (
        <MoviePopOutCard
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MoviesHomePage;
