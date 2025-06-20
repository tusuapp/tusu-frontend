import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import styles from "./style.module.css";

interface IButton {
  id: number;
  scheduleInfo: any;
  status: string;
  type: string;
  bbb: object;
}

const statusTxt = {
  PLAY: "Play",
  INCOMPLETE: "Incomplete",
  COMPLETE: "completed",
  OVERDUE: "Overdue",
  RESCHEDULED: "Re-scheduled",
  START: "Start Now",
  JOIN: "Join",
};

const typeArray: Object = {
  tutor: "student_online_status",
  student: "tutor_online_status",
};

const StatusButton: React.FC<IButton> = ({
  id,
  scheduleInfo,
  status,
  type,
  bbb,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [btnTxt, setBtnTxt] = useState();

  let whatLeft = moment.duration();
  const router = useRouter();

  const isDisabled = (status: string) => {
    return status === "rejected" ? true : isButtonDisabled;
  };
  const whatleftDays = whatLeft.asDays();
  let bblink = "";
  // @ts-ignore
  if (bbb && bbb["recordings"] && bbb["recordings"]["link"]) {
    // @ts-ignore
    bblink = bbb["recordings"]["link"];
  }

  const xstatus = status === "reschedule" ? "accepted" : status;

  // console.table({schedule_time: schedule_time.format(), current_time: current_time.format(), whatLeft:whatleftDays,status })

  useEffect(() => {
    const getButtonText = () => {
      switch (status) {
        case "completed":
          if (bblink) setIsButtonDisabled(false);

          return (
            <>
              <FontAwesomeIcon icon={faClock} className="me-2" />
              {statusTxt.PLAY}
            </>
          );

        case "auto-cancelled":
          return statusTxt.OVERDUE;

        case "reschedule":
        case "accepted":
        case "inprogress":
          if (whatleftDays > 1) {
            return parseInt(String(whatleftDays)) + " days";
          } else {
            //+ve time
            if (whatLeft.asMinutes() > 0) {
              // run timer
              // return (
              // <Countdown
              //   date={schedule_time
              //     .utcOffset(currentTimeOffset)
              //     .format("MM/DD/YYYY h:mm a")}
              //   onComplete={() => {
              //     setIsButtonDisabled(false);
              //   }}
              // >
              //   <>{statusTxt.START}</>
              // </Countdown>
              // );
            } else {
              //-ve time
              if (whatLeft.asMinutes() > -10) {
                setIsButtonDisabled(false);
                return statusTxt.JOIN;
              } else if (
                /*scheduleInfo.student_online_status == "online" && */ scheduleInfo.tutor_online_status ==
                "online"
              ) {
                return statusTxt.INCOMPLETE;
              } else {
                return statusTxt.OVERDUE;
              }
            }
          }

        default:
          return status;
      }
    };
    const _btnTxt = getButtonText();
    // @ts-ignore
    setBtnTxt(_btnTxt);
  }, [scheduleInfo]);

  const handleClassStart = (id: number) => {
    if (status === "completed" && bblink) {
      //   window.open(bblink, '_blank', 'noreferrer');
      router.push(bblink);
    } else router.push(`/${type}/classes/${id}`);
  };

  //Improved readability from inline conditions
  let buttonStyle = "";
  if (status === "completed") {
    buttonStyle = `button--success ` + styles.playButton;
  } else if (whatLeft.asDays() > 0) {
    buttonStyle = `button--${xstatus}`;
  } else {
    buttonStyle = `button--${xstatus} ${styles.overDueButton}`;
  }

  return (
    <button
      className={`button ${buttonStyle}`}
      onClick={() => {
        handleClassStart(id);
      }}
      disabled={isDisabled(status)}
    >
      {btnTxt}
    </button>
  );
};

export default StatusButton;
