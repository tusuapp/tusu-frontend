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
        <div className="inner-container my-5">
          <div className="d-flex">
            <div className="flex-shrink-0">
              <img src="/image/tutorprofileimage.png" alt="..." />
            </div>
            <div className="flex-grow-1 ms-3">
              <h6 className="text-black">James Andrews</h6>
              <p className="m-0">26 Years of experience</p>
              <p className="m-0">Physics, Chemistry</p>
            </div>
          </div>
          <div className="upcoming-classes mt-4">
            <div className="row">
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      17:27:00
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      17:27:00
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 my-classes mt-3">
                <div className="d-flex tutors-list">
                  <div className="flex-grow-1 ms-3">
                    <h4 className="tutor-name">Physics</h4>
                    <img className="class-timer" src="/image/clock.svg" />
                    <p className="my-class-time ps-2">23 Dec | SAT | 6Pm</p>
                    <button className="btn btn-brand btn-sm btn-myclass">
                      Join Now
                    </button>
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
