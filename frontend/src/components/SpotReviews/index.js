import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";
import "./spotReviews.css";

const SpotReviews = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const users = useSelector((state) => state.users);
  console.log("sdfsdfsdfsd", users)
  const sessionUser = useSelector((state) => state.session.user)
  const reviewsObj = useSelector((state) => state.reviews.allReviews);
  const reviews = Object.values(reviewsObj);
  console.log("reviews---------", reviews);

  console.log("------ownerid", spot.Owner.id)

  useEffect(() => {
    dispatch(getAllReviews(spotId));
  }, [dispatch, spotId]);

  const handleReviewButton = (e) => {
    e.preventDefault();
    history.push(`/spots/${spotId}/create-review`)
  }

  const userReview = reviews.filter((review) => {
    if (!sessionUser) {
      return [];
    } else {
      return review.userId === sessionUser.id && review.spotId === spotId
    }
  })

  const avgRating = () => {
    let rating = 0
    if (spot.avgStarRating === null) {
      return "New"
    } else {
      rating += spot.avgStarRating;
      return parseFloat(rating).toFixed(2)
    }
  }

  return (
    <>
      <div className="review-container">
        <div className="review-container-info">
          <div className="review-container-left">
          <div className="review-detail-star">
            {<i className="fa-solid fa-star"></i>}
            {avgRating()}
          </div>
          <div className="circle">{<i className="fas fa-circle"></i>}</div>
          <div className="review-detail-numreview">
            {spot.numReviews + " review(s)"}
            </div>
          </div>
          <div className="review-container-right">
          <div>
            {!userReview.length && sessionUser && (
              <button className="create-review-button" onClick={handleReviewButton}>Create Review</button>
            )}
          </div>
          </div>
        </div>
        {reviews &&
          reviews.map((review) => (
            <div className="each-review" key={review.id}>
              <div className="delete-and-name">
              <div className="review-name">{review.User.firstName}</div>
              {sessionUser && sessionUser.id === review.userId &&
                <button className="delete-review-button" onClick={async (e) => {
                  e.preventDefault(e);
                  dispatch(deleteReview(review.id));
                  history.push("/")
                }}>Delete Review</button>
              }
                </div>
              <div>
                Rating: {<i className="fa-solid fa-star"></i>} {review.stars}
              </div>
              <div>Review: {review.review}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SpotReviews;
