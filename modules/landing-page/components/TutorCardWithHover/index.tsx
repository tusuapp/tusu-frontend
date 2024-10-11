import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import TutorModal from "../TutorModal";
import { useState } from "react";

interface TutorCardProps {
  tutorName: string;
  tutorSubject?: string[];
  profilePicture: string;
  rating: number;
}

const TutorCard: React.FC<TutorCardProps> = ({
  tutorName,
  tutorSubject,
  profilePicture,
  rating,
}) => {
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

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
    <>
      <div className="tutor__card" onClick={() => setIsTutorModalOpen(true)}>
        <img
          src={profilePicture || `image/img_avatar.png`}
          className="tutor__card__image"
          alt={tutorName}
        />
        <div className="tutor__card__body">
          <div className="tutor__card__name">{tutorName}</div>
          <h6 className="tutor__card__subject">{tutorSubject?.join(", ")}</h6>
          {/* <div className="tutor__card__star__rating">{Rating}</div> */}
          <div className="tutor__card__star__rating">{arr.fill(<FontAwesomeIcon icon={faStar} style={{ color: "#FBB017" }} />, 0, rating)}</div>
        </div>
      </div>
      {/* <TutorModal
        isOpen={isTutorModalOpen}
        onClose={() => setIsTutorModalOpen(false)}
      /> */}
    </>
  );
};

export default TutorCard;
