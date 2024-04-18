import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="items">
          <div className="item active">
            <LocalHotelIcon /> <span>Stays</span>
          </div>
          <div className="item">
            <FlightIcon />
            <span>Flights</span>
          </div>
          <div className="item">
            <DirectionsCarIcon />
            <span>Car rental</span>
          </div>
          <div className="item">
            <LocalHotelIcon />
            <span>Attractions</span>
          </div>
          <div className="item">
            <LocalTaxiIcon />
            <span>Airport taxis</span>
          </div>
        </div>
        <h1>A lifetime of discounts? Genius</h1>
        <p className="headerDesc">
          l'oiseau sur le baobabe ne doit jamais qu'il a porter des Lunette et
          aussi la genille ne porte de lunette quand elle boie l'eau
        </p>
        <button>Sign in / Register</button>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FlightIcon />
            <input type="text" placeholder="ou alons nous?" />
          </div>
          <div className="headerSearchItem">
            <FlightIcon />
            <span>date to date</span>
          </div>
          <div className="headerSearchItem">
            <FlightIcon />
            <span>2 adults 2 childreen 1 room</span>{" "}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
