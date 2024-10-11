import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmDialogueModal from "components/ConfirmDialogueModal";
import React from "react";

interface TimeslotProps {
  time: any;
  status: string;
  subject: string;
  disabled: boolean;
  isActive: boolean;
}

const Timeslot: React.FC<TimeslotProps> = ({
  time,
  status,
  disabled,
  subject,
  isActive,
}) => {
  return (
    <div className={isActive ? "timeslot active mb-4" : "timeslot mb-4"}>
      <div className="d-flex">
        <div className="d-flex flex-grow-1">
          <div className="timeslot__right__column">
            <div className="subject">{subject}</div>

            <div className="time">{time}</div>
          </div>
          <div className="status">
            <div className="title">Status</div>
            <div className="description">{status}</div>
          </div>
          {/* {JSON.stringify(disabled)} */}
          {/* {JSON.stringify(data)} */}
        </div>
        <div
          className="eye__button eye__button--disabled"
          onClick={(e) => e.stopPropagation()}
        >
          <ConfirmDialogueModal
            onConfirm={() => {
              console.log("it works");
            }}
            title="Are you sure ?"
          >
            <FontAwesomeIcon icon={faEye} />
          </ConfirmDialogueModal>
        </div>
      </div>
    </div>
  );
};

export default Timeslot;
