import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './components/Popular'
import TopRated from './components/TopRated'
import Upcomming from './components/Upcomming'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'
import Header from './components/Header'

import MovieContext from './context/MovieContext'
import './App.css'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY

const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = responseData => ({
    totalPages: responseData.total_pages,
    totalResults: responseData.total_results,
    results: responseData.results.map(eachMovie => ({
      id: eachMovie.id,
      posterPath: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      voteAverage: eachMovie.vote_average,
      title: eachMovie.title,
    })),
  })

  const onTriggerSearchingQuery = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=${page}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <MovieContext.Provider
      value={{
        API_KEY,
        searchResponse,
        apiStatus,
        onTriggerSearchingQuery,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcomming} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/search" component={SearchedMovies} />
        </Switch>
      </div>
    </MovieContext.Provider>
  )
}

export default App
