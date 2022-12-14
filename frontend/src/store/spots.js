import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/get-all-spots";
const GET_SPOT = "spots/get-spot";
const ADD_SPOT = "spots/add-spot";
const DELETE_SPOT = "spots/delete";
const EDIT_SPOT = "spots/edit";
const GET_USER_SPOTS = "spots/get-user-spots";

const getAll = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

const getUserSpots = (currentSpots) => {
  return {
    type: GET_USER_SPOTS,
    currentSpots,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  console.log("spots get all", spots.Spots);
  dispatch(getAll(spots.Spots));
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json();
    console.log("single spot", spot)
    dispatch(getSpot(spot));
    return spot;
  }
  return response;
}

const initialState = { entries: [] };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      return { ...state, entries: [...action.spots] };
    }
    case GET_SPOT: {
      const spot = action.spot;
      return {...state, ...spot}
      }
    default:
      return state;
  }
};

export default spotsReducer;
