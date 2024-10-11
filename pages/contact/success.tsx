import Header from "components/header";
import Container from "components/container";
import Footer from "components/footer";
import Head from "next/head";
import router from "next/router";

function Home() {
  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* <Header /> */}
      <Header />
      <Container>
        <div className="container">
          <div className="payment">
            <div className="row justify-content-center">
              <div className="col-4 text-center" style={{ marginTop: "50px" }}>
                <img src="/image/contacct.png" />
                <div
                  className="payment-description"
                  style={{ paddingTop: "50px" }}
                >
                  <h3 className="payment-heading">
                    Thanks for Contacting With us !
                  </h3>
                  <p className="payment-message">
                    We will be back soon to your email : ahmedmazin@gmail.com
                  </p>
                  <button
                    style={{
                      border: "1px solid #924781",
                      backgroundColor: "#924781",
                      color: "white",
                      borderRadius: "8px",
                      width: "253px",
                      height: "53px",
                    }}
                    onClick={() => router.push(`/student`)}
                  >
                    Back to Home
                  </button>
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
