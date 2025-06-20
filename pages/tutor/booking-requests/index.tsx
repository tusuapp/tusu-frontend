import BookingRequestCard from "modules/tutor/components/BookingRequestCard";
import TutorDashboardLayout from "layouts/TutorDashboard";
import BeatLoader from "react-spinners/BeatLoader";
import useBookingRequests from "@/tutor/hooks/useBookingRequests";
import PageEmptyDataView from "@/tutor/components/PageEmptyDataView";
import { useEffect, useState } from "react";
import { v2api } from "api";

function BookingRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await v2api.get("/user/classes/bookings", {
          params: { types: "requested" },
        });
        setData(response.data.bookings);
        console.log(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while fetching bookings.";
        console.error("Failed to fetch bookings:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
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

        {data?.length === 0 && (
          <PageEmptyDataView message="No pending booking requests" />
        )}

        <div className="row">
          {data &&
            data?.booking_request?.booking?.map((booking: any, index: any) => (
              <>
                <div className="col-lg-6 col-xl-5" key={index}>
                  <BookingRequestCard
                    id={booking.id}
                    name={booking.student_fullname}
                    subject={booking.subject}
                    amount={booking.total_amount}
                    date={booking.schedule?.date}
                    startTime={booking.from_datetime}
                    endTime={booking.to_datetime}
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
