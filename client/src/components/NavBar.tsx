import { Link } from "react-router-dom"
import { useAuth } from "../states/userStore"

function Navbar() {

  const { currentUser } = useAuth()
console.log(currentUser);


  return (
    <div className="navbar">
      <div className="navContainer" >
        <Link to='/'>
          <span>B13_Hotels</span>
        </Link>
       {currentUser? <span className="text-xl text-white bg-jaune-moutarde px-3 py-2 rounded-xl">{currentUser.user.username}</span> : <div className="flex gap-2">
          <Link to={'/login'}>
            <button className="bg-couleur-principale py-2 text-gris-clair border border-gris-clair rounded-lg px-3 ">Login</button>
          </Link>
          <Link to={'/register'}>
            <button className="bg-couleur-principale py-2 text-gris-clair border border-gris-clair rounded-lg px-3">Register</button>
          </Link>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
