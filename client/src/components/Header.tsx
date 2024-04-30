import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BoyIcon from "@mui/icons-material/Boy";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { format } from "date-fns";
import { useState } from "react";
import { DateSelection, Options } from "../utils/types";

const Header = () => {
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState<DateSelection[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState<Options>({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handlChange = (name: keyof Options, operation: "i" | "d") => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i" ? (options[name] as number) + 1 : options[name] - 1,
      };
    });
  };
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
            <LocalHotelIcon />
            <input type="text" placeholder="ou alons nous?" />
          </div>
          <div className="headerSearchItem">
            <CalendarMonthIcon />
            <span onClick={() => setOpenDate(!openDate)}>{`${format(
              date[0].startDate,
              "dd/MM/yyyy"
            )} au ${format(date[0].endDate!, "dd/MM/yyyy")}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection as DateSelection])}
                moveRangeOnFirstSelection={false}
                ranges={date} // Remarquez que je mets date entre crochets pour créer un tableau de date, car DateRange attend un tableau pour les plages de dates
                className="date"
              />
            )}
          </div>
          <div className="headerSearchItem">
            <BoyIcon />
            <span onClick={()=>setOpenOptions(!openOptions)}>{`${options.adult} adults ${options.children} children ${options.room} room`}</span>
            {openOptions && <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="actions">
                  <button
                    disabled={options.adult <= 1}
                    onClick={() => handlChange("adult", "d")}
                  >
                    -
                  </button>
                  <span>{options.adult}</span>
                  <button onClick={() => handlChange("adult", "i")}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="actions">
                  <button
                    disabled={options.children <= 1}
                    onClick={() => handlChange("children", "d")}
                  >
                    -
                  </button>
                  <span>{options.children}</span>
                  <button onClick={() => handlChange("children", "i")}>
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="actions">
                  <button
                    disabled={options.room <= 0}
                    onClick={() => handlChange("room", "d")}
                  >
                    -
                  </button>
                  <span>{options.room}</span>
                  <button onClick={() => handlChange("room", "i")}>+</button>
                </div>
              </div>
            </div>}
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
