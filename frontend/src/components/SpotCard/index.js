import { Link } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  const avgRating = () => {
    let rating = 0;
    if (spot.avgRating === null) {
      return "New";
    } else {
      rating += spot.avgRating;
      return parseFloat(rating).toFixed(2)
    }
  };

  return (
    <div className="spots-layout">
      <div className="spot-card-container">
        <Link className="spot-links" to={`/spots/${spot.id}`}>
          <img
            className="spotImage"
            src={
              spot.previewImage ||
              "https://a0.muscache.com/im/pictures/miso/Hosting-603906401684897231/original/fc219b06-f81e-42d3-b544-5b3f8c0017f2.jpeg?im_w=1200"
            }
            alt="Spot"
          />
          <div className="card-top-info-container">
            <div className="card-top-info-city">{spot.city + ",  " + spot.state}</div>
            <div className="card-top-info">
              <div className="spot-card-star">
                <i className="fa-solid fa-star"></i>
                {avgRating()}
              </div>
            </div>
          </div>
          <div className="card-bottom-info">
            <div className="spot-card-price">{"$" + spot.price}</div>
            <div className="night-text">{"night"}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SpotCard;
