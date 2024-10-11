import {faClock} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import {useRouter} from "next/router";
import React, {useState} from "react";
import Countdown from "react-countdown";
import {useSelector} from "react-redux";
import {selectAuth} from "../../features/auth/authSlice";
import StatusButton from "../StatusButton";

interface TutorClassProps {
    id: number;
    name: string;
    image: any;
    subject: any;
    scheduleInfo: any;
    status?: any;
    bigbluebutton?: any
}


const TutorClass: React.FC<TutorClassProps> = ({
                                                   id,
                                                   name,
                                                   image,
                                                   subject,
                                                   scheduleInfo,
                                                   status,
                                                   bigbluebutton
                                               }) => {
    const {user} = useSelector(selectAuth);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const router = useRouter();
    const handleClassStart = (id: number) => {
        router.push(`/tutor/classes/${id}`);
    };

    let current_time = moment().utcOffset(user.timezoneOffset);
    let schedule_time = moment(scheduleInfo?.actual_time).utcOffset(user.timezoneOffset);
    let currentTimeOffset = moment().format("Z")
    let whatLeft = moment.duration(schedule_time.diff(current_time))


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
                            <div>
                <span className="clock__icon">
                  <FontAwesomeIcon icon={faClock} className="clock__icon"/>
                </span>
                                <span>{scheduleInfo?.custom}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start">

                            <StatusButton scheduleInfo={scheduleInfo} bbb={bigbluebutton} status={status} type={"tutor"}
                                          id={id}/>
                            {/*{renderButton(scheduleInfo, status, bookingId)}*/}
                            {/*  {status && (


                                <button
                                    className="button"
                                    onClick={() => {
                                        handleClassStart(id);
                                    }}
                                    disabled={
                                        status === "rejected" ||
                                        status === "reschedule" ||
                                        status === "completed"
                                    }
                                >
                                    <>
                                        {status === "accepted" && (
                                            <>
                                                {whatLeft.asDays() > 1 ? parseInt(String(whatLeft.asDays())) + " days" : whatLeft.asMinutes() >= -10 ? (
                                                    <>
                                                        {current_time.isAfter(schedule_time) ? (
                                                            "Overdue "
                                                        ) : (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={faClock}
                                                                    className="me-2"
                                                                />
                                                                <Countdown

                                                                    date={schedule_time.utcOffset(currentTimeOffset).format("MM/DD/YYYY h:mm a")}
                                                                    onComplete={() => setIsButtonDisabled(false)}
                                                                >
                                                                    <>Start now </>
                                                                </Countdown>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    "Start Class"
                                                )}
                                            </>
                                        )}

                                        {status === "rejected" && (
                                            <>
                                                <FontAwesomeIcon icon={faClock} className="me-2"/>
                                                Rejected
                                            </>
                                        )}
                                        {status === "inprogress" && "Incompleted"}
                                        {status === "auto-cancelled" && "Overdue"}
                                        {status === "pending" && "Pending"}
                                        {status === "completed" && (
                                            <>
                                                <FontAwesomeIcon icon={faClock} className="me-2"/>
                                                Play
                                            </>
                                        )}
                                        {status === "reschedule" && (
                                            <>
                                                <FontAwesomeIcon icon={faClock} className="me-2"/>
                                                Resheduled
                                            </>
                                        )}
                                    </>
                                </button>
                            )}*/}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-end"></div>
        </div>
    );
};

export default TutorClass;
