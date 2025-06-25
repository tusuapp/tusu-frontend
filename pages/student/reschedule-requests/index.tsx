import Container from "components/container";
import React from "react";
import withAuthNew from "HOC/withAuthNew";
import StudentDashboardLayout from "layouts/StudentDashboard";
import useRescheduleRequests from "@/student/hooks/useRescheduleRequests";
import { useEffect } from "react";
import RescheduleRequest from "@/student/components/RescheduleRequest";
import PageSearchField from "@/student/components/PageSearchField";
import { v2api } from "api";

const USER_ROLE = "student";

const FavouriteTutors: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [requests, setRequests] = React.useState<any>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRescheduleRequests = async () => {
    const response = await v2api.get(
      "/user/classes/bookings/reschedule?status=requested"
    );
    if (response.status === 200) {
      setRequests(response.data);
      setIsLoading(false);
    } else {
      setError("Failed to fetch reschedule requests.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRescheduleRequests();
  }, []);

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <section>
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3 className="student__page__header__title">
                Reschedule requests
              </h3>
            </div>
            <div className="d-flex justify-content-between mb-5">
              {/* <div>
                <PageSearchField />
              </div> */}
              <div>{/* <PageFilters /> */}</div>
            </div>
            <div className="tutors">
              {/* Loading screen */}
              <div>{isLoading ? "Loading..." : ""}</div>

              {!isLoading && requests.length === 0 && (
                <p>You don't have any reschedule requests</p>
              )}

              <div className="row">
                {requests.map((rescheduleRequest: any, index: number) => {
                  return (
                    <>
                      <RescheduleRequest
                        rescheduleRequest={rescheduleRequest}
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
