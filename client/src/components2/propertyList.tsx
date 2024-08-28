import image2 from "../assets/images/village-279013_640.jpg";
import image3 from "../assets/images/living-room-2732939_640.jpg";
import image4 from "../assets/images/living-room-2569325_640.jpg";
import image6 from "../assets/images/interior-2685521_640.jpg";
import image from "../assets/images/kitchen-1336160_640.jpg";
import useFetch from "../hooks/useFetch";
import { PropertyType } from "../utils/types";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const images = [image2, image3, image4, image6, image];
  const navigate=useNavigate()
  const { data, error ,loading} = useFetch<PropertyType[]>("/hotel/countByType");

  console.log(data);

  if (error) {
    return <div>Erreur lors de l'affichage</div>;
  }
  if(loading){
    return (
      <div className="w-full flex justify-center ">
        <Loading />
      </div>
    );  // loading state here  // Add loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.  // Loading state here if needed.
  }
  const handlClick = (type: string) => {
    navigate(`/hotels?type=${type}`, { replace: true });
  };

  return (
    <div className="pList">
      {data &&
        images.map((img, index) => (
          <div className="item" key={index}>
            <div key={index} className="pListItem">
              <img src={img} alt="image" />
              <div className="pListTitle">
                <h1>{data[index]?.type}</h1>
                <h2>
                  {data[index]?.count} {data[index]?.type}
                </h2>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PropertyList;
