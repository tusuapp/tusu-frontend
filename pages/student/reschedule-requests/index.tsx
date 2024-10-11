import Container from "components/container";
import React from "react";
import withAuthNew from "HOC/withAuthNew";
import StudentDashboardLayout from "layouts/StudentDashboard";
import useRescheduleRequests from "@/student/hooks/useRescheduleRequests";
import { useEffect } from "react";
import RescheduleRequest from "@/student/components/RescheduleRequest";
import PageSearchField from "@/student/components/PageSearchField";

const USER_ROLE = "student";

const FavouriteTutors: React.FC = () => {
  const { data, isFetching, isLoading } = useRescheduleRequests();

  useEffect(() => {
    console.log("Data", data);
  }, [data]);

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <section>
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3 className="student__page__header__title">
                Reschedule requests
              </h3>
              <div>{isFetching ? "Updating..." : ""}</div>
            </div>
            <div className="d-flex justify-content-between mb-5">
              <div>
                <PageSearchField />
              </div>
              <div>{/* <PageFilters /> */}</div>
            </div>
            <div className="tutors">
              {/* Loading screen */}
              <div>{isLoading ? "Loading..." : ""}</div>

              {/* Empty screen */}
              {/* {data?.result.length > 0 && (
              <>
                <div>Image</div>
                <div>No classes found</div>
              </>
            )} */}

              <div className="row">
                {data?.bookings.map((rescheduleRequest: any, index: number) => {
                  return (
                    <>
                      <RescheduleRequest
                        id={rescheduleRequest.id}
                        image={rescheduleRequest.tutor.image}
                        name={rescheduleRequest.tutor.name}
                        subject={rescheduleRequest.subject}
                        old_booking={rescheduleRequest?.old_booking}
                        old_schedule={{
                          date: rescheduleRequest?.reference_id?.schedule_date,
                          start_time:
                            rescheduleRequest?.reference_id?.start_time,
                          end_time: rescheduleRequest?.reference_id?.end_time,
                        }}
                        new_schedule={{
                          date: rescheduleRequest.schedule.date,
                          start_time: rescheduleRequest.schedule.start_time,
                          end_time: rescheduleRequest.schedule.end_time,
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        </Container>
      </StudentDashboardLayout>
    </>
  );
};

export default withAuthNew(FavouriteTutors, USER_ROLE);
