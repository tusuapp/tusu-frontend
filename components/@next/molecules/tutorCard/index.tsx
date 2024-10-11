import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./TutorCard.module.scss";

interface TutorCardProps {
  tutorName: string;
  tutorSubject?: string[];
  profilePicture: string;
  rating: number;
}

const TutorCardCard: React.FC<TutorCardProps> = ({
  tutorName,
  tutorSubject,
  profilePicture,
  rating,
}) => {
  // const Rating = (
  //   <>
  //     <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />
  //     <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />
  //     <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />
  //     <FontAwesomeIcon icon={faStar} style={{ color: "#FFFFFF" }} />
  //     <FontAwesomeIcon icon={faStar} style={{ color: "#FFFFFF" }} />
  //   </>
  // );

  let arr = Array(5).fill(<FontAwesomeIcon icon={faStar} style={{ color: "#FFFFFF" }} />)

  return (
    <div className={styles.tutor__card}>
      <img
        src={profilePicture || `https://tusuadmin.stagingcs.com/default/img_avatar.png`}
        className="tutor-img img-fluid"
        alt={tutorName}
      />
      <div className={styles.tutor__card_body}>
        <div className={styles.name}>{tutorName}</div>
        {/* <div className={styles.subject}>
          {tutorSubject[0]}{" "}
          {tutorSubject.length > 1 && "+ " + tutorSubject.length + " subjects"}
        </div> */}
        <div className={styles.subject}>{tutorSubject?.join(", ")}</div>
        {/* <div className={styles.rating}>{Rating}</div> */}
        <div className={styles.rating}>{arr.fill(<FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />, 0, rating)}</div>
      </div>
    </div>
  );
};

export default TutorCardCard;
