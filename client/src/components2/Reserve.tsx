import { IoMdClose } from "react-icons/io";
import { ApiUrl, Property, Room } from "../utils/types";
import useFetch from "../hooks/useFetch";
import { DatePickerWithRange } from "./DateRangePicker";
import { useSearchStore } from "../states/store";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

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
  const { toast } = useToast();
  const navigate = useNavigate();

  if (error) console.log(error);

  //store
  const { dates, setDates } = useSearchStore();

  const [date, setDate] = useState<DateRange | undefined>({
    from: dates.from,
    to: dates.to,
  });

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>,
    roomId: number
  ) => {
    event.preventDefault();

    try {
      //  const res= await axios.post(`${ApiUrl}/room/reservation/${roomId}`,{dates});
      //   console.log(res);

      //   console.log("Réservé avec succès");

      // Toast de succès
      toast({
        title: "Réservation réussie",
        description: "Votre chambre a été réservée avec succès 😊 ",
        className: "bg-green-500 text-white",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);

      // Toast d'erreur
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de votre demande.",
        color: "red", // Couleur pour l'erreur
      });
    }
  };

  //console.log(data);
  return (
    <>
      <div className="w-screen h-screen bg-[#00000036] fixed top-0 left-0 flex justify-center items-center">
        <div className="w-[600px] h-[500px] bg-white rounded-md relative flex flex-col gap-4 items-center overflow-scroll">
          <div className="absolute top-2 right-2">
            <IoMdClose
              onClick={setOpen}
              fontSize={30}
              className="cursor-pointer hover:text-black transition-all   text-stone-600"
            />
          </div>
          <span className="text-center text-2xl mt-9 text-couleur-principale">
            Réservation
          </span>

          <div className="w-full flex justify-center items-center ">
            {loading ? (
              <div className="w-full flex justify-center items-center h-full">
                <Loading />
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {data?.map((room) => (
                  <div
                    key={room.id}
                    className="flex flex-col justify-center w-full px-5"
                  >
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="text-xl">Titre:{room?.title}</div>
                        <div className="">Descritpion: {room.desc}</div>
                        <span className="font-bold ">
                          Prix :{room.price} $$
                        </span>
                      </div>

                      <div className="flex">
                        <div className="flex flex-col">
                          <input type="checkbox" />
                          <span>{room.roomNumbers}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <DatePickerWithRange
                        date={date}
                        setDate={(d) => {
                          setDate(d); // Met à jour l'état local
                          setDates(d as DateRange | undefined); // Met à jour l'état global
                        }}
                      />
                      <Button onClick={(e) => handleSubmit(e, room.id)}>
                        reserver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reserve;
