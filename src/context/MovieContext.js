import {createContext, useState} from 'react'

const MovieContext = createContext()

export const MovieProvider = ({children}) => {
  const [API_KEY, setApiKey] = useState('a374bca69e67123ff3aaaee2daebdce3')

  return (
    <MovieContext.Provider value={{API_KEY, setApiKey}}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext
