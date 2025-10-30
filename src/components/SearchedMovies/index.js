import {useState, useEffect, useContext} from 'react'
import {useLocation, Link} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './styles.css'

const SearchedMovies = () => {
  const {API_KEY} = useContext(MovieContext)
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`,
      )
      const data = await res.json()
      setMovies(data.results || [])
    }

    if (query) fetchSearchedMovies()
  }, [query, API_KEY])

  return (
    <div className="searched-movies-container">
      <h2>
        Search Results for: <span className="highlight">{query}</span>
      </h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
            <Link to={`/movie/${movie.id}`} className="details-btn">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchedMovies
