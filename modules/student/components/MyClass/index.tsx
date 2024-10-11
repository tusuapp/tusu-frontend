import {faClock, faFile, faTimes} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import router from "next/router";
import React, {useState} from "react";
import Countdown from "react-countdown";
import Modal from "react-modal";
import {setApplicationName} from "../../../../api";
import {useSelector} from "react-redux";
import {selectAuth} from "../../../../features/auth/authSlice";
import StatusButton from "../../../../components/StatusButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import {toast} from "react-toastify";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
        borderRadius: "20px",
        width: "327px",
        height: "200px",
        padding: "40px",
        boxShadow: "0px 3px 6px #00000029",
    },
};
const customReviewStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        border: "none",
        borderRadius: "20px",
        width: "80vw",
        height: "70vh",
        padding: "40px",
        boxShadow: "0px 3px 6px #00000029",
    },
};

const MyClass = ({myclass}: any) => {
    const {
        id,
        tutor: {image, name, tutorId},
        subject,
        schedule,
        bigbluebutton,
        status,
        notes,
        booking_no,
        booking_date_time
    } = myclass

    const { user } = useSelector(selectAuth);

    let imagez = image ? image : "/image/img_avatar.png"

    let current_time = moment().utcOffset(user.timezoneOffset);
    let schedule_time = moment(schedule?.actual_time).utcOffset(user.timezoneOffset);
    let whatLeft = moment.duration(schedule_time.diff(current_time))

     const [isOpen, setIsOpen] = useState<boolean>(false);
     const [isReviewOpen, setisReviewOpen] = useState<boolean>(false);
     const [selectedTutorId, setselectedTutorId] = useState();
     const [selectedBookingId, setselectedBookingId] = useState()
     const [comments, setcomments] = useState("")
     const [IsClassReviewModelOpen, setIsClassReviewModelOpen] =
    useState<boolean>(false);
    const [rating, setRating] = useState(0)
    let reviewPayload = {
        "booking_id": selectedBookingId,
        "rating": rating,
        "tutor_id":selectedTutorId,
        "comments": comments
    }

    // console.log("reviewPayload", reviewPayload);
    

    const handleRating = (rate: any) => {
        setRating(rate)
        // Some logic
      }

      const token = localStorage.getItem("accessToken")
      const config = {
        headers: { Authorization: `Bearer ${token}`}
      }

      const handleSubmit = () => {
        // let response
        axios.post("https://tusuadmin.stagingcs.com/reviews/create", reviewPayload, config).then((response) =>  {
            toast.success(response.data.message)
        }
        ).catch((err) => toast.error(err.response.data.message));

        closeReviewModal();
      }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeReviewModal() {
        setisReviewOpen(false);
    }

    return (
        <div
            className={
                whatLeft.asDays() > 0
                    ? `Student__my-class align-items-start student--${status}`
                    : `Student__my-class align-items-start student--overdue`
            }
        >
            <div className="me-2 class-img-box rounded-3 overflow-hidden">
                    <img
                        src={imagez}
                        height="100%"
                        style={{objectFit:"cover"}}
                        width="100%"
                        onError={({currentTarget}) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/image/img_avatar.png";
                        }}

                    />
            </div>
            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="Student__my-class__name">{name}</div>
                    <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} className="cursor-pointer" onClick={()=>{
                        // console.log("id====>::::", id, tutorId);
                        setselectedBookingId(id);
                        setselectedTutorId(tutorId);
                        setisReviewOpen(!isReviewOpen)
                        }} />
                        <Modal isOpen={isReviewOpen} style={customReviewStyles}>
                            <button
                                onClick={closeReviewModal}
                                style={{float: "right"}}
                                className="closeBtn"
                            >
                                {" "}
                                <FontAwesomeIcon icon={faTimes}/>{" "}
                            </button>
                            <br />
                            <br />
                            <div className="review_popup">
                                {/* {id}
                                <br />
                                {tutorId} */}
                                <p>How was {name} class. <br />Please give your feedback.</p>
                                <p>Rate Tutor</p>
                                <Rating
                                    onClick={handleRating}
                                    ratingValue={rating}
                                    size={30}
                                    // label
                                    transition
                                    fillColor='orange'
                                    emptyColor='gray'
                                    className='foo' // Will remove the inline style if applied
                                />
                                <p>Feedback</p>
                                <div>
                                    <textarea placeholder="Type Here..." onChange={(e) => setcomments(e.target.value)}/>
                                    <button onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </Modal>
                </div>
                <div className="d-lg-flex d-block justify-content-between align-items-center mb-1 time-sub-box">
                    <div>{subject}</div>
                    <div>
            <span className="clock__icon">
              <FontAwesomeIcon icon={faClock} className="clock__icon me-1"/>
            </span>{" "}
                        {schedule_time.format("DD, MMM | ddd | hh:mm:A")}
                    </div>
                </div>

                <div className="d-flex justify-content-end">

                    <StatusButton scheduleInfo={schedule} bbb={bigbluebutton} status={status} type={"student"} id={id} />

                   {/* {status && (
                        <button
                            className={
                                whatLeft.asDays() > 0
                                    ? `button button--${status}`
                                    : `button button--overdue`
                            }
                            onClick={() => {
                                handleClassStart(id);
                            }}
                            disabled={
                                // status === "rejected" ||
                                // status === "reschedule" ||
                                // status === "completed" ||
                                // status === "auto-cancelled" ||
                                // status === "pending"
                                isButtonDisabled
                            }
                        >
                            <>
                                {status === "accepted" && (
                                    <>
                                        { whatLeft.asDays() > 1 ? (
                                            parseInt(whatLeft.asDays()) + " days"
                                        ) : whatLeft.asMinutes() >= -10 ? (
                                            <>
                                                { whatLeft.asMinutes() < -60 ? (
                                                    "Overdue"
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faClock} className="me-2"/>
                                                        <Countdown
                                                            date={schedule_time.utcOffset(currentTimeOffset).format("MM/DD/YYYY h:mm a")}
                                                            onComplete={() => setIsButtonDisabled(false)}
                                                        >
                                                            <>Start now</>
                                                        </Countdown>
                                                    </>
                                                )}
                                            </>
                                        ) :   "in progress"  }
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
               
                    <div>
                        {notes ? (
                            <button className="btn-view" onClick={openModal}>
                                {" "}
                                <FontAwesomeIcon
                                    icon={faFile}
                                    className="clock__icon me-1"
                                />{" "}
                                View Note
                            </button>
                        ) : (
                            ""
                        )}
                        <Modal isOpen={isOpen} style={customStyles}>
                            <button
                                onClick={closeModal}
                                style={{float: "right"}}
                                className="closeBtn"
                            >
                                {" "}
                                <FontAwesomeIcon icon={faTimes}/>{" "}
                            </button>
                            <div>
                                Note from {name}
                                <hr/>
                                {notes}
                            </div>
                        </Modal>
                    </div>
                

                {/* {status === "rejected" ? (
          <div className="mt-2">Tutor cancelled</div>
        ) : status === "reschedule" ? (
          <div className="mt-2">Rescheduled</div>
        ) : status === "pending" ? (
          <div className="mt-2">Waiting for confirmation</div>
        ) : (
          <button
            className="Student__my-class__button"
            onClick={() => handleClassStart(id)}
            disabled={status === "pending" || status === "completed"}
          >
            {status === "inprogress" && "Join now"}
            {status === "completed" && "Play"}
            {status === "accepted" && (
              <Countdown
                date={moment(
                  schedule?.date + " " + schedule?.start_time
                ).format("MM/DD/YYYY h:mm a")}
              >
                <>Join now</>
              </Countdown>
            )}
            {status === "rejected" && "Rejected"}
          </button>
        )} */}
            </div>
        </div>
);
};

export default MyClass;
