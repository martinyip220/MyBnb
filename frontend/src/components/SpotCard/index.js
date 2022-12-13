import "./SpotCard.css";

const SpotCard = ({ spot }) => {
  return (
    <div className="spots-layout">
      <div className="spot-card-container">
        <img className="spotImage" src={spot.previewImage} alt="Spot Image" />
        <div className="card-top-info-city">{spot.city + ","}</div>
        <div className="card-top-info-state">{spot.state}</div>
        <div className="card-top-info">
          <i className="fa-solid fa-star"></i>
          <div className="avg-rating">{spot.avgRating}</div>
        </div>
        <div className="card-bottom-info">
          <div className="spot-card-price">{"$" + spot.price}</div>
          <div className="night-text">{"night"}</div>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
