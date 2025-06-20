import EarningsChart from "@/tutor/components/EarningsChart";
import TutorDashboardLayout from "layouts/TutorDashboard";
import BookingRequestCard from "modules/tutor/components/BookingRequestCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import Filter from "../../components/filter";
import TutorClass from "../../components/tutorClass";
import withAuth from "../../HOC/withAuth";
import { api, fetch, v2api } from "../../api";
import useBookingRequests from "@/tutor/hooks/useBookingRequests";
import Spinner from "components/Spinner";
import moment from "moment";

function TutorDashboard() {
  const [dashData, setDashData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = async () => {
    setIsLoading(true);
    const response = await v2api.get("/tutor/dashboard");
    if (response.status === 200) {
      setDashData(response.data);
    } else {
      //setError("Failed to fetch dashboard data.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <>
      <TutorDashboardLayout>
        <div className="row">
          <div className="col-lg-7">
            <h2 className="tutor__dashboard__title">My Earnings</h2>
            <Filter
              options={null}
              onChange={(value: any) => setFilter(value.value)}
            />
            <div className="total-earnings">
              <div className="title">Your total earnings</div>
              <div className="earnings">
                ${`${dashData.totalEarning || "."}`}
              </div>
            </div>
            {/* <EarningsChart data={dashData} filter={filter} /> */}
          </div>
          <div className="col-lg-5">
            <h2 className="tutor__dashboard__title mb-4">Booking requests</h2>
            <div
              className="booking-requests-notification mb-3 d-flex justify-content-between"
              style={{ backgroundColor: "#924781" }}
            >
              <span>
                {!isLoading ? dashData.bookingRequests.length : "..."} New
                bookings{" "}
              </span>
              <span>
                <Link href="/tutor/booking-requests">
                  <a> View all</a>
                </Link>
              </span>
            </div>
            {isLoading && <Spinner />}
            {dashData &&
              !isLoading &&
              dashData.bookingRequests.map((booking: any) => (
                <BookingRequestCard
                  id={booking.id}
                  name={booking.student.fullName}
                  subject={booking.subject}
                  amount={booking.totalAmount}
                  date={booking.schedule?.date}
                  startTime={booking.startTime}
                  endTime={booking.endTime}
                />
              ))}
            <h4 style={{ fontSize: "22px" }} className="mb-3">
              Upcoming Classes
            </h4>
            {!isLoading &&
              dashData.upcomingClasses.map((booking: any) => (
                <div className="mb-3">
                  <TutorClass booking={booking} />
                </div>
              ))}
          </div>
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default withAuth(TutorDashboard);
