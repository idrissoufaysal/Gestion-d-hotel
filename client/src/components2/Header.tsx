import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import FlightIcon from "@mui/icons-material/Flight";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import BoyIcon from "@mui/icons-material/Boy";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { useState } from "react";
import { Options } from "../utils/types";
import { Link, useNavigate } from "react-router-dom";
import { useSearchStore } from "../states/store";
import { useAuth } from "../states/userStore";
import { DatePickerWithRange } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const Header = () => {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 20),
  });

  const [options, setLocalOptions] = useState<Options>({
    adult: 1,
    children: 0,
    room: 1,
  });

  const { setCity, setOptions, setDates } = useSearchStore();
  const navigate = useNavigate();

  const handlChange = (name: keyof Options, operation: "i" | "d") => {
    setLocalOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "i"
            ? (options[name] as number) + 1
            : (options[name] as number) - 1,
      };
    });
  };

  const handleSearch = () => {
    setCity(destination);
    setDates(date);
    
    setOptions(options);
    navigate("/hotels", { state: { destination, date, options } });
  };
  const { currentUser } = useAuth();

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
        {!currentUser && (
          <Link to="/login">
            <button className="btn">Sign in / Register</button>
          </Link>
        )}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <LocalHotelIcon />
            <input
              type="text"
              placeholder="ou alons nous?"
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="headerSearchItem">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
          <div className="headerSearchItem">
            <BoyIcon />
            <span
              onClick={() => setOpenOptions(!openOptions)}
            >{`${options.adult} adults ${options.children} children ${options.room} room`}</span>
            {openOptions && (
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Adult</span>
                  <div className="actions">
                    <button
                      disabled={(options.adult as number) <= 1}
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
                      disabled={(options.children as number) <= 1}
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
                      disabled={(options.room as number) <= 0}
                      onClick={() => handlChange("room", "d")}
                    >
                      -
                    </button>
                    <span>{options.room}</span>
                    <button onClick={() => handlChange("room", "i")}>+</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <button className="btn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
