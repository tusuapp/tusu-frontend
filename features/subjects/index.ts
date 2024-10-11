import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "store";
import { api, setApplicationName } from "api";

const ROLE = "student";

export interface studentDaashboardState {
  subject_tutor: any;
  all_tutors: any;
}

const initialState: studentDaashboardState = {
  subject_tutor: [],
  all_tutors: null,
};

export const subjectSlice = createSlice({
  name: "student_subjects",
  initialState,
  reducers: {
    getAllStudentSubjectTutors: (state, action) => {
      state.subject_tutor = action.payload;
    },
    getAllTutors: (state, action) => {
      state.all_tutors = action.payload;
    },
  },
});

// Actions
export const fetchAllSubjectTutors = (
  subjectId: number | string | string[] | undefined
): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);
    const response = await api.get(
      `/student/tutors?type=subjects-tutors&subject_id=${subjectId}&search=`
    );
    dispatch(getAllStudentSubjectTutors(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const fetchAllTutors = (type="all-tutors"): AppThunk => async (dispatch) => {
  try {
    setApplicationName(ROLE);
//type=my-tutors
    const response = await api.get("/student/tutors?type="+type+"&limit=1000");
    
    dispatch(getAllTutors(response.data.result));
  } catch (e:any) {
    return console.log(e.message);
  }
};

export const { getAllStudentSubjectTutors, getAllTutors } = subjectSlice.actions;

export const subjects = (state: AppState) => state.student_subjects;

export default subjectSlice.reducer;
