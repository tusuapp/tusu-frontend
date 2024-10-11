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
      <Container>
        <div className="container">
          <div className="inner-container">
            <h3 className="small-header pt-3">System Check</h3>
            <div className="system-check">
              <div className="row mt-3">
                <div className="col-md-3 ps-0">
                  <div className="d-flex tutors-list bg-white system-components">
                    <div className="flex-shrink-0">
                      <span>
                        <i className="fa fa-camera fa-2x fa-brand mt-2" />
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="m-0">Video Camera</h6>
                      <p className="text-success system-status">Working fine</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ps-0">
                  <div className="d-flex tutors-list bg-white system-components">
                    <div className="flex-shrink-0">
                      <span>
                        <i className="fa fa-globe fa-2x fa-brand mt-2" />
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="m-0">Internet Connection</h6>
                      <p className="system-status">
                        Netwrok Quality:{" "}
                        <span className="text-danger"> Poor</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ps-0">
                  <div className="d-flex tutors-list bg-white system-components">
                    <div className="flex-shrink-0">
                      <span>
                        <i className="fa fa-microphone fa-2x fa-brand mt-2" />
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="m-0">Microphone</h6>
                      <p className="system-status">
                        Netwrok Quality:{" "}
                        <span className="text-danger"> Poor</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ps-0">
                  <div className="d-flex tutors-list bg-white system-components">
                    <div className="flex-shrink-0">
                      <span>
                        <i className="fa fa-volume-up fa-2x fa-brand mt-2" />
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="m-0">Sound</h6>
                      <p className="text-success system-status">Working fine</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="system-check-image">
                <img
                  src="/image/img_snow_wide.jpg"
                  alt="CSR"
                  width="100%"
                  className="mt-4 mb-4"
                />
                <div className="centered">
                  <h5>Will be started after system check </h5>
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
