import {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './styles.css'

const MovieDetails = () => {
  const {id} = useParams()
  const {API_KEY, BASE_URL} = useContext(MovieContext)
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    const fetchDetails = async () => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
      )
      const movieData = await movieRes.json()
      setMovie(movieData)

      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
      )
      const castData = await castRes.json()
      setCast(castData.cast)
    }

    fetchDetails()
  }, [id, API_KEY, BASE_URL])

  if (!movie) return <p>Loading...</p>

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div className="movie-details-container">
      <section className="movie-info">
        <img src={imageUrl} alt={movie.title} />
        <div>
          <h2>{movie.title}</h2>
          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>
          <p>
            <strong>Duration:</strong> {movie.runtime} mins
          </p>
          <p>
            <strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
        </div>
      </section>

      <section className="cast-section">
        <h3>Cast</h3>
        <div className="cast-grid">
          {cast.map(actor => (
            <div key={actor.id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p>
                <strong>{actor.original_name}</strong>
              </p>
              <p>as {actor.character}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MovieDetails
