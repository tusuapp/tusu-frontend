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
        <div className="discipline">
          <h3 className="discipline-head">Mathematics tutors</h3>
          <div className="search-box">
            <form className="form-search" method="get" id="s" action="/">
              <div className="row">
                <div className="col-md-3">
                  <div className="discipline-form input-append ">
                    <input
                      type="text"
                      className="search-box input-medium search-query form-control"
                      name="s"
                      placeholder="Search"
                      style={{ paddingRight: "45px" }}
                    />
                    <button type="submit" className="add-on search-icon">
                      <i className="fa fa-search" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="tutors">
            <div className="row">
              <div className="col-lg-4 my-classes">
                <div className="d-flex tutors-list">
                  <div className="flex-shrink-0">
                    <img
                      src="/image/tutors/1.png"
                      className="mr-3 tutors-image"
                      alt="..."
                      width="71px"
                      height="71px"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">John Doe</h4>
                    <h6 className="tutor-subject">Mathematics</h6>
                    <div className="star-rating">
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <img src="/image/chat.svg" className="float-end" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4  my-classes">
                <div className="d-flex tutors-list">
                  <div className="flex-shrink-0">
                    <img
                      src="/image/tutors/2.png"
                      className="mr-3 tutors-image"
                      alt="..."
                      width="71px"
                      height="71px"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">John Doe</h4>
                    <h6 className="tutor-subject">Physics</h6>
                    <div className="star-rating">
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <img src="/image/chat.svg" className="float-end" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4  my-classes">
                <div className="d-flex tutors-list">
                  <div className="flex-shrink-0">
                    <img
                      src="/image/tutors/5.png"
                      className="mr-3 tutors-image"
                      alt="..."
                      width="71px"
                      height="71px"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">John Doe</h4>
                    <h6 className="tutor-subject">Botany</h6>
                    <div className="star-rating">
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <img src="/image/chat.svg" className="float-end" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 my-classes">
                <div className="d-flex tutors-list">
                  <div className="flex-shrink-0">
                    <img
                      src="/image/tutors/5.png"
                      className="mr-3 tutors-image"
                      alt="..."
                      width="71px"
                      height="71px"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">John Doe</h4>
                    <h6 className="tutor-subject">Botany</h6>
                    <div className="star-rating">
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star checked" />
                      <span className="fa fa-star" />
                      <span className="fa fa-star" />
                      <img src="/image/chat.svg" className="float-end" />
                    </div>
                  </div>
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
