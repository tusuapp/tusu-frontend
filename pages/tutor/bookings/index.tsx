import useBookings from "@/tutor/hooks/useBookings";
import TutorClass from "../../../components/tutorClass";

import PageEmptyDataView from "@/tutor/components/PageEmptyDataView";
import TutorDashboardLayout from "layouts/TutorDashboard";
import BeatLoader from "react-spinners/BeatLoader";
import withAuthNew from "../../../HOC/withAuthNew";
import { useEffect, useState } from "react";
import { v2api } from "api";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    const response = await v2api.get("/user/classes/bookings?types=accepted");
    if (response.status === 200) {
      setBookings(response.data.bookings);
      console.log(response.data.bookings);
    } else {
      setError("Failed to fetch bookings");
      console.error("Failed to fetch bookings");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <TutorDashboardLayout>
        <div className="d-flex">
          <h2 className="tutor__dashboard__title me-3 mb-4">Bookings</h2>

          <BeatLoader loading={isLoading} color={"grey"} size={5} />
        </div>

        {/* {isLoading && <p>Display sckelton screen</p>} */}
        {/* {isError && <p>Display sckelton screen</p>} */}

        {error && "Failed to get data from the server"}

        {bookings.length === 0 && (
          <PageEmptyDataView message="No bookings found" />
        )}

        <div className="row">
          {bookings &&
            bookings.map((booking: any, index: any) => {
              return (
                <div className="col-lg-6 col-xl-6 mb-4" key={index}>
                  <TutorClass booking={booking} />
                </div>
              );
            })}
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default withAuthNew(Bookings, "tutor");
