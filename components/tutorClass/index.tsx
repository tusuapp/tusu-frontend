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

interface TutorClassProps {
  id: number;
  name: string;
  image: any;
  subject: any;
  scheduleInfo: any;
  scheduleDate: string;
  scheduleTime: string;
  status?: any;
  bigbluebutton?: any;
}

const TutorClass: React.FC<TutorClassProps> = ({
  id,
  name,
  image,
  subject,
  scheduleInfo,
  status,
  bigbluebutton,
  scheduleDate,
  scheduleTime,
}) => {
  const { user } = useSelector(selectAuth);

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const router = useRouter();
  const handleClassStart = (id: number) => {
    router.push(`/tutor/classes/${id}`);
  };

  let current_time = moment().utcOffset(user.timeZoneOffset);
  let schedule_time = moment(scheduleInfo?.actual_time).utcOffset(
    user.timeZoneOffset
  );
  let currentTimeOffset = moment().format("Z");
  let whatLeft = moment.duration(schedule_time.diff(current_time));

  return (
    <div
      className={
        whatLeft.asDays() > 1
          ? `tutor-my__class tutor-my__class--${status}`
          : `tutor-my__class tutor-my__class--overdue`
      }
    >
      <div className="d-flex">
        <div className="flex-shrink-0">
          <img
            src={
              image ??
              `${process.env.NEXT_PUBLIC_API_ENDPOINT}/default/img_avatar.png`
            }
            className="student__image"
            alt={name}
            width="100px"
            height="100px"
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="d-flex flex-column ">
            <div className="student__name">{name}</div>
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div className="tutor-subject">{subject}</div>
              {scheduleTime.split(".")[0]} {scheduleDate}
              <div>
                <span className="clock__icon">
                  <FontAwesomeIcon icon={faClock} className="clock__icon" />
                </span>
                <span>{scheduleInfo?.custom}</span>
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <StatusButtonV2 url="" text="Start Class" />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end"></div>
    </div>
  );
};

export default TutorClass;
