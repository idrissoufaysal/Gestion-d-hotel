import Feature from "../components/Featured"
import Header from "../components/Header"
import Navbar from "../components/NavBar"

const Home = () => {
  return (
    <div >
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Feature/>
          <h1>
            
          </h1>
        </div>
    </div>
  )
}

export default Home
