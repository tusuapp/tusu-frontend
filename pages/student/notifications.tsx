import Header from "../../components/header";
import Footer from "../../components/footer";
import Head from "next/head";
import StudentDashboardLayout from "layouts/StudentDashboard";
import useNotifications from "@/student/hooks/useNotifications";
import moment from "moment";
import NotificationItem from "../../components/notificationItem";

function Notifications() {
  const { data } = useNotifications();
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

              {data?.map((notification: any, index: number) => {
                const props = {
                  id: notification.id,
                  body: notification.title,
                  timestamp: notification.createdAt,
                  type: "student",
                };

                let formattedDate;
                if (!currentDate) {
                  currentDate = notification.createdAt;
                } else {
                  if (
                    moment(currentDate).isSame(
                      moment(notification.createdAt),
                      "day"
                    )
                  ) {
                  } else {
                    currentDate = notification.createdAt;
                    formattedDate = moment(notification.createdAt).format(
                      "MM/DD/YYYY"
                    );
                  }
                }

                return (
                  <div key={notification.id || index}>
                    {formattedDate && (
                      <h6 className="pt-4 text-dark">{formattedDate}</h6>
                    )}
                    <NotificationItem {...props} />
                  </div>
                );
              })}
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
