import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <div className="navContainer" >
        <Link to='/'>
          <span>B13_Hotels</span>
        </Link>
        <div className="button">
          <Link to={'/login'}>
            <button className="navButton">Login</button>
          </Link>
          <Link to={'/register'}>
            <button className="navButton">Register</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
