import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "../../store";
import { api, v2api } from "api";
import { toast } from "react-toastify";
import { convertErrorsToArray } from "../../utils";
import { getErrorMessages } from "../alerts/alertSlice";

export interface ProfileState {
  desciplines: any;
  subjects: any;
  notifications: any;
  schedules: any;
  hasNotificationsUpdated: boolean;
  is_details_added: boolean;
  is_schedule_created: boolean;
}

const initialState: ProfileState = {
  desciplines: [],
  subjects: [],
  schedules: { days: [], time_slots: [] },
  notifications: [],
  hasNotificationsUpdated: false,
  is_details_added: false,
  is_schedule_created: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getDesciplines: (state, action) => {
      state.desciplines = action.payload;
    },
    getSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    getNotifications: (state, action) => {
      state.notifications = action.payload;
      state.hasNotificationsUpdated = true;
    },
    getSchedules: (state, action) => {
      state.schedules = action.payload;
    },
    setDetailsAdded: (state, action) => {
      state.is_details_added = action.payload;
    },
    setScheduleCreated: (state, action) => {
      state.is_schedule_created = action.payload;
    },
  },
});

export const fetchDesciplines = (): AppThunk => async (dispatch) => {
  try {
    const response = await v2api.get("/dropdowns?types=discipline");
    dispatch(getDesciplines(response.data.result.disciplines));
  } catch (e: any) {
    return console.log(e.message);
  }
};

export const fetchSubjects = (): AppThunk => async (dispatch) => {
  try {
    const response = await v2api.get("/dropdowns?types=subject");
    console.log(response.data.result);

    dispatch(getSubjects(response.data.result.subjects));
  } catch (e: any) {
    return console.log(e.message);
  }
};

export const fetchNotifications = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/notification/list");
    console.log(response);
    dispatch(getNotifications(response.data.result));
  } catch (e: any) {
    return console.log(e.message);
  }
};

export const fecthTutorSchedules = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/tutor/tutor-slots");
    console.log(response);
    dispatch(getSchedules(response.data.result));
  } catch (e: any) {
    return console.log(e.message);
  }
};

export const createTutorSchedule =
  (data: any): AppThunk =>
  async (dispatch) => {
    // alert(JSON.stringify(data));

    try {
      console.log(data);
      const response = await api.post("/tutor/tutor-slots", {
        times_slots: data,
      });
      toast.success("Schedule created successfully");
      dispatch(setScheduleCreated(true));
    } catch (e: any) {
      toast.error("Something went wrong");
      return console.log(e.message);
    }
  };

export const updateTutorSchedule =
  (data: any): AppThunk =>
  async (dispatch) => {
    try {
      console.log(data);
      const response = await api.put("/tutor/tutor-slots", {
        times_slots: data,
      });
      toast.success("Schedule updated successfully");

      console.log(response);
      return response;
    } catch (e: any) {
      toast.error("Something went wrong");
      return console.log(e.message);
    }
  };

export const editTutorSchedule =
  (data: any): AppThunk =>
  async (dispatch) => {
    alert("Create schedule");
    try {
      const response = await api.put("/tutor/tutor-slots", data);
      console.log(response);
    } catch (e: any) {
      return console.log(e.message);
    }
  };

export const addTutorDetails =
  (data: any): AppThunk =>
  async (dispatch) => {
    // alert("Add tutor details");
    dispatch(setDetailsAdded(false));

    try {
      const response = await api.put("/tutor/profile", data);

      dispatch(setDetailsAdded(true));
    } catch (e: any) {
      const errorMessages = convertErrorsToArray(e?.response?.data?.error);

      // toast.error("Something went wrong");

      dispatch(getErrorMessages(errorMessages));

      return console.log(e.message);
    }
  };

export const {
  getDesciplines,
  getSubjects,
  getNotifications,
  getSchedules,
  setDetailsAdded,
  setScheduleCreated,
} = profileSlice.actions;

export const selectProfile = (state: AppState) => state.profile;

export default profileSlice.reducer;
