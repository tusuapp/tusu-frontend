import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "store";
import { api } from "api";

export interface tutorDashboardState {
  dashboard: any;
  earnings: any;
}

const initialState: tutorDashboardState = {
  dashboard: null,
  earnings: null,
};

export const tutorDashboardSlice = createSlice({
  name: "tutorDashboard",
  initialState,
  reducers: {
    getDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
    getEarnings: (state, action) => {
      state.earnings = action.payload;
    },
  },
});

// Actions

export const fetchDashboard = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/tutor/dashboard");

    dispatch(getDashboard(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchEarnings = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/tutor/earnings");

    dispatch(getEarnings(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const { getDashboard, getEarnings } = tutorDashboardSlice.actions;

export const selectTutorDashboard = (state: AppState) => state.tutorDashboard;

export default tutorDashboardSlice.reducer;
