import {Component} from 'react'
import ThreeDots from 'react-loader-spinner'
import MovieCard from '../MovieCard'

class Home extends Component {
  state = {
    movies: [],
    loading: true,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    const API_KEY = 'a374bca69e67123ff3aaaee2daebdce3'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    )
    const data = await response.json()
    this.setState({movies: data.results, loading: false})
  }

  render() {
    const {movies, loading} = this.state

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
          </>
        )}
      </>
    )
  }
}

export default Home
