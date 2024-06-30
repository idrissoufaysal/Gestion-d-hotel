import image from "../assets/images/interior-2685521_640.jpg";
import useFetch from "../hooks/useFetch";
import { Property } from "../utils/types";

const FeaturedProperty = () => {

  const { data, loading } = useFetch<Property[]>('/hotel?featured=true&limit=5')
  console.log(data);

  return (
    <div className="fp">
      {loading ? "Loading...." :
        <>
          {data ? data?.map(item => (

            <div className="fpItem" key={item.id}>
              <img src={image} alt="" />
              <span className="fpName">{item.name} </span>
              <span className="fpCity">{item.city} </span>
              <span className="fpPrice">Starting from ${item.cheapesPrice} </span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excelent</span>
              </div>}
            </div>
          )) : <h3>Aucune donne</h3>
          
          }
        </>}
    </div>
  );
};

export default FeaturedProperty;
