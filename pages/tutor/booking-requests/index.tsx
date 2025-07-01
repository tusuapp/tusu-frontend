import BookingRequestCard from "modules/tutor/components/BookingRequestCard";
import TutorDashboardLayout from "layouts/TutorDashboard";
import BeatLoader from "react-spinners/BeatLoader";
import useBookingRequests from "@/tutor/hooks/useBookingRequests";
import PageEmptyDataView from "@/tutor/components/PageEmptyDataView";
import { useEffect, useState } from "react";
import { v2api } from "api";

function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const response = await v2api.get(
        "/user/classes/bookings?types=requested"
      );
      setRequests(response.data.bookings);
      console.log(requests);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch booking requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchRequests();
    }, 100);
    fetchRequests();
  }, []);

  return (
    <>
      <TutorDashboardLayout>
        <div className="d-flex">
          <h2 className="tutor__dashboard__title me-3 mb-4">
            Booking requests
          </h2>
          {loading && <BeatLoader loading={loading} color={"grey"} size={5} />}
        </div>

        {/* {error && "Failed to get data from the server"} */}

        {requests?.length === 0 && (
          <PageEmptyDataView message="No pending booking requests" />
        )}

        <div className="row">
          {requests &&
            requests.map((booking: any, index: any) => (
              <>
                <div className="col-lg-6 col-xl-5" key={index}>
                  <BookingRequestCard
                    id={booking.id}
                    name={booking.student.fullName}
                    subject={booking.subject}
                    amount={booking.totalAmount}
                    date={booking.schedule?.date}
                    startTime={booking.startTime}
                    endTime={booking.endTime}
                    notes={booking.notes}
                    // onChange={() => {
                    //   // dispatch(fetchBookings("pending"));
                    // }}
                  />
                </div>
              </>
            ))}
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default BookingRequests;
