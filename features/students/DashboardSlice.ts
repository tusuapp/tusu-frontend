import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "store";
import { api, setApplicationName } from "api";

const ROLE = "student";

export interface studentDaashboardState {
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

const initialState: studentDaashboardState = {
  disciplines: null,
  all_tutors: null,
  recomended_tutors: null,
  popular_tutors: null,
  dashboard: {
    popular_tutors: [],
    recommended_tutors: [],
    subjects: [],
    tutors: [],
    upcoming_class: [],
  },
};

export const studentDashboardSlice = createSlice({
  name: "student_dashboard",
  initialState,
  reducers: {
    getAllTutors: (state, action) => {
      state.all_tutors = action.payload;
    },
    getPopularTutors: (state, action) => {
      state.popular_tutors = action.payload;
    },
    getRecomendedTutors: (state, action) => {
      state.recomended_tutors = action.payload;
    },
    getDisciplines: (state, action) => {
      state.disciplines = action.payload;
    },
    getDashboard: (state, action) => {
      state.dashboard = {
        popular_tutors: action.payload.popular_tutors,
        recommended_tutors: action.payload.recommended_tutors,
        subjects: action.payload.subjects,
        tutors: action.payload.tutors,
        upcoming_class: action.payload.upcoming_class,
      };
    },
  },
});

// Actions

export const fetchAllTutors = (): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);
    const response = await api.get("/student/tutors?type=all-tutors&limit=1000");
    dispatch(getAllTutors(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchPopularTutors = (): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);

    const response = await api.get("/student/tutors?type=my-tutors");

    dispatch(getPopularTutors(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchRecomendedTutors = (): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);

    const response = await api.get("/student/tutors?type=my-tutors");

    dispatch(getRecomendedTutors(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchDisciplines = (): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);

    const response = await api.get("/student/tutors?type=my-tutors");

    dispatch(getDisciplines(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchDashboard = (): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);
    const response = await api.get("/student/dashboard");
    dispatch(getDashboard(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const {
  getAllTutors,
  getDashboard,
  getDisciplines,
  getPopularTutors,
  getRecomendedTutors,
} = studentDashboardSlice.actions;

export const selectStudentDashboard = (state: AppState) =>
  state.student_dashboard;

export default studentDashboardSlice.reducer;
