import {createContext, useState} from 'react'

const MovieContext = createContext()

export const MovieProvider = ({children}) => {
  const [API_KEY, setApiKey] = useState(process.env.REACT_APP_TMDB_API_KEY)

  return (
    <MovieContext.Provider value={{API_KEY, setApiKey}}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext
