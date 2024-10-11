import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authSlice from "../features/auth/authSlice";
import alertSlice from "../features/alerts/alertSlice";
import CMSSlice from "../features/CMS/CMSSlice";
import profileSlice from "../features/profile/profileSlice";
import tutorDashboardSlice from "../features/tutorDashboard/tutorDashboardSlice";
import notificationSlice from "../features/notification/notificationSlice";
import bookingSlice from "../features/booking/bookingSlice";
import { setToken, setApplicationName } from "../api";
import studentDashboardSlice from "../features/students/DashboardSlice";
import studentSubjectSlice from "../features/subjects";
import studentTutorProfileSlice from "../features/students/TutorProfileSlice";
import { getUserRole } from "../utils";
import chat from "../components/chat/redux/reducer";
import search from "../features/search/reducer";

const saveAuthToken = (store: any) => (next: any) => (action: any) => {
  if(!action)
    return
  if (action && action.type === "auth/getToken") {
    // after a successful login, update the token in the API

    setToken(action.payload);
  }

  if (action && action.type === "auth/getUser") {
    // after a successful login, update the token in the API

    const userRole = getUserRole(action.payload);

    setApplicationName(userRole);
  }

  // continue processing this action
  return next(action);
};

export function makeStore() {
  return configureStore({
    reducer: {
      chat: chat,
      search: search,
      auth: authSlice,
      alert: alertSlice,
      cms: CMSSlice,
      profile: profileSlice,
      bookings: bookingSlice,
      notification: notificationSlice,
      tutorDashboard: tutorDashboardSlice,
      student_dashboard: studentDashboardSlice,
      student_tutor_profile: studentTutorProfileSlice,
      student_subjects: studentSubjectSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(saveAuthToken),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
