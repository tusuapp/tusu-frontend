import { createSlice } from "@reduxjs/toolkit";
import type { AppState, AppThunk } from "store";
import { api, setApplicationName, v2api } from "api";
import { getErrorMessages, getSuccessMessages } from "../alerts/alertSlice";
import { convertErrorsToArray } from "../../utils";
import { toast } from "react-toastify";
import router, { Router } from "next/router";
import axios from "axios";

export interface AuthState {
  user: any;
  token: any;
  emailVerified: boolean;
  is_profile_completed: boolean;
  is_confirmed: boolean;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  user: null,
  token: null,
  emailVerified: false,
  is_profile_completed: false,
  is_confirmed: false,
  status: "idle",
  // role: "guest",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    getToken: (state, action) => {
      state.token = action.payload;
    },

    getUser: (state, action) => {
      state.user = action.payload;
    },

    setEmailVerified: (state, action) => {
      state.emailVerified = action.payload;
    },

    logoutTutor: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Actions

export const fetchUser = (): AppThunk => async (dispatch) => {
  try {
    const response = await v2api.get("/user/profile/me");
    dispatch(getUser(response.data));
  } catch (e: any) {
    console.log("Unable to fetch user");
    router.replace("/signin");
    dispatch(getUser(null));
    dispatch(getToken(null));

    return console.error(e.message);
  }
};

// Tutor APIs

export const signInTutor =
  (data: any, setIsLoading: any): AppThunk =>
  async (dispatch) => {
    try {
      setApplicationName("tutor");
      axios
        .post("https://v2.api.tusuapp.com/auth/login", data, {
          headers: {
            "Content-Type": "application/json",
            "application-name": "tutor",
          },
        })
        .then((response) => {
          // console.log(response);

          dispatch(getSuccessMessages(["Login success"]));

          dispatch(getToken(response.data.jwt));

          dispatch(getUser(response.data.user));

          localStorage.setItem("accessToken", response.data.jwt);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(response.data.user)
          );

          setIsLoading(false);
        })
        .catch((error) => {
          // console.log(error.response);

          if (error?.response?.data?.message) {
            toast.error(error.response?.data.message);
            setIsLoading(false);
          }
        });
    } catch (error) {
      // if (error?.response?.data?.message) {
      //   alert(error.response?.data.message);
      // }
      dispatch(getErrorMessages(["Something went wrong! Please try again"]));
    }
  };

export const signIn = (data: any, role: string) => async (dispatch: any) => {
  try {
    setApplicationName(role);

    const response = await axios.post(
      "https://v2.api.tusuapp.com/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "application-name": role,
        },
      }
    );
    dispatch(getSuccessMessages(["Login success"]));
    dispatch(getToken(response.data.jwt));
    dispatch(getUser(response.data.user));
    localStorage.setItem("accessToken", response.data.jwt);
    localStorage.setItem("currentUser", JSON.stringify(response.data.user));
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    throw { status, message };
  }
};

export const signUp =
  (data: any): AppThunk =>
  async (dispatch) => {
    try {
      const response = await v2api.post("/auth/register", data);

      toast.success("Account created successfully");

      dispatch(getUser(response.data.user));

      router.push(
        `/accounts/verify-otp?session=${response.data.sessionId}&type=student`
      );
    } catch (e: any) {
      console.log("Res", e?.response);

      dispatch(getErrorMessages([e?.response?.data?.error]));

      return e?.response?.data?.error;
    }
  };

export const requestResetPassWordLink =
  (email: any): AppThunk =>
  async (dispatch) => {
    try {
      await api.post("/auth/forgot-password", email);
      toast.success("Password reset link sent successfully!");
      dispatch(getSuccessMessages(["Password reset link sent successfully"]));
    } catch (e: any) {
      toast.error("Unknown error occured!");

      dispatch(getErrorMessages(["Unknown error occured"]));
      return console.log(e.message);
    }
  };

export const signUpTutor =
  (data: any): AppThunk =>
  async (dispatch) => {
    data = {
      ...data,
      countryId: 1,
      role: "tutor",
    };

    setApplicationName("tutor");
    return v2api
      .post("/auth/register", data)
      .then((res) => {
        toast.success("Account created successfully");
        return res;
      })
      .catch((error) => {
        const status = error.response.status;

        if (status === 500) {
          toast.error("Something went wrong!");
          return error;
        }

        dispatch(getErrorMessages([error?.response?.data?.error]));

        return error?.response?.data?.error;
      });
  };

export const updateProfile =
  (data: any, role: any): AppThunk =>
  async (dispatch) => {
    try {
      setApplicationName(role);

      const response = await api.put("/tutor/edit-profile", data);

      toast.success("Profile updated successfully1");

      dispatch(getUser(response.data.result));
      router.push("/tutor/profile");
    } catch (e: any) {
      const errorMessages = convertErrorsToArray(e?.response?.data?.error);

      // toast.error("Something went wrong");

      dispatch(getErrorMessages(errorMessages));

      return e?.response?.data?.error;
    }
  };

export const activateEmail =
  (token: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setEmailVerified(false));

      const response = await api.post("/auth/confirm-account", {
        confirmation: token,
      });

      dispatch(setEmailVerified(true));
    } catch (e: any) {
      const errorMessages = convertErrorsToArray(e?.response?.data?.error);
      dispatch(setEmailVerified(false));
      toast.error("Email verification failed");
      return console.log(errorMessages);
    }
  };

export const signOutTutor = (): AppThunk => async (dispatch) => {
  try {
    localStorage.removeItem("accessToken");

    getToken(null);

    getUser(null);
    window.location.replace("/");
  } catch (e: any) {
    return console.log(e.message);
  }
};

export const { getToken, getUser, logoutTutor, setEmailVerified, setStatus } =
  authSlice.actions;

export const selectAuth = (state: AppState) => state.auth;

export default authSlice.reducer;
