import { Home1 } from "../utils/types";
import image from "../assets/images/barn-216372_640.jpg";
import image2 from "../assets/images/village-279013_640.jpg";
import image3 from "../assets/images/living-room-2732939_640.jpg";
import image4 from "../assets/images/téléchargement.jpg";
import image6 from "../assets/images/interior-2685521_640.jpg";
const PropertyList = () => {
  const homes2: Home1[] = [
    {
      image: image,
      title: "Chateaux",
      title2: "la Facilite",
    },
    {
      image: image2,
      title: "Appartement",
      title2: "Etre entrepreneur",
    },
    {
      image: image3,
      title: "Villa",
      title2: "soit un debout",
    },
    {
      image: image4,
      title: "Chambre",
      title2: "ne soit pas un coulé",
    },
    
    {
      image: image6,
      title: "Chambre",
      title2: "soit un debout",
    },
  ];
  return (
    <div className="pList">
      {homes2.map((h, index) => (
        <div className="item">
          <div key={index} className="pListItem">
            <img src={h.image} alt="image" />
            <div className="pListTitle">
              <h1>{h.title} </h1>
              <h2>{h.title2} </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
