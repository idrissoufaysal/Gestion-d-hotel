import Footer from "../components/Footer";
import MailList from "../components/MailList";
import Navbar from "../components/NavBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Property } from "../utils/types";
import { useLocation } from "react-router-dom";
const Hotel = () => {
  const photo = [
    {
      src: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    },
    {
      src: "https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_640.jpg",
    },
    {
      src: "https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376_640.jpg",
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/01/26/08/15/dining-room-3108037_640.jpg",
    },
    {
      src: "https://cdn.pixabay.com/photo/2021/10/06/15/05/bathroom-6686057_640.jpg",
    },
    {
      src: "https://cdn.pixabay.com/photo/2024/05/20/10/34/ai-generated-8774721_640.jpg",
    },
  ];


  const location = useLocation()
  const hotelId = location.pathname.split("/")[2]
  // console.log(hotelId);

  const { data,loading } = useFetch<Property>(`/hotel/${parseInt(hotelId)}`)

  const [openImage, setOpenImage] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const handlOpen = (index: number) => {
    setOpenImage(true);
    setSliderIndex(index);
  };

  const handleSlider = (action: "s" | "r") => {
    let newSlideNumber;
    if (action == "s") {
      newSlideNumber = sliderIndex == 5 ? 0 : sliderIndex + 1; //setSliderIndex(sliderIndex + 1);
      setSliderIndex(newSlideNumber);
    }
    if (action == "r") {
      newSlideNumber = sliderIndex == 0 ? 5 : sliderIndex - 1

      //setSliderIndex(sliderIndex -1);
      setSliderIndex(newSlideNumber);
    }
  };

  return (
    <div>
      <Navbar />
      {
        loading ? ("Loading...") : (
          <div className="hotelContainer">
            {openImage && (
              <div className="slider">
                <div className="sliderWrapper">
                  <CloseIcon className="c" onClick={() => setOpenImage(false)} />
                  <ArrowBackIosIcon
                    className="b"
                    onClick={() => handleSlider("r")}
                  />
                  <img src={photo[sliderIndex].src} alt="" />
                  <ArrowForwardIosIcon
                    className="b"
                    onClick={() => handleSlider("s")}
                  />
                </div>
              </div>
            )}
            { }
            <div className="hotelWrapper">
              <h1>{data?.name}</h1>
              <div className="location">
                <LocationOnIcon fontSize="small" elevation={80} />
                <span>{data?.address}</span>
              </div>
              <span className="hotelDistance">
                Excellent location {data?.distance} from center
              </span>
              <span className="hotelPrice">
                Book a stay over ${data?.cheapesPrice} at this property and get a free aiport taxi
              </span>
              <button className="book1">Book now</button>
              <div className="hotelImages">
                {photo.map((p, i) => (
                  <div key={i} className="hotelImgWrapper">
                    <img src={p.src} onClick={() => handlOpen(i)} alt="" />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1>{data?.title}</h1>
                  <p>
                   {data?.desc}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a 9-night stay</h1>
                  <span>
                    Located in the real heart of krakow, this property has an
                    excellent location score of 9.8
                  </span>
                  <h2>
                    <b>$945</b> (9 nights)
                  </h2>
                  <button>Reserve or Book Now !</button>
                </div>
              </div>
            </div>

            <MailList />
            <Footer />
          </div>)
      }
    </div>
  );
};

export default Hotel;
