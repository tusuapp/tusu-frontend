import { createSlice } from "@reduxjs/toolkit";
import type { AppState } from "store";

export interface AlertState {
  errors: any;
  messages: any;
  warnings: any;
  succeses: any;
}

const initialState: AlertState = {
  errors: [],
  messages: [],
  warnings: [],
  succeses: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    getWarningMessages: (state, action) => {
      state.warnings = action.payload;
    },

    getSuccessMessages: (state, action) => {
      state.succeses = action.payload;
    },

    getErrorMessages: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  getSuccessMessages,
  getWarningMessages,
  getErrorMessages,
} = alertSlice.actions;

export const selectAlerts = (state: AppState) => state.alert;

export default alertSlice.reducer;
