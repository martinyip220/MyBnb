import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import { useHistory, useParams } from "react-router-dom";
import "./spotReviews.css";

const SpotReviews = ({ spot }) => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const user = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews.allReviews);
  const reviews = Object.values(reviewsObj);
  console.log("reviews---------", reviews);

  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <div className="review-container">
        <div className="review-container-info">
          <div className="review-detail-star">
            {<i className="fa-solid fa-star"></i>}
            {(spot.avgStarRating || 0).toFixed(2)}
          </div>
          <div className="circle">{<i className="fas fa-circle"></i>}</div>
          <div className="review-detail-numreview">
            {spot.numReviews + " review(s)"}
          </div>
        </div>
        {reviews &&
          reviews.map((review) => (
            <div className="each-review" key={review.id}>
              <div>{review.User.firstName}</div>
              <div>
                Rating: {<i className="fa-solid fa-star"></i>} {review.stars}
              </div>
              <div>Review: {review.review}</div>
              <div>{review.ReviewImages.url}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SpotReviews;