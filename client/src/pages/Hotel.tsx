import Navbar from "../components/NavBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

  return (
    <div>
      <Navbar />

      <div className="hotelContainer">
        <div className="hotelWrapper">
          <h1>Towwer Street Apartments</h1>
          <div className="location">
            <LocationOnIcon fontSize="small" elevation={80} />
            <span>paris rue 33 , a la rivera 2</span>
          </div>
          <span className="hotelDistance">
            Excellent location 500m from center
          </span>
          <span className="hotelPrice">
            Book a stay over $114 at this property and get a free aiport taxi
          </span>
          <button>Book now</button>
          <div className="hotelImages">
            {photo.map((p,i) => (
              <div key={i} className="hotelImgWrapper">
                <img src={p.src} alt="" />
                
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1>Stay im the heart ok krakow</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Alias, aut nemo! Corrupti officia reiciendis tenetur, optio 
                 dolorum aut quaerat eum sequi recusandae consectetur, fu
                git, rerum molestiae animi distinctio eligendi aliquid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
