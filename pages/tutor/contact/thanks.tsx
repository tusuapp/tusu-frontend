import TutorDashboardLayout from "layouts/TutorDashboard";

function ContactThanks() {
  return (
    <>
      <TutorDashboardLayout>
        <div className="content-wrapper bg-light">
          <div className="container">
            <div className="inner-container notifications">
              <br />
              <br />
              <h3 className="small-header pt-3 m-0">Notifications</h3>
              <h6 className="pt-3 text-dark">Today</h6>
              <div className="d-flex  bg-white not-items mt-3">
                <div className="flex-shrink-0 m-3">
                  <img src="/image/radio-inactive.svg" />
                </div>
                <div className="flex-grow-1 ms-5 not-content">
                  <p className="m-0">
                    Your booking with Mr. James Mathew for Mathematics is
                    confirmed.
                  </p>
                  <p className="text-dark">1 Hour ago</p>
                </div>
              </div>
              <div className="d-flex mt-3 bg-white not-items">
                <div className="flex-shrink-0 m-3">
                  <img src="/image/radio-inactive.svg" />
                </div>
                <div className="flex-grow-1 ms-5 not-content">
                  <p className="m-0">
                    Your booking with Mr. James Mathew for Mathematics is
                    confirmed.
                  </p>
                  <p className="text-dark">2 Hours ago - 05:00 PM</p>
                </div>
              </div>
              <h6 className="pt-3 text-dark">Yesterday</h6>
              <div className="d-flex  bg-white not-items mt-3">
                <div className="flex-shrink-0 m-3">
                  <img src="/image/radio-inactive.svg" />
                </div>
                <div className="flex-grow-1 ms-5 not-content">
                  <p className="m-0">
                    Your booking with Mr. James Mathew for Mathematics is
                    confirmed.
                  </p>
                  <p className="text-dark">05:00 PM</p>
                </div>
              </div>
              <h6 className="pt-3 text-dark">08/01/2021</h6>
              <div className="d-flex  bg-white not-items mt-3">
                <div className="flex-shrink-0 m-3">
                  <img src="/image/radio-inactive.svg" />
                </div>
                <div className="flex-grow-1 ms-5 not-content">
                  <p className="m-0">
                    Your class with Mr. Ahmed Nejad is about to start at 6 pm.
                  </p>
                  <p className="text-dark">05:00 PM</p>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default ContactThanks;
