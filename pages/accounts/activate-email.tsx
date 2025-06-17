import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { activateEmail, selectAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { toast } from "react-toastify";

function Home() {
  const { emailVerified } = useSelector(selectAuth);
  const router = useRouter();
  const { confirmation } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!confirmation) return;

    dispatch(activateEmail(confirmation));
  }, [router.query]);

  useEffect(() => {
    if (emailVerified) {
      // alert("email verified")
      toast.success("Email verification success");
      Router.push("/signin");
    }
  }, [emailVerified]);

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container>
        <div className="container ">
          <div className="payment" style={{ minWidth: "70vh" }}>
            <div
              className="row justify-content-center align-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-6 text-center">
                <img src="/image/contacct.png" />
                <div
                  className="payment-description"
                  style={{ paddingTop: "50px" }}
                >
                  <h3 className="payment-heading">Loading..</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Home;
