import { Link } from "react-router-dom";
import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  return (
    <div className="spots-layout">
      <Link className="spot-links" to={`/spots/${spot.id}`}>
        <div className="spot-card-container">
          <img className="spotImage" src={spot.previewImage || "https://mbfn.org/wp-content/uploads/2020/09/image-coming-soon-placeholder.png"} alt="Spot" />
          <div className="card-top-info-city">{spot.city + ","}</div>
          <div className="card-top-info-state">{spot.state}</div>
          <div className="card-top-info">
            <div className="spot-card-star">
              <i className="fa-solid fa-star"></i>{(spot.avgRating || 0).toFixed(2)}
              </div>
          </div>
          <div className="card-bottom-info">
            <div className="spot-card-price">{"$" + spot.price}</div>
            <div className="night-text">{"night"}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpotCard;
