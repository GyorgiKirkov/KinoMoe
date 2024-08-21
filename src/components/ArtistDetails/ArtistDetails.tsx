import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ArtistDetails.module.css";

interface Artist {
  id: string;
  name: string;
  image: string;
  profileImage: string;
  comments: string;
  favoriteMovies: string[];
  awards: string[];
}

interface Movie {
  id: string;
  name: string;
  age: string;
  type: string;
  watched: string;
  "artist/actor": string;
  date: string;
  comments: string;
  videoURL: string;
  img: string;
  [key: string]: any;
}

const ArtistDetails: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:3000/artists/${artistId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch artist details");
        }
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchArtist();
    fetchMovies();
  }, [artistId]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  const artistMovies = movies.filter(movie => movie["artist/actor"] === artist.name);

  console.log("Artist Movies: ", artistMovies);

  const formatImageName = (name: string): string => {
    return name.replace(/\s+/g, '');
  };

  const profileImageSrc = `/img/${formatImageName(artist.name)}.png`;

  return (
    <div className={`${styles.artistDetails}`}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <img
            src={profileImageSrc}
            alt={artist.name}
            className={styles.profileImage}
            onError={(e) => (e.currentTarget.src = "/img/default.png")} 
          />
          <div className={`text-center ${styles.info}`}>
            <h2 className="text-white">{artist.name}</h2>
            <p className="text-white">{artist.comments}</p>
            <button className="btn btn-success">See more</button>
          </div>
        </div>
        <div className={styles.movies}>
          <h3>Филмови</h3>
          <div className={styles.movieList}>
            {artistMovies.length > 0 ? (
              artistMovies.map((movie: Movie) => (
                <img key={movie.id} src={movie.img} alt={movie.name} className={styles.movieImage} />
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </div>
        <div className={styles.awards}>
          <ul>
            {artist.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
