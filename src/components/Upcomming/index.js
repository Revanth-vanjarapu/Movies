import {useContext, useEffect, useState} from 'react'
import MovieContext from '../../context/MovieContext'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'

const Upcomming = () => {
  const {API_KEY} = useContext(MovieContext)
  const [movies, setMovies] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState()

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageNo}`,
    )
      .then(res => res.json())
      .then(data => {
        setMovies(data.results)
        setTotalPages(data.total_pages)
      })
      .catch(err => console.error(err))
  }, [API_KEY, pageNo])

  const handlePageChange = newPage => {
    setPageNo(newPage)
  }

  return (
    <>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination apiCallback={handlePageChange} totalPages={totalPages} />
    </>
  )
}

export default Upcomming
