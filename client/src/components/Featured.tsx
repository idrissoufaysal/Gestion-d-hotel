import React from "react";
import { Home1 } from "../utils/types";
 import image from '../assets/images/living-room-2732939_640.jpg'
 import image2 from '../assets/images/chairs-2181947_640.jpg'
 import image3 from '../assets/images/kitchen-1336160_640.jpg'
 
 
export default function Feature() {
  const homes1: Home1[] = [
    {
      image: image,
      title: "Chateaux",
      title2: "beaucoup d'argent",
    },
    {
      image:image2,
      title: "Villa",
      title2: "Etre entrepreneur",
    },
    {
      image: image3,
      title: "Chambre",
      title2: "soit un debout",
    },
   
  ];
  return (
    <div className="featured">
      {homes1.map((h,index) => (
        <div key={index} className="featuredItem">
          <img src={h.image} alt="" />
          <div className="featuredTitles">
            <h1>{h.title}</h1>
            <h2>{h.title2}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
