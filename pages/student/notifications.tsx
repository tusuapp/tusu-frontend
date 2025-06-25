import Header from "../../components/header";
import Footer from "../../components/footer";
import Head from "next/head";
import StudentDashboardLayout from "layouts/StudentDashboard";
import useNotifications from "@/student/hooks/useNotifications";
import moment from "moment";
import NotificationItem from "../../components/notificationItem";

function Notifications() {
  const { data, fetchNextPage } = useNotifications();
  let currentDate: any;
  console.log(data);

  const formatDate = (date: any) => {
    if (moment(date).isSame(moment(), "day")) return "Today";
    else if (moment(date).isSame(moment().subtract(1, "days"), "day"))
      return "Yesterday";
    else return moment(date).format("DD/MM/YYYY");
  };

  return (
    <>
      <StudentDashboardLayout>
        <div className="content-wrapper bg-light">
          <div className="container">
            <div className="inner-container notifications">
              <br />
              <br />
              <h3
                className="small-header pt-3 m-0"
                style={{ fontSize: "18px" }}
              >
                Notifications
              </h3>
              {data?.pages.map((page) => (
                <div key={page.nextId}>
                  {page.result?.map((item: any) => (
                    <div key={item.nextId}>
                      {item.content?.map((notification: any) => {
                        const props = {
                          id: notification.id,
                          body: notification.title,
                          timestamp: notification.created_at,
                          type: "student",
                        };
                        let created_notification = moment(
                          notification.created_at
                        ).format();

                        let formattedDate;
                        if (!currentDate) {
                          currentDate = notification.created_at;
                        } else {
                          if (
                            moment(currentDate).isSame(
                              moment(notification.created_at),
                              "days"
                            )
                          ) {
                            console.log("same current date");
                          } else {
                            currentDate = notification.created_at;

                            formattedDate = moment(
                              notification.created_at
                            ).format("MM/DD/YYYY");
                          }
                        }

                        return (
                          <>
                            <h6 className="pt-4 text-dark">
                              {moment(currentDate).isSame(
                                moment(notification.created_at)
                              ) && formatDate(notification.created_at)}
                            </h6>
                            <NotificationItem {...props} />
                          </>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </StudentDashboardLayout>
    </>
  );
}

export default Notifications;
