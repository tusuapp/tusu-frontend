import useBookings from "@/tutor/hooks/useBookings";
import TutorClass from "../../../components/tutorClass";

import PageEmptyDataView from "@/tutor/components/PageEmptyDataView";
import TutorDashboardLayout from "layouts/TutorDashboard";
import BeatLoader from "react-spinners/BeatLoader";
import withAuthNew from "../../../HOC/withAuthNew";

function Bookings() {
  const { data, error, isFetching, isLoading, isError } = useBookings();
  return (
    <>
      <TutorDashboardLayout>
        <div className="d-flex">
          <h2 className="tutor__dashboard__title me-3 mb-4">Bookings</h2>

          <BeatLoader
            loading={isFetching || isLoading}
            color={"grey"}
            size={5}
          />
        </div>

        {/* {isLoading && <p>Display sckelton screen</p>} */}
        {/* {isError && <p>Display sckelton screen</p>} */}

        {error && "Failed to get data from the server"}

        {data?.bookings.length === 0 && (
          <PageEmptyDataView message="No bookings found" />
        )}

        <div className="row">
          {data &&
            data.bookings.map((booking: any, index: any) => {
              if (booking.status === "pending") return;
              return (
                <div className="col-lg-6 col-xl-6 mb-4" key={index}>
                  <TutorClass
                    id={booking.id}
                    name={booking.student_id.fullname}
                    image={booking.student_id.image_url}
                    subject={booking.subject}
                    scheduleInfo={booking.schedule}
                    scheduleDate={booking.schedule_date}
                    scheduleTime={booking.start_time}
                    status={booking.status}
                  />
                </div>
              );
            })}
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default withAuthNew(Bookings, "tutor");
