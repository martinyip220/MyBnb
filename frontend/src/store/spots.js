import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/get-all-spots";
const GET_SPOT = "spots/get-spot";
const CREATE_SPOT = "spots/create-spot";
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

const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot,
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

export const createNewSpot = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpot(newSpot));
    return newSpot;
  }
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(getAll(spots));
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    console.log("single spot", spot);
    dispatch(getSpot(spot));
  }
};

const initialState = {
  allSpots: {},
  singleSpot: {},
};

const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_SPOTS: {
      newState = {
        allSpots: {},
        singleSpot: {},
      };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case GET_SPOT: {
      newState = { ...state, singleSpot: {} };
      newState.singleSpot = action.spot;
      return newState;
    }
    case CREATE_SPOT: {
      newState = { ...state, allSpots: { ...state.allSpots } };
      if (Array.isArray(action.newSpot)) {
        action.newSpot.forEach((spot) => {
          newState.allSpots[spot.id] = spot;
        });
      } else {
        newState.allSpots[action.newSpot.id] = action.newSpot;
      }
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
