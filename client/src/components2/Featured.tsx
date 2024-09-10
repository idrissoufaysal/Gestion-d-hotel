import image from "../assets/images/living-room-2732939_640.jpg";
import image2 from "../assets/images/chairs-2181947_640.jpg";
import image3 from "../assets/images/kitchen-1336160_640.jpg";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import { useSearchStore } from "../states/store";
import { useNavigate } from "react-router-dom";

export default function Feature() {
  const navigate = useNavigate();
  const { city, setCity,dates } = useSearchStore();
  const { data, loading } = useFetch<number[]>(
    "/hotel/countByCity?cities=lome,kara,sokode"
  );
  //console.log(data);

 
  return (
    <div className="featured">
      {loading ? (
        <div className="w-full flex justify-center ">
          <Loading />
        </div>
      ) : data && data.length >= 3 ? (
        <>

          <div
            className="featuredItem cursor-pointer"
            onClick={() => {
              setCity("lome");
              navigate("/hotels");
            }}
          >
            <img src={image} alt="" />
            <div className="featuredTitles font-bold">
              <h1>Lome</h1>
              <h2>({data[0]})</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => {
              setCity("kara");
              navigate("/hotels");
            }}
          >
            <img src={image3} alt="" />
            <div className="featuredTitles font-bold">
              <h1>Kara</h1>
              <h2>({data[1]})</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() => {
              setCity("sokode");
              navigate("/hotels");
            }}
          >
            <img src={image2} alt="" />
            <div className="featuredTitles font-bold">
              <h1>Sokode</h1>
              <h2>({data[2]})</h2>
            </div>
          </div>
        </>
      ) : (
        <div>Data is not available</div>
      )}
    </div>
  );
}
