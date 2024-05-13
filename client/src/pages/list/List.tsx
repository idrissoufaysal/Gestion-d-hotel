import { useLocation } from "react-router-dom";
import Navbar from "../../components/NavBar";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/SearchItem";

export default function List() {
  const location = useLocation();

  const [openDate, setOpenDate] = useState(false);

  const [destination, setDestination] = useState(location.state.destination);
  const [options, setoptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);

  return (
    <div>
      <Navbar />
      <div className="list">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch">
              <h1>Search</h1>
              <div className="lsItem">
                <label htmlFor="">Destination</label>
                <input type="text" placeholder={destination} />
              </div>
              <div className="lsItem">
                <label htmlFor="">Check-in Date</label>
                <span className="dateSpan" onClick={() => setOpenDate(!openDate)}>{`${format(
                  date[0].startDate,
                  "dd/MM/yyyy"
                )} au ${format(date[0].endDate!, "dd/MM/yyyy")}`}</span>

                {openDate && (
                  <DateRange
                    onChange={(item) => setDate([item.seletion])}
                    minDate={new Date()}
                    ranges={date}
                  />
                )}
              </div>
              <div className="lsItem">
                <label htmlFor="">Option</label>
                <div className="lsOptionItem">
                  <span>Min price <small>per night</small> </span>
                  <input type="number" />
                </div>
                <div className="lsOptionItem">
                  <span>Max price <small>per night</small> </span>
                  <input type="number" placeholder={options.price} />
                </div>
                <div className="lsOptionItem">
                  <span>Adult</span>
                  <input type="number" min={1} placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span>Children </span>
                  <input type="number" min={0} placeholder={options.children}/>
                </div>
                <div className="lsOptionItem">
                  <span>Room </span>
                  <input type="number" min={1} placeholder={options.room}/>
                </div>
              </div>
              <button className="btn">Search</button>
            </div>
            <div className="listResult">
              <SearchItem/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
