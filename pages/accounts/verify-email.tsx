import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { getUserRole, isEmailVerfied } from "../../utils";
import Router from "next/router";

function Home() {
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    if (!user) return;

    console.log("verify-email ");
    console.log(user.is_email_verified);

    if (isEmailVerfied(user)) {
      Router.push("/" + getUserRole(user));
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Header /> */}
      <Header />
      <Container>
        <div className="container ">
          <div className="payment" style={{ minWidth: "70vh" }}>
            <div
              className="row justify-content-center align-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-6 text-center">
                <img src="/image/tutorimg.svg" />
                <div
                  className="payment-description"
                  style={{ paddingTop: "50px" }}
                >
                  <h3
                    className="payment-heading"
                    style={{
                      color: "#414141",
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  >
                    Thanks for registering <br /> With us
                  </h3>
                  <p className="payment-message" style={{ color: "#8D8D8D" }}>
                    Please click the link that we've sent to your registered
                    email address.
                    <b style={{ color: "#" }}>{user?.email}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
