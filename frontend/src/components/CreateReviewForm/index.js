import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/reviews";
import { Redirect, useParams } from "react-router-dom";

import "./ReviewForm.css";

const ReviewForm = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSucess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}`} />;
  }

  const validations = () => {
    const errors = [];
    if (review.length < 20)
      errors.push("Please input a review with at least 20 characters");
    if (stars < 1 || stars > 5)
      errors.push("Please enter a rating between 1 and 5");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newReview = {
      review,
      stars,
    };

    const ValidationErrors = validations();
    if (ValidationErrors.length) {
      setErrors(ValidationErrors);
      return;
    }

    return dispatch(createReview(spotId, newReview)).then(async (res) => {
      setSubmitSucess(true);
    });
  };

    return (
        <div className="review-form-container">
            <form className="review-form-body" onSubmit={handleSubmit}>
                <div className="review-form-title">
                    <h1>Create a Review</h1>
                </div>
            <ul className="create-spot-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
                </ul>
                <label className="review-form-input-container">
                    <input
                        type="text"
                        className="review-form-input-review"
                        placeholder="Reviews must be at least 20 characters long"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    >
                    </input>
                    <input
                        type="number"
                        className="review-form-input-rating"
                        value={stars}
                        min={1}
                        onChange={(e) => setStars(e.target.value)}
                        required
                    >
                    </input>
                </label>
                <button className="create-review-button-form" type="submit">Create Review</button>
            </form>
        </div>
    )
};


export default ReviewForm;
