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
          <div className="ratimng">
            <div className="row justify-content-center">
              <div className="col-md-6 col-12 text-center">
                <div className="rate-description ">
                  <p className="payment-message align-middle">
                    How was Mr. James Andrews's class. <br /> Please give your
                    feedback.
                  </p>
                  <form>
                    {/* <textarea  rows="6" placeholder="Describe yourself here..."> </textarea> */}
                    <div className="star-rating">
                      <label>Rate tutor</label> <br />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <input
                        type="hidden"
                        name="rating"
                        id="rating"
                        defaultValue={2}
                      />
                    </div>
                    <label>Feedback</label>
                    <textarea
                      name="feddback"
                      id="feddback"
                      title="Feedback"
                      rows={5}
                      maxLength={100}
                      placeholder="Type Here..."
                      required
                      defaultValue={""}
                    />
                    <button className="btn btn-brand btn-submit" type="submit">
                      Submit
                    </button>
                  </form>
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
