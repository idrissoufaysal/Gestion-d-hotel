import { Home1 } from "../utils/types";
import image from "../assets/images/barn-216372_640.jpg";
import image2 from "../assets/images/village-279013_640.jpg";
import image3 from "../assets/images/living-room-2732939_640.jpg";
import image4 from "../assets/images/living-room-2569325_640.jpg";
import image6 from "../assets/images/interior-2685521_640.jpg";
import useFetch from "../hooks/useFetch";
const PropertyList = () => {
 
  const images = [image2, image3, image4, image6, image6]

  const { data ,error} = useFetch("/hotel/countByType")
  console.log(data);
  if (error) {
    return <div>Error loading data</div>;
  }
  return (
    <div className="pList">
      {data && images.map((img, index) => (
        <div className="item">
          <div key={index} className="pListItem">
            <img src={img} alt="image" />
            <div className="pListTitle">
              <h1>{} </h1>
              <h2>{data[index].count} {data[index].type}</h2>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
