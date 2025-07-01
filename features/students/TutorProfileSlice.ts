import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "store";
import { api, setApplicationName, v2api } from "api";

const ROLE = "student";

export interface studentTutorProfileState {
  disciplines: any;
  all_tutors: any;
  recomended_tutors: any;
  popular_tutors: any;
  dashboard: {
    popular_tutors: Object[];
    recommended_tutors: Object[];
    subjects: Object[];
    tutors: Object[];
    upcoming_class: Object[];
  };
}

const initialState: any = {
  id: null,
  username: "",
  email: "",
  phone: "",
  fullname: "",
  country: {
    id: 1,
    name: "India",
    country_code: "91",
    iso_code: "IND",
    dial_code: 91,
  },
  tutor_details: {
    description: "",
    experience: 0,
    hourly_charge: "0",
    gender: "",
    video: null,
    address: null,
  },
  timezone: null,
  image: "",
  ratting: 4,
  subjects: [],
  discipline: [],
  languages: [],
  schedules: [],
  pre_requiesites: [],
};

export const studentTutorProfileSlice = createSlice({
  name: "student_tutor_profile",
  initialState,
  reducers: {
    getTutorProfile: (state, action) => {
      return action.payload;
    },
  },
});

// Actions

export const fetchTutorProfile =
  (tutor_id: any): AppThunk =>
  async (dispatch) => {
    try {
      setApplicationName(ROLE);

      const response = await v2api.get(`/user/profile/tutor/${tutor_id}`);

      dispatch(getTutorProfile(response.data));
      return true;
    } catch (e) {
      return false;
    }
  };

export const { getTutorProfile } = studentTutorProfileSlice.actions;

export const selectStudentTutorProfile = (state: AppState) =>
  state.student_tutor_profile;

export default studentTutorProfileSlice.reducer;
