import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import "./SpotDetail.css";

const SpotDetail = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spot = useSelector((state) => state.spots);
  console.log("spotdetail", spot);

  useEffect(() => {
    dispatch(getOneSpot(spotId));
  }, [dispatch]);

  return (
    <div className="spot-detail-page">
      <div className="spot-detail-top-info">
        <div className="spot-detail-name">
          <h1>{spot.name}</h1>
        </div>
        <div className="spot-detail-rating">
          <div className="star">{<i className="fa-solid fa-star"></i>}</div>
          <div className="spot-detail-avgrating">{spot.avgStarRating}</div>
          <div className="circle">{<i className="fas fa-circle"></i>}</div>
          <div className="spot-detail-numreview">
            {spot.numReviews + " review(s)"}
          </div>
          <div className="circle">{<i className="fas fa-circle"></i>}</div>
          <div>
            {spot.city}, {spot.state}, {spot.country}
          </div>
        </div>
        <div>
          {/* <img className="spot-detail-img" src={spot.SpotImages[0].url}></img> */}
        </div>
      </div>
    </div>
  );
};

export default SpotDetail;
