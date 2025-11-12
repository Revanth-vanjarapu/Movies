import {Component} from 'react'
import ThreeDots from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import MovieContext from '../../context/MovieContext'

class Home extends Component {
  state = {
    movies: [],
    totalPages: null,
    loading: true,
  }

  componentDidMount() {
    this.getPopularMovies(1)
  }

  getPopularMovies = async pageNo => {
    const {API_KEY} = this.context
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNo}`,
    )
    const data = await response.json()
    this.setState({
      movies: data.results,
      totalPages: data.total_pages,
      loading: false,
    })
  }

  render() {
    const {movies, totalPages, loading} = this.state

    return (
      <>
        {loading ? (
          <div className="loader-container">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3b82f6"
              ariaLabel="three-dots-loading"
              wrapperStyle={{justifyContent: 'center'}}
            />
          </div>
        ) : (
          <>
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Pagination
              apiCallback={this.getPopularMovies}
              totalPages={totalPages}
            />
          </>
        )}
      </>
    )
  }
}

Home.contextType = MovieContext

export default Home
