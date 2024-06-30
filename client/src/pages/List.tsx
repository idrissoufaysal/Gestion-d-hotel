/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../components/SearchItem";
import useFetch from "../hooks/useFetch";
import { Property } from "../utils/types";

export default function List() {
  const location = useLocation();

  const [openDate, setOpenDate] = useState(false);

  const [destination, setDestination] = useState(location.state.destination);
  const [options, setoptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const [min,setMin]=useState()
  const [max,setMax]=useState()
  const [price, setPrice] = useState(
    {
      minPrice: undefined,
      maxPrice: undefined
    }

  );


  const { data, loading, reFetch } = useFetch<Property[]>(`/hotel?city=${destination}&min=${min || 0}&max=${max || 999}`)

  console.log(destination);

  const handlChange = (e: { target: { name: string, value: string } }) => {
    setPrice((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ))
  }
  const handleMinChange=(e:React.ChangeEventHandler<HTMLInputElement>)=>{
    setMin(e.target.value)
  }

  const handleClick = () => {
    console.log(min);
    console.log(max);
    
    reFetch()
  }


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
                <input type="text" placeholder={destination} onChange={e => setDestination(e.target.value)} />
              </div>
              <div className="lsItem">
                <label htmlFor="">Check-in Date</label>
                <span
                  className="dateSpan"
                  onClick={() => setOpenDate(!openDate)}
                >{`${format(date[0].startDate, "dd/MM/yyyy")} au ${format(
                  date[0].endDate!,
                  "dd/MM/yyyy"
                )}`}</span>

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
                <div className="lsOption">
                  <div className="lsOptionItem">
                    <span>
                      Min price <small>per night</small>{" "}
                    </span>
                    <input type="number" onChange={e=>setMin(e.target.value)} />
                  </div>
                  <div className="lsOptionItem">
                    <span>
                      Max price <small>per night</small>{" "}
                    </span>
                    <input type="number" placeholder={options.price} onChange={e=>setMax(e.target.value)} />
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
                <button className="btn" onClick={handleClick}>Search</button>
              </div>
            </div>
            <div className="listResult">
              {
                loading ? "Loading..." : <>
                  {
                    data?.map(item => (
                      <SearchItem item={item} key={item.id} />

                    ))
                  }
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
