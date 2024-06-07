import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar">
      <div className="navContainer" >
       <Link to='/'>
       <span>B13_Hotels</span>
       </Link>

       <div className="button">
           <button className="navButton">Login</button>
           <button className="navButton">Register</button>
       </div>
      </div>
    </div>
  )
}

export default Navbar
