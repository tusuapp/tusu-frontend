import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "store";
import { api, setApplicationName } from "api";

export interface BookingState {
  bookings: any;
  booked_pending_classes: any;
}

const initialState: BookingState = {
  bookings: [],
  booked_pending_classes: [],
};

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    getBookings: (state, action) => {
      state.bookings = action.payload;
    },
    getBookedPendingClasses: (state, action) => {
      state.booked_pending_classes = action.payload;
    },
  },
});

export const fetchBookings = (status: any): AppThunk => async (dispatch) => {
  let url = "/tutor/my-bookings/";
  switch (status) {
    case "pending":
      url = "/tutor/my-bookings/?status_eq=pending";
      break;

    case "accepted":
      url = "/tutor/my-bookings/accepted";
      break;
    default:
      break;
  }

  try {
    setApplicationName("tutor");

    const response = await api.get(url);
    dispatch(getBookings(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchBookingsByDate = (date = "2021-06-22"): AppThunk => async (
  dispatch
) => {
  let url = `/tutor/my-bookings/?schedule_date_eq=${date}&status_eq=pending`;

  try {
    const response = await api.get(url);
    console.log(response);
    dispatch(getBookedPendingClasses(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const { getBookings, getBookedPendingClasses } = bookingSlice.actions;

export const selectBookings = (state: AppState) => state.bookings;

export default bookingSlice.reducer;
