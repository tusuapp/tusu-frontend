import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import "../styles/styles.scss";
import "../modules/tutor/components/EarningsChart/Slider/slider.scss";
import { fetchUser, getToken } from "../features/auth/authSlice";
import { Provider } from "react-redux";
import store from "store";
import { Fragment, useEffect } from "react";
import AlertProvider from "../components/AlertProvider";
import { getTokenFromLocalStorage } from "../utils";
import { QueryClient, QueryClientProvider } from "react-query";
import { Page } from "../@types/page";
import "../styles/custom.scss";
import { ReactQueryDevtools } from "react-query/devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Firebase from "firebase";
import firebaseConfig from "config/firebase";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

// Add getLayout type to the AppProps type
type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const queryClient = new QueryClient();

  // Add per page layout
  // const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  const publicRoutes = [
    "/",
    "/signin",
    "/signup/verification/email-verify",
    "/signup",
    "/signup/student",
    "/signup/tutor",
    "/verify-email",
    "/accounts/verify-otpaccounts/verify-otp",
    "/accounts/forgot-password",
    "/accounts/reset-password",
  ];

  if (!Firebase.apps.length) {
    Firebase.initializeApp(firebaseConfig);
  } else {
    Firebase.app(); // if already initialized, use that one
  }

  useEffect(() => {
    const path = Router.pathname;
    if (publicRoutes.includes(path)) {
      return;
    }

    getTokenFromLocalStorage()
      .then((persistedState) => {
        // Updates sate redux state with persisted state.
        store.dispatch(getToken(persistedState));

        // Fetchs the user details from server to check if the token recieved from local storage is valid or not.
        store.dispatch(fetchUser());
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="529736285529-vpt2rtjkhtpl6du6smkc6im93qvgbaj5.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <AlertProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AlertProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
