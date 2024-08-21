// MoviePopOutCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHeart, faPlus, faShareSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import styles from "./MoviePopOutCard.module.css";
import { useRegistration } from "../LogIn/RegistrationContext/RegistrationContext";

interface Movie {
  id: string;
  name: string;
  type: string;
  date: string;
  img: string;
  comments: string;
  watched: number;
  [key: string]: any;
}

interface MoviePopOutCardProps {
  movie: Movie | null;
  onClose: () => void;
}

const MoviePopOutCard: React.FC<MoviePopOutCardProps> = ({ movie, onClose }) => {
  const navigate = useNavigate();
  const { registrationData, setRegistrationData } = useRegistration();
  const [showShareButtons, setShowShareButtons] = useState(false);

  if (!movie) return null;

  const isLiked = registrationData.favoriteMovies?.includes(movie.id);
  const isWatchLater = registrationData.watchLaterMovies?.includes(movie.id);

  const handleAddFavorite = () => {
    const updatedFavorites = isLiked 
      ? registrationData.favoriteMovies.filter(id => id !== movie.id) 
      : [...registrationData.favoriteMovies, movie.id];
    setRegistrationData({ favoriteMovies: updatedFavorites });
  };

  const handleAddWatchLater = () => {
    const updatedWatchLater = isWatchLater 
      ? registrationData.watchLaterMovies.filter(id => id !== movie.id) 
      : [...registrationData.watchLaterMovies, movie.id];
    setRegistrationData({ watchLaterMovies: updatedWatchLater });
  };

  const shareUrl = window.location.href;

  const toggleShareButtons = () => {
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className={styles.popOutOverlay}>
      <div className={styles.popOutContent} style={{ backgroundImage: `url(${movie.img})` }}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <h2 className={styles.h2Banner}>{movie.name}</h2>
          <p className={styles.pBanner}>{movie.comments}</p>
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.play}`}
              title="Play"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <FontAwesomeIcon icon={faPlay} className={styles.icon} />
              Watch
            </button>
            <button
              className={`${styles.button} ${isLiked ? styles.liked : ''}`}
              title="Heart"
              onClick={handleAddFavorite}
            >
              <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            </button>
            <button
              className={`${styles.button} ${isWatchLater ? styles.watchLater : ''}`}
              title="Watch Later"
              onClick={handleAddWatchLater}
            >
              <FontAwesomeIcon icon={isWatchLater ? faCheck : faPlus} className={styles.icon} />
            </button>
            <button className={styles.button} title="Share" onClick={toggleShareButtons}>
              <FontAwesomeIcon icon={faShareSquare} className={styles.icon} />
            </button>
          </div>
          {showShareButtons && (
            <div className={styles.shareButtons}>
              <FacebookShareButton url={shareUrl} title={movie.name} className={styles.customShareButton}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl} title={movie.name} className={styles.customShareButton}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <ViberShareButton url={shareUrl} title={movie.name} className={styles.customShareButton}>
                <ViberIcon size={32} round />
              </ViberShareButton>
              <LinkedinShareButton url={shareUrl} title={movie.name} className={styles.customShareButton}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <EmailShareButton url={shareUrl} subject={movie.name} body={movie.comments} className={styles.customShareButton}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePopOutCard;
