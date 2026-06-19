import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./TutorCard.module.scss";

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
  if (profilePicture && profilePicture.endsWith(".mp4")) {
    profilePicture = "";
  }

  const filled = Math.round(Math.min(Math.max(rating || 0, 0), 5));

  return (
    <div className={styles.tutor__card}>
      <div
        className={styles.delete__button}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          onDelete(id);
        }}
      >
        ✕
      </div>
      <img
        src={profilePicture || "/image/img_avatar.png"}
        className="tutor-img img-fluid"
        alt={tutorName}
        onError={(e: any) => { e.currentTarget.src = "/image/img_avatar.png"; }}
      />
      <div className={styles.tutor__card_body}>
        <div className={styles.name}>{tutorName}</div>
        {tutorSubject ? (
          <div className={styles.subject}>{tutorSubject}</div>
        ) : null}
        {filled > 0 && (
          <div className={styles.rating}>
            {Array.from({ length: 5 }, (_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{ color: i < filled ? "#FBB017" : "rgba(255,255,255,0.35)" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorCardWithDelete;
