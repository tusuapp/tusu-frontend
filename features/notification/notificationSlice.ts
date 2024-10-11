import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../../store";
import { api } from "api";

export interface notificationState {
  faq: any;
  privacyPolicy: any;
  termsAndServices: any;
}

const initialState: notificationState = {
  faq: null,
  privacyPolicy: null,
  termsAndServices: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    getFAQ: (state, action) => {
      state.faq = action.payload;
    },
    getPrivacyPolicy: (state, action) => {
      state.privacyPolicy = action.payload;
    },
    getTermsAndServices: (state, action) => {
      state.termsAndServices = action.payload;
    },
  },
});

// Actions

export const fetchFAQ = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/faqs");

    dispatch(getFAQ(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchPrivacyPolicy = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/pages/privacy-policy");

    dispatch(getPrivacyPolicy(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchTermsAndServeices = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/pages/terms-and-conditions");

    dispatch(getTermsAndServices(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const {
  getFAQ,
  getPrivacyPolicy,
  getTermsAndServices,
} = notificationSlice.actions;

export const selectCMS = (state: AppState) => state.cms;

export default notificationSlice.reducer;
