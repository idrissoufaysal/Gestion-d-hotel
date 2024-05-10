import Navbar from '../../components/NavBar'

export default function List() {
  return (
    <div>
     <Navbar/>
     <div className="list">
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
          <h1>Search</h1>
          <div className="lsItem">
            <label htmlFor="">Destination</label>
            <input type="text" />
          </div>
          </div>
          <div className="listResult">

          </div>
        </div>
      </div>
     </div>
    </div>
  )
}
