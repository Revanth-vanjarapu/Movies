import {useContext, useEffect, useState} from 'react'
import MovieContext from '../../context/MovieContext'
import MovieCard from '../MovieCard'

const TopRated = () => {
  const {API_KEY} = useContext(MovieContext)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    )
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error(err))
  }, [API_KEY])

  return (
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default TopRated
