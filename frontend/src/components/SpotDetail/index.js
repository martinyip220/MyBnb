import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import "./SpotDetail.css";

const SpotDetail = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.singleSpot);

  console.log("spotdetail", spot);

  let spotImages = spot.SpotImages;

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch, spotId]);

  if (!spotImages) return null;
  return (
    <div className="spot-detail-page">
      <div className="spot-detail-name">
        <h1>{spot.name}</h1>
      </div>
      <div className="spot-detail-top-info">
        <div className="spot-detail-rating">
          <div className="spot-detail-star">
            {<i className="fa-solid fa-star"></i>}
            {spot.avgStarRating}
          </div>
          <div className="circle">{<i className="fas fa-circle"></i>}</div>
          <div className="spot-detail-numreview">
            {spot.numReviews + " review(s)"}
          </div>
          <div className="circle">{<i className="fas fa-circle"></i>}</div>
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
              src={image.url}
              alt="spotimg"
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotDetail;
