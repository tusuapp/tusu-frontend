import { faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import StatusButtonV2 from "components/StatusButton/StatusButtonV2";

export const TrialTag = () => (
  <span
    style={{
      backgroundColor: "#924781",
      color: "#fff",
      borderRadius: "20px",
      padding: "2px 10px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.3px",
      whiteSpace: "nowrap",
    }}
  >
    Trial
  </span>
);

const TutorClass: React.FC<any> = ({ booking }) => {
  const { user } = useSelector(selectAuth);

  let currentLocalTime = moment();
  let scheduleTime = moment(booking.startTime);
  let endTime = moment(booking.endTime);
  let duration = moment.duration(scheduleTime.diff(currentLocalTime));
  let hoursLeft = duration.asHours();
  let classDuration = moment.duration(endTime.diff(scheduleTime)).asMinutes();
  const isTrialSlot = booking.isTrialSlot || classDuration <= 15;

  const statusClass =
    booking.status === "in-progress"
      ? "tutor-my__class--inprogress"
      : booking.status === "accepted"
      ? "tutor-my__class--accepted"
      : "";

  return (
    <div className={`tutor-my__class ${statusClass}`}>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex align-items-center gap-2">
          <div className="student__name">{booking.student.fullName}</div>
          {isTrialSlot && <TrialTag />}
        </div>
        <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: "14px" }}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>{scheduleTime.format("hh:mm a · DD MMM YYYY")}</span>
          {classDuration > 0 && (
            <span className="ms-1">· {classDuration} min</span>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          {booking.status !== "in-progress" && (
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faClock} className="clock__icon" />
              {hoursLeft > 0 ? (
                <span className="ms-1" style={{ fontSize: "14px" }}>
                  {Math.round(hoursLeft * 10) / 10} hrs left
                </span>
              ) : (
                <span className="ms-1 text-capitalize" style={{ fontSize: "14px" }}>
                  {booking.status}
                </span>
              )}
            </div>
          )}
          {booking.status === "in-progress" && (
            <StatusButtonV2
              url={`/tutor/classes/${booking.id}`}
              text="Start Class"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorClass;
