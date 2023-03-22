import { csrfFetch } from "./csrf";

const CREATE_BOOKING = "booking/CREATE_BOOKING";
const GET_ALL_USER_BOOKINGS = "bookings/GET_ALL_USER_BOOKINGS";
const GET_ALL_SPOT_BOOKINGS = "bookings/GET_ALL_SPOT_BOOKINGS";
const DELETE_BOOKING = "booking/DELETE_BOOKING";
const EDIT_BOOKING = "booking/EDIT_BOOKING";

// ACTIONS

const createBooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking,
});

const getAllUserBookings = (bookings) => ({
  type: GET_ALL_USER_BOOKINGS,
  payload: bookings,
});

const getAllSpotBookings = (bookings) => ({
  type: GET_ALL_SPOT_BOOKINGS,
  payload: bookings,
});

const deleteBooking = (bookingId) => ({
  type: DELETE_BOOKING,
  payload: bookingId,
});

const editBooking = (booking) => ({
  type: EDIT_BOOKING,
  payload: booking,
});

// Action Thunks

export const createBookingThunk = (bookingData) => async (dispatch) => {
  const { spotId, startDate, endDate } = bookingData;

  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate,
      endDate,
    }),
  });

  if (response.ok) {
    const newBooking = await response.json();
    dispatch(createBooking(newBooking));
    return newBooking;
  }
};

export const getAllUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const bookings = await response.json();
        await dispatch(getAllUserBookings(bookings));
        return bookings;
    }
}

export const getAllSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

    if (response.ok) {
        const bookings = await response.json();
        await dispatch(getAllSpotBookings(bookings));
        return bookings;
    }
}

const initialState = { userBookings: {}, spotBookings: {}, singleBooking: {} };

const bookingsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_BOOKING: {
      newState = { ...state };
      newState.spotBookings[action.payload.id] = action.payload;
      return newState;
    }
  }
};

export default bookingsReducer;
