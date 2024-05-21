import img from "../assets/images/interior-2685521_640.jpg";

export default function SearchItem() {
  return (
    <div className="searchItem">
      <img src={img} alt="" />
      <div className="siDesc">
        <h1 className="siTitle">Tower Street Apartments</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxi0p">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio 1 bathroom 21m² 1 full bed
        </span>
        <span className="siCancelop">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Exelent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          
        </div>
      </div>
    </div>
  );
}
