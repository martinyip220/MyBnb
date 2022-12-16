import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCurrentSpot } from "../../store/spots";
import "./SpotEdit.css";

const SpotEditForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spot = useSelector((state) => state.spots.singleSpot);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState([]);

  const validations = () => {
    const errors = [];
    if (address.length < 10) errors.push("Please enter an address");
    if (!city) errors.push("Please enter a city");
    if (!state) errors.push("Please enter a state");
    if (!country) errors.push("Please enter a country");
    if (!name) errors.push("Please enter a name");
    if (!description) errors.push("Please enter a description");
    if (price < 1)
      errors.push("Please enter a price greater than or equal to 1");
    if (!previewImage) errors.push("Please enter a valid image url");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let newData = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      lat: 94.022,
      lng: 50.739,
      previewImage,
    };

    const validationErrors = validations();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    return dispatch(editCurrentSpot(spotId, newData))
      .then(async (res) => {
        history.push(`/spots/${spotId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <>
      <div className="edit-whole-page">
        <div className="edit-spot-page">
          <div>
            <h1>Edit your Spot</h1>
          </div>
          <form className="edit-form-container" onSubmit={handleSubmit}>
            <ul className="edit-spot-errors">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="number"
                className="edit-spot-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={1}
                required
              />
            </label>
            <label>
              <input
                type="text"
                className="edit-spot-input"
                placeholder="Image URL"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                required
              />
            </label>
            <button className="edit-spot-button" type="submit">
              Confirm Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SpotEditForm;
