// HOC/withAuth.jsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loadingScreen";
import { selectAuth } from "../features/auth/authSlice";
import { getUserRole, isEmailVerfied, isProfileCompleted } from "../utils";

const verifyToken = (token: string | null) => {
  return token;
};

// TODO:

// 1. Redirect to tutor dashboard if the user is tutor, if user is student redirect to student dashbaord
// 2. Redirect the user to profile completion page if the users profile is not complete.
// 3. Redirect the user to email activation page if their mail is not verified

const withAuthNew = (WrappedComponent: React.FC, role: any) => {
  return (props: any) => {
    const Router = useRouter();
    const { user, token } = useSelector(selectAuth);

    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");

      // if no accessToken was found,then we redirect to "/" page.

      if (!accessToken) {
        Router.replace("/signin");
      } else {
        // we call the api that verifies the token.
        const data = verifyToken(accessToken);
        // if token was verified we set the state.
        // if (data.verified) {
        // } else {
        //   // If the token was fraud we first remove it from localStorage and then redirect to "/"
        //   localStorage.removeItem("accessToken");
        //   Router.replace("/");
        // }
      }
    }, []);

    useEffect(() => {
      if (!user) return;

      if (!isEmailVerfied(user)) {
        Router.replace("/accounts/verify-email");
        return;
      }

      if (getUserRole(user) !== role) {
        Router.replace("/");
        return;
      }

      if (isEmailVerfied(user)) {
        setVerified(true);
        return;
      }
    }, [user]);

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return <LoadingScreen />;
    }
  };
};

export default withAuthNew;
