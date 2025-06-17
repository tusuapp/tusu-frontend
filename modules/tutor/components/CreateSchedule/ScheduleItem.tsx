import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ConfirmDialogueModal from "../../../../components/ConfirmDialogueModal";
import moment from "moment";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  id: any;
  startTime: any;
  endTime: any;
}

const ScheduleItem: React.FC<Props> = ({
  onEdit,
  onDelete,
  id,
  startTime,
  endTime,
}) => {
  startTime = moment(new Date(startTime)).format("hh:mm a");
  endTime = moment(new Date(endTime)).format("hh:mm a");
  return (
    <div className="Schedule__item">
      <div className="Schedule__item__icons">
        <div className="dot"></div>
        {/* <div className="line"></div> */}
      </div>
      <div className="Schedule__item__right__wrapper">
        <div className="Schedule__item__time">
          {startTime} - {endTime}
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
