import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {format } from "date-fns"
import { useState } from "react";
import { DateSeletion } from "../utils/types";



const Header = () => {
  const [openDate,setOpenDate]=useState(false)
  const [date, setDate] = useState<DateSeletion[]>([{
    startDate: new Date(),
    endDate: new Date(),
    key: "seletion",
  }]);
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
        <button className="btn">Sign in / Register</button>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FlightIcon />
            <input type="text" placeholder="ou alons nous?" />
          </div>
          <div className="headerSearchItem">
            <FlightIcon />
            <span onClick={()=>setOpenDate(!openDate)} >{`${format(date[0].startDate,"dd/MM/yyyy")} au ${format(date[0].endDate,"dd/MM/yyyy")}`}</span>
           {!openDate && <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection as DateSeletion])}
              moveRangeOnFirstSelection={false}
              ranges={date} // Remarquez que je mets date entre crochets pour créer un tableau de date, car DateRange attend un tableau pour les plages de dates
              className="date"
            />}
          </div>
          <div className="headerSearchItem">
            <FlightIcon />
            <span>2 adults 2 childreen 1 room</span>{" "}
          </div>
          <div className="headerSearchItem">
            <button className="btn">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
