import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";

import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Header />
      <Container>
        <div className="container">
          <div className="payment">
            <div className="row justify-content-center">
              <div className="col-md-6 col-12">
                <img src="/image/payment-success.png" width="100%" />
                <div className="payment-description">
                  <h3 className="payment-heading">Payment Successful</h3>
                  <p className="payment-message">
                    Wait for Mr. Micheal James to confirm your booking
                  </p>
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
