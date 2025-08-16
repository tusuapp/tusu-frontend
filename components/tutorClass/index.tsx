import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import StatusButton from "../StatusButton";
import StatusButtonV2 from "components/StatusButton/StatusButtonV2";

const TutorClass: React.FC<any> = ({ booking }) => {
  const { user } = useSelector(selectAuth);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const router = useRouter();
  const handleClassStart = (id: number) => {
    router.push(`/tutor/classes/${id}`);
  };

  // current local time for the user
  let currentLocalTime = moment().utcOffset(user.timeZoneOffset);

  // booking start time in user's local time
  let scheduleTime = moment(booking.startTime).utcOffset(user.timeZoneOffset);

  // duration between booking start and now
  let duration = moment.duration(scheduleTime.diff(currentLocalTime));
  let hoursLeft = duration.asHours();

  return (
    <div className="card">
      <div className="d-flex">
        <div className="flex-shrink-0">
          <img
            src={
              booking.student.imageUrl ??
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/default/img_avatar.png`
            }
            className="student__image"
            alt={"Image"}
            width="100px"
            height="100px"
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="d-flex flex-column ">
            <div className="student__name">{booking.student.fullName}</div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              {moment(new Date(booking.startTime)).format("hh:mm a DD/MM/YYYY")}
              <div>
                <span className="clock__icon"></span>
              </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              {booking.status !== "in-progress" && (
                <>
                  <FontAwesomeIcon icon={faClock} className="clock__icon" />
                  {hoursLeft > 0 ? (
                    <>
                      <span>&nbsp;{Math.round(hoursLeft * 100) / 100}</span>
                      &nbsp;hours left
                    </>
                  ) : (
                    booking.status
                  )}
                </>
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
      </div>
      <div className="d-flex justify-content-end"></div>
    </div>
  );
};

export default TutorClass;
