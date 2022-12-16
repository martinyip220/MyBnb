import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "reviews/get-all-reviews";
const CREATE_REVIEW = "reviews/create-review";
const DELETE_REVIEW = "reviews/delete-review";

const actionGetAllReviews = (reviews) => {
  return {
    type: GET_ALL_REVIEWS,
    reviews,
  };
};

const actionCreateReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const actionDeleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(actionGetAllReviews(reviews));
        return reviews
    }
}

export const createReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review)
  })

  if (response.ok) {
    const newReview = await response.json();
    dispatch(actionCreateReview(newReview));
    return newReview;
  }
}

const initialState = { allReviews: {}, userReviews: {} };

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      newState = { allReviews: {}, userReviews: {} };
      action.reviews.Reviews.forEach((review) => {
        newState.allReviews[review.id] = review;
      });
      return newState;
    }
    case CREATE_REVIEW: {
      newState = { ...state }
      newState[action.review.id] = action.review
      return newState;
      }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
