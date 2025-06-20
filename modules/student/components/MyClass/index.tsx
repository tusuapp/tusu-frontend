import { faClock, faFile, faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import Modal from "react-modal";
import { setApplicationName, v2api } from "../../../../api";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "./myclass.module.css";
import StatusButtonV2 from "components/StatusButton/StatusButtonV2";
import Spinner from "components/Spinner";

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

const MyClass = ({ myclass }: any) => {
  const { id, tutor, subject, schedule, bigbluebutton, status, notes } =
    myclass;

  const { user } = useSelector(selectAuth);

  let imagez = tutor.imageUrl ? tutor.imageUrl : "/image/img_avatar.png";

  let current_time = moment().utcOffset(user.timeZoneOffset);
  let schedule_time = moment(schedule?.actual_time).utcOffset(
    user.timeZoneOffset
  );
  let whatLeft = moment.duration(schedule_time.diff(current_time));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReviewOpen, setisReviewOpen] = useState<boolean>(false);
  const [selectedTutorId, setselectedTutorId] = useState();
  const [selectedBookingId, setselectedBookingId] = useState();
  const [comments, setcomments] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [bbbUrl, setBbbUrl] = useState("");
  let reviewPayload = {
    booking_id: selectedBookingId,
    rating: rating,
    tutor_id: selectedTutorId,
    comments: comments,
  };

  const handleRating = (rate: any) => {
    setRating(rate);
    // Some logic
  };

  const token = localStorage.getItem("accessToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmit = () => {
    // let response
    axios
      .post(
        "https://tusuadmin.stagingcs.com/reviews/create",
        reviewPayload,
        config
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));

    closeReviewModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeReviewModal() {
    setisReviewOpen(false);
  }

  function isActionStatus() {
    return status === "in-progress" || status === "completed";
  }

  return (
    <div
      onClick={() => {
        if (!isActionStatus()) {
          router.push(`/student/tutors/${tutor.id}`);
        }
      }}
    >
      <div
        className={
          whatLeft.asDays() > 0
            ? `Student__my-class align-items-start ${styles.classTutorCard} student--${status}`
            : `Student__my-class align-items-start ${styles.classTutorCard} student--overdue`
        }
      >
        <div className={`me-2 class-img-box overflow-hidden`}>
          <img
            src={imagez}
            height="100%"
            style={{ objectFit: "cover" }}
            width="100%"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/image/img_avatar.png";
            }}
          />
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <div className="Student__my-class__name">{tutor.fullName}</div>
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "#FBB017" }}
              className="cursor-pointer"
              onClick={() => {
                // console.log("id====>::::", id, tutorId);
                setselectedBookingId(id);
                setselectedTutorId(tutor.id);
                setisReviewOpen(!isReviewOpen);
              }}
            />
            <Modal isOpen={isReviewOpen} style={customReviewStyles}>
              <button
                onClick={closeReviewModal}
                style={{ float: "right" }}
                className="closeBtn"
              >
                {" "}
                <FontAwesomeIcon icon={faTimes} />{" "}
              </button>
              <br />
              <br />
              <div className="review_popup">
                {/* {id}
                                <br />
                                {tutorId} */}
                <p>
                  How was {tutor.fullName} class. <br />
                  Please give your feedback.
                </p>
                <p>Rate Tutor</p>
                <Rating
                  onClick={handleRating}
                  ratingValue={rating}
                  size={30}
                  // label
                  transition
                  fillColor="orange"
                  emptyColor="gray"
                  className="foo" // Will remove the inline style if applied
                />
                <p>Feedback</p>
                <div>
                  <textarea
                    placeholder="Type Here..."
                    onChange={(e) => setcomments(e.target.value)}
                  />
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </Modal>
          </div>
          <div className="d-lg-flex d-block justify-content-between align-items-center mb-1 time-sub-box">
            <div>{subject}</div>
            <div>
              <span className="clock__icon">
                <FontAwesomeIcon icon={faClock} className="clock__icon me-1" />
              </span>{" "}
              {schedule_time.format("DD, MMM | ddd | hh:mm:A")}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            {isLoading && <Spinner />}

            {isActionStatus() && (
              <StatusButtonV2
                url={id}
                text={status === "in-progress" ? "Join" : "Re-Play"}
              />
            )}

            {!isActionStatus() && (
              <small>
                {String(status).charAt(0).toUpperCase() +
                  String(status).slice(1)}
              </small>
            )}
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
                style={{ float: "right" }}
                className="closeBtn"
              >
                {" "}
                <FontAwesomeIcon icon={faTimes} />{" "}
              </button>
              <div>
                Note from {name}
                <hr />
                {notes}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClass;
