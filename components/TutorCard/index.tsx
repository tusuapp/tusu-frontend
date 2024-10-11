import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from '@mui/material/Rating';

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


  return (
    <div className="tutor__card">
      <img
        src={profilePicture || `image/img_avatar.png`}
        className="tutor__card__image"
        alt={tutorName}
        onError={({currentTarget}) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/image/img_avatar.png";
        }}
      />
      <div className="tutor__card__body">
        <div className="tutor__card__name">{tutorName}</div>
        <h6 className="tutor__card__subject">{tutorSubject?.join(", ")}</h6>
        {/* <div className="tutor__card__star__rating">{Rating}</div> */}
        <div className="tutor__card__star__rating"> <Rating name="read-only" value={rating} readOnly/> </div>
      </div>
    </div>
  );
};

export default TutorCard;
