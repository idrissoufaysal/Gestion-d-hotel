import { IoMdClose } from "react-icons/io";
import { Property, Room } from "../utils/types";
import useFetch from "../hooks/useFetch";
import { DatePickerWithRange } from "./DateRangePicker";
import { useSearchStore } from "../states/store";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";

import { useState } from "react";

const Reserve = ({
  setOpen,
  dataItem,
}: {
  setOpen: () => void;
  dataItem: Property;
}) => {
  const { data, error, loading } = useFetch<Room[]>(
    `/room/hotel/${dataItem.id}`
  );

  if (error) console.log(error);

  //store
  const { dates, setDates } = useSearchStore();

  const [date, setDate] = useState<DateRange | undefined>({
    from: dates.from,
    to: dates.to,
  });

  const handleSubmit = (event:React.MouseEventHandler<HTMLButtonElement> | undefined) => {
    event.preventdefault()
    console.log(date);
  };

  console.log(data);
  return (
    <>
      <div className="w-screen h-screen bg-[#00000036] fixed top-0 left-0 flex justify-center items-center">
        <div className="w-[600px] h-[500px] bg-white rounded-md relative flex flex-col gap-4 items-center">
          <div className="absolute top-2 right-2">
            <IoMdClose
              onClick={setOpen}
              fontSize={20}
              className="cursor-pointer hover:text-red-500"
            />
          </div>
          <span className="text-center text-2xl mt-9 text-couleur-principale">
            Réservation
          </span>

          <div className="w-full flex justify-center items-center ">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              data?.map((room) => (
                <div
                  key={room.id}
                  className="flex flex-col justify-center w-full px-5"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="text-xl">Titre:{room?.title}</div>
                      <div className="">Descritpion: {room.desc}</div>
                      <span className="font-bold ">Prix :{room.price} $$</span>
                    </div>

                    {room.roomNumbers.map((rNumber) => (
                      <div className="flex">
                        <div className="flex flex-col">
                          <input type="checkbox" />
                          <span>{rNumber.number}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between">
                    <DatePickerWithRange
                      date={date}
                      setDate={(d) => {
                        setDate(d); // Met à jour l'état local
                        setDates(d as DateRange | undefined); // Met à jour l'état global
                      }}
                    />
                    <Button onClick={handleSubmit} >reserver </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reserve;
