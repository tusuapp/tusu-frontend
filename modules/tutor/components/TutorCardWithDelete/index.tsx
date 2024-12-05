import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./TutorCard.module.scss";
import Button from "../../../../components/button";
import fakeImg from "../../../../public/image/img_avatar.png";

interface TutorCardWithDeleteProps {
  id: number;
  tutorName: string;
  tutorSubject: string;
  profilePicture: string;
  rating: number;
  onDelete: any;
}

const TutorCardWithDelete: React.FC<TutorCardWithDeleteProps> = ({
  id,
  tutorName,
  tutorSubject,
  profilePicture,
  rating,
  onDelete,
}) => {
  const Rating = (
    <>
      <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />
      <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />
      <FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />
      <FontAwesomeIcon icon={faStar} style={{ color: "#FFFFFF" }} />
      <FontAwesomeIcon icon={faStar} style={{ color: "#FFFFFF" }} />
    </>
  );

  if (profilePicture && profilePicture.endsWith(".mp4")) {
    profilePicture = "";
  }
  return (
    <div className={styles.tutor__card}>
      <div
        className={styles.delete__button}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          onDelete(id);
        }}
      >
        X
      </div>
      <img
        src={profilePicture || "../../image/img_avatar.png"}
        className="tutor-img img-fluid"
        alt={tutorName}
      />
      <div className={styles.tutor__card_body}>
        <div className={styles.name}>{tutorName}</div>
        <div className={styles.subject}>
          {/* {tutorSubject[0]}{" "}
          {tutorSubject.length > 1 && "+ " + tutorSubject.length + " subjects"} */}
        </div>
        <div className={styles.rating}>{Rating}</div>
      </div>
    </div>
  );
};

export default TutorCardWithDelete;
