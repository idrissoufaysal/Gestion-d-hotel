import { Link, useLocation } from "react-router-dom";
import img from "../assets/images/interior-2685521_640.jpg";
import { Property } from "../utils/types";

interface SearchItemProps {
  item: Property;
}

export default function SearchItem({ item }: SearchItemProps) {
  const location = useLocation()
  const type=location.search.split('=')[1]
  console.log(location.search.split('=')[1]);

  return (
    <div className="searchItem">
      <img src={img} alt="" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance} from center</span>
        <span className="siTaxi0p">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          {item.desc}
        </span>
        <span className="siCancelop">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Exelent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapesPrice}</span>
          <span className="siTaxiOp">Include taxes and fees</span>
          <Link to={`/hotels/${item.id}`}>
            <button>See available</button>
          </Link>

        </div>
      </div>
    </div>
  );
}
