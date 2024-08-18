import image from '../assets/images/living-room-2732939_640.jpg';
import image2 from '../assets/images/chairs-2181947_640.jpg';
import image3 from '../assets/images/kitchen-1336160_640.jpg';
import useFetch from "../hooks/useFetch";

export default function Feature() {
  const { data, loading } = useFetch<number[]>("/hotel/countByCity?cities=lome,kara,londre");
  //console.log(data);

  return (
    <div className="featured">
      {loading ? (
        "Loading..."
      ) : (
        data && data.length >= 3 ? (
          <>
            <div className="featuredItem">
              <img src={image} alt="" />
              <div className="featuredTitles">
                <h1>Lome</h1>
                <h2>({data[0]})</h2> 
              </div>
            </div>
            <div className="featuredItem">
              <img src={image3} alt="" />
              <div className="featuredTitles">
                <h1>Kara</h1>
                <h2>({data[1]})</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img src={image2} alt="" />
              <div className="featuredTitles">
                <h1>Dapaong</h1>
                <h2>({data[2]})</h2> 
              </div>
            </div>
          </>
        ) : (
          <div>Data is not available</div>
        )
      )}
    </div>
  );
}
