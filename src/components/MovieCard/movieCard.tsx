import React from "react";
import { Link } from "react-router-dom";
import cardStyle from "./movieCard.module.css";

export  interface Movies {
  id: string;
  age: string;
  name: string;
  type: string;
  watched: number; 
  date: string;
  comments: string;
  videoURL?: string;
  audioURL?: string;
  img: string;
}

interface MovieCardProps {
  movie: Movies;
 
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  console.log(movie.id); 

  return (
    <div className={` m-4 ${cardStyle.card}`}>
      <img src={movie.img} className={`card-img-top ${cardStyle.cardImg}`} alt={movie.name} />
    </div>
  );
};

export default MovieCard;
