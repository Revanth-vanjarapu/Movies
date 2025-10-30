import './MovieCard.css'

import {Link} from 'react-router-dom'

const MovieCard = ({movie}) => {
  const {title, vote_average: voteAverage, poster_path: posterPath} = movie

  const imageUrl = `https://image.tmdb.org/t/p/w300${posterPath}`

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <h3 className="movie-title">{title}</h3>
      <p className="movie-rating">⭐ {voteAverage}</p>
      <Link to={`/movie/${movie.id}`}>
        <button className="details-button" type="button">
          View Details
        </button>
      </Link>
    </div>
  )
}

export default MovieCard
