import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/loadingScreen";
import { selectAuth } from "../features/auth/authSlice";
import {
  isEmailVerfied,
  isProfileCompleted,
  isTutorApprovalPending,
} from "../utils";

const verifyToken = (token: string | null) => {
  return token;
};

/* Higher order component wich can be wrapped to other page components.
Components wrapped with withAuth can only be openend if the user is authenticaed */

const withAuth = (WrappedComponent: React.FC) => {
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
        // alert("Email not verified")
        Router.replace("/accounts/verify-email");
        return;
      }

      if (!isProfileCompleted(user)) {
        // alert("profile not completed")
        Router.replace("/tutor/complete-profile");
        return;
      }

      if (isEmailVerfied(user) && isProfileCompleted(user)) {
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

export default withAuth;
