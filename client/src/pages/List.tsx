/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "react-router-dom";
import Navbar from "../components2/NavBar";
import { SetStateAction, useEffect, useState } from "react";
import { format,addDays } from "date-fns";
import SearchItem from "../components2/SearchItem";
import useFetch from "../hooks/useFetch";
import { Property } from "../utils/types";
import { useSearchStore } from "../states/store";
import { DatePickerWithRange } from "../components2/DateRangePicker";
import { DateRange } from "react-day-picker";

export default function List() {
  const location = useLocation();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setoptions] = useState(location.state.options);
  //const [date, setDate] = useState(location.state.date);
  
  const [date, setDate] = useState<DateRange | undefined>({
    from: location.state.date.from,
    to: location.state.date.to,
  });
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  // const [price, setPrice] = useState(
  //   {
  //     minPrice: undefined,
  //     maxPrice: undefined
  //   }

  // );
useEffect(()=>{
console.log(location.state.date);

},[])
  const { data, loading, reFetch } = useFetch<Property[]>(
    `/hotel?city=${destination}&min=${min || 0}&max=${max || 999}`
  );
  const { dates, setDates } = useSearchStore();
  //console.log(destination);

  // const handlChange = (e: { target: { name: string, value: string } }) => {
  //   setPrice((prev) => (
  //     { ...prev, [e.target.name]: e.target.value }
  //   ))
  // }

  // console.log(MILLISECOND_PER_DAYS);
  // console.log(dayDifferance(dates[0].endDate, dates[0].startDate));

  const handleClick = () => {
    console.log(min);
    console.log(max);
    reFetch();
  };
 

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
                <input
                  type="text"
                  placeholder={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="lsItem flex flex-col">
                <label htmlFor="">Check-in Date</label>
                <DatePickerWithRange date={date} setDate={setDates(date)} />
              </div>
              <div className="lsItem">
                <label htmlFor="">Option</label>
                <div className="lsOption">
                  <div className="lsOptionItem">
                    <span>
                      Min price <small>per night</small>{" "}
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span>
                      Max price <small>per night</small>{" "}
                    </span>
                    <input
                      type="number"
                      placeholder={options.price}
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span>Adult</span>
                    <input type="number" min={1} placeholder={options.adult} />
                  </div>
                  <div className="lsOptionItem">
                    <span>Children </span>
                    <input
                      type="number"
                      min={0}
                      placeholder={options.children}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span>Room </span>
                    <input type="number" min={1} placeholder={options.room} />
                  </div>
                </div>
                <button className="btn" onClick={handleClick}>
                  Search
                </button>
              </div>
            </div>
            <div className="listResult">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {data?.map((item) => (
                    <SearchItem item={item} key={item.id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
