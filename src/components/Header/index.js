import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import './styles.css'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      history.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
    console.log(searchTerm)
  }

  return (
    <nav>
      <h1 className="logo">movieDB</h1>

      <div className="search-box">
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="button" title="search" onClick={handleSearch}>
          <AiOutlineSearch className="icon" />
        </button>
      </div>
      <textarea />
      <ul className="menu">
        <li className="options">
          <Link to="/">Popular</Link>
        </li>
        <li className="options">
          <Link to="/top-rated">Top Rated</Link>
        </li>
        <li className="options">
          <Link to="/upcoming">Upcoming</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
