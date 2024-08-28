/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "react-router-dom";
import Navbar from "../components2/NavBar";
import { SetStateAction, useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import SearchItem from "../components2/SearchItem";
import useFetch from "../hooks/useFetch";
import { Options, Property } from "../utils/types";
import { useSearchStore } from "../states/store";
import { DatePickerWithRange } from "../components2/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "../components2/Loading";

export default function List() {
  const location = useLocation();
  
  const { dates, setDates ,city,options} = useSearchStore();
  const [destination, setDestination] = useState(city);
  const [_options, setoptions] = useState(options);
  //const [date, setDate] = useState(location.state.date);
  const [date, setDate] = useState<DateRange | undefined>({
    from: dates.from ,
    to: dates.to ,
  });
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const { data, loading, reFetch } = useFetch<Property[]>(
    `/hotel?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

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

  useEffect(()=>{
console.log(location);
  },[location])
  return (
    <div>
      <Navbar />
      <div className="list">
        <div className="listContainer">
          <div className="listWrapper">
            <div className="listSearch flex flex-col gap-2">
              <h1>Search</h1>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="email">Destination</Label>
                <Input
                  type="text"
                  placeholder={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              {/* <Options item={}/> */}
              <div className="lsItem flex flex-col">
                <label htmlFor="">Check-in Date</label>
                <DatePickerWithRange
                  date={date}
                  setDate={(d) => {
                    setDate(d); // Met à jour l'état local
                    setDates(d as DateRange | undefined); // Met à jour l'état global
                  }}
                />
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
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span>Adult</span>
                    <input type="number" min={1} placeholder={_options?.adult?.toString()} />
                  </div>
                  <div className="lsOptionItem">
                    <span>Children </span>
                    <input
                      type="number"
                      min={0}
                      placeholder={_options?.children?.toString()}
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span>Room </span>
                    <input type="number" min={1} placeholder={_options?.room?.toString()} />
                  </div>
                </div>
                <button className="btn" onClick={handleClick}>
                  Search
                </button>
              </div>
            </div>
            <div className="listResult">
              {loading ? (
                <div className="w-full flex justify-center items-center h-full">
                  <Loading />
                </div>
              ) : (
                <>
                  {data?.length != 0 ? (
                    data?.map((item) => (
                      <SearchItem item={item} key={item.id} />
                    ))
                  ) : (
                    <div className="self-center">
                      Aucune donner ressayer le filtrage
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
