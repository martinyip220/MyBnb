import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import { deleteCurrentSpot } from "../../store/spots";
import { getAllReviews } from "../../store/reviews";
import SpotReviews from "../SpotReviews";
import "./SpotDetail.css";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);

  const sessionUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews.allReviews);
  console.log("reviewsobj", reviewsObj);
  const reviews = Object.values(reviewsObj);

  console.log("reviewsArr", reviews);

  console.log("spotdetail", spot);

  let spotImages = spot.SpotImages;

  useEffect(() => {
    dispatch(getOneSpot(spotId));

    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  const handleEditButton = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}/edit`);
  };

  const handleDeleteButton = (e) => {
    e.preventDefault();
    dispatch(deleteCurrentSpot(spotId));
    history.push("/");
  };

  if (!spotImages) return null;
  if (!reviews) return null;
  return (
    <div className="spot-detail-page">
      <div className="spot-detail-top-container">
        <div className="spot-detail-name">
          <h1>{spot.name}</h1>
          {sessionUser && sessionUser.id === spot.ownerId && (
            <div className="edit-spot-button-container">
              <button className="user-edit-button" onClick={handleEditButton}>
                Edit Spot
              </button>
              <button className="user-edit-button" onClick={handleDeleteButton}>
                Delete Spot
              </button>
            </div>
          )}
        </div>
        <div className="spot-detail-top-info">
          <div className="spot-detail-rating">
            <div className="spot-detail-star">
              {<i className="fa-solid fa-star"></i>}
              {(spot.avgStarRating || 0).toFixed(2)}
            </div>
            <div className="spot-circle">
              {<i className="fas fa-circle"></i>}
            </div>
            <div className="spot-detail-numreview">
              {spot.numReviews + " review(s)"}
            </div>
            <div className="spot-circle">
              {<i className="fas fa-circle"></i>}
            </div>
            <div>
              <i className="fa-solid fa-medal"></i>
            </div>
            <div className="spot-superhost-top-label">Superhost</div>
            <div className="spot-circle">
              {<i className="fas fa-circle"></i>}
            </div>
            <div className="spot-detail-location">
              {spot.city}, {spot.state}, {spot.country}
            </div>
          </div>
        </div>
        <div className="spot-detail-img-container">
          {spotImages.map((image) => (
            <div key={image.id}>
              <img
                className="spot-detail-image"
                src={
                  image.url ||
                  "https://mbfn.org/wp-content/uploads/2020/09/image-coming-soon-placeholder.png"
                }
                alt="spotimg"
              ></img>
            </div>
          ))}
        </div>
      </div>
      <div className="spot-detail-bottom">
        <div className="hosted-by">
          <h2>Entire home hosted by {spot.Owner.firstName}</h2>
        </div>
        <div className="spot-detail-host-info">
          <div className="spot-detail-icons">
            <div>
              <i className="fa-solid fa-medal"></i>
            </div>
            <div>
              <i className="fa-solid fa-door-open"></i>
            </div>
            <div>
              <i className="fa-regular fa-calendar"></i>
            </div>
          </div>
          <div className="spot-detail-host-info-words">
            <h4>{spot.Owner.firstName} is a Superhost</h4>
            <div className="spot-details-words">
              Superhosts are experienced, highly rated hosts who are committed
              to providing great stays for guests.
            </div>
            <div className="self-checkin">
              <h4>Self check-in</h4>
              <div className="spot-details-words">
                Check yourself in with the keypad.
              </div>
            </div>
            <div className="cancellation-policy">
              <h4>Free cancellation for 48 hours.</h4>
            </div>
          </div>
        </div>
        <div className="spot-description-container">
          <h2 className="spot-description-title">About this Spot</h2>
          <div className="spot-description-body">
            {spot.description}
          </div>
        </div>
        <div className="spot-reviews-container">
          <SpotReviews spot={spot} />
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
