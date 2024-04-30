import image from "../assets/images/interior-2685521_640.jpg";

const FeaturedProperty = () => {
  return (
    <div className="fp">
      <div className="fpItem">
        <img src={image} alt="" />
        <span className="fpName">Appartement Stare Miastro </span>
        <span className="fpCity">Madrid </span>
        <span className="fpPrice">Starting from $120 </span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excelent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperty;
