import NotificationItem from "../../../components/notificationItem";

import TutorDashboardLayout from "layouts/TutorDashboard";
import useNotifications from "@/tutor/hooks/useNotifications";
import Container from "components/container";
import moment from "moment";
import React from "react";

function Notifications() {
  const { data, fetchNextPage } = useNotifications();
  let currentDate: any;

  const formatDate = (date: any) => {
    if (moment(date).isSame(moment(), "day")) return "Today";
    else if (moment(date).isSame(moment().subtract(1, "days"), "day"))
      return "Yesterday";
    else return moment(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <TutorDashboardLayout>
        <Container>
          <h2 className="tutor__dashboard__title mb-4">Notifications</h2>
          {data?.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {/* {JSON.stringify(page)} */}
              {page.result?.map((item: any) => (
                <React.Fragment key={item.nextId}>
                  {item.content?.map((notification: any) => {
                    const props = {
                      id: notification.id,
                      body: notification.title,
                      timestamp: notification.created_at,
                      type: "tutor",
                    };

                    let formattedDate;

                    if (!currentDate) {
                      currentDate = notification.created_at;
                    } else {
                      console.log("current date", currentDate);
                      console.log("craeetd", notification.created_at);
                      if (
                        moment(currentDate).isSame(
                          moment(notification.created_at),
                          "days"
                        )
                      ) {
                        console.log("same curent date");
                      } else {
                        currentDate = notification.created_at;

                        formattedDate = moment(notification.created_at).format(
                          "MM/DD/YYYY"
                        );
                      }
                    }

                    return (
                      <>
                        <div
                          className="mb-3"
                          style={{
                            color: "#000000",
                            fontSize: "15px",
                            fontWeight: 500,
                          }}
                        >
                          {moment(currentDate).isSame(
                            moment(notification.created_at)
                          ) && formatDate(notification.created_at)}
                        </div>
                        <NotificationItem {...props} />
                      </>
                    );
                  })}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Container>
      </TutorDashboardLayout>
    </>
  );
}

export default Notifications;
