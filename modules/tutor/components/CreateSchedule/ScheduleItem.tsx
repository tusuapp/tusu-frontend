import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ConfirmDialogueModal from "../../../../components/ConfirmDialogueModal";
import moment from "moment";
import { TrialTag } from "components/tutorClass";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  id: any;
  startTime: any;
  endTime: any;
  isTrialSlot?: boolean;
}

const ScheduleItem: React.FC<Props> = ({
  onEdit,
  onDelete,
  id,
  startTime,
  endTime,
  isTrialSlot: isTrialSlotProp,
}) => {
  const durationMinutes = moment(new Date(endTime)).diff(
    moment(new Date(startTime)),
    "minutes"
  );
  const isTrialSlot = isTrialSlotProp || durationMinutes <= 15;

  startTime = moment(new Date(startTime)).format("hh:mm a");
  endTime = moment(new Date(endTime)).format("hh:mm a");
  return (
    <div className="Schedule__item">
      <div className="Schedule__item__icons">
        <div className="dot"></div>
        {/* <div className="line"></div> */}
      </div>
      <div className="Schedule__item__right__wrapper">
        <div className="Schedule__item__time d-flex align-items-center gap-2">
          {startTime} - {endTime}
          {isTrialSlot && <TrialTag />}
        </div>
        <div className="Schedule__item__controls">
          <ConfirmDialogueModal
            title="Are you sure you want to delete this?"
            // isOpen={true}
            onConfirm={() => onDelete()}
          >
            <div className="delete">
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </ConfirmDialogueModal>
          {/* <div className="edit" onClick={() => onEdit()}>
            <FontAwesomeIcon icon={faEdit} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
