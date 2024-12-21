import React from "react";
import { toast } from "react-toastify";
import { api } from "api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import ConfirmDialogueModal from "components/ConfirmDialogueModal";
import RejectionNotesModal from "./RejectionNotesModal";
import { useState } from "react";
import useChangeBookingActions from "@/tutor/hooks/useChangeBookingActions";
import RescheduleModal from "../RescheduleModal";
import router from "next/router";

interface BookingRequestCardProps {
  id?: any;
  name?: any;
  subject?: any;
  amount?: any;
  date?: any;
  startTime?: any;
  endTime?: any;
  onChange?: any;
  notes?: string;
}

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  id,
  name,
  subject,
  amount,
  date,
  startTime,
  endTime,
  notes,
  onChange,
}) => {
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const { data, mutate } = useChangeBookingActions(router);
  const [isHandle, setIsHandle] = useState(false);

  const handleAccept = (id: number) => {
    mutate({ id, status: "accepted", notes: "" });
  };

  const handleReject = (id: number) => {
    console.log(id);

    // mutate({ id, status: "rejected", notes: "" });
  };
  const handleClick = (event: any) => {
    mutate({ id, status: "rejected", notes: event });
    //  router.reload();
  };

  return (
    <div className="booking-card mb-5 d-flex justify-content-center">
      <div className="booking-card-content">
        <b>{name}</b> booked you for{" "}
        <span style={{ color: "#82296E" }}>{subject} class.</span>
        <br />
        Payment of <span style={{ color: "#82296E" }}>${amount}</span> Received.
        <br />
        Message : {notes}
        <br />
        Chosen Schedule :{" "}
        <span style={{ color: "#82296E" }}>
          {" "}
          {date}, {startTime} - {endTime}
        </span>
        {/* <div style={{ color: "#82296E" }}>
        <FontAwesomeIcon icon={faStickyNote} /> View note
      </div> */}
        <div className="d-flex justify-content-start mt-3">
          <ConfirmDialogueModal
            onConfirm={() => handleAccept(id)}
            title="Do you want to accept this booking?"
            // isOpen={true}s
          >
            <button className="btn-accept me-3">Accept</button>
          </ConfirmDialogueModal>
          <button
            className="btn-reject me-3"
            onClick={() => setIsRejectionModalOpen(true)}
          >
            Reject
          </button>

          <RejectionNotesModal
            isOpen={isRejectionModalOpen}
            onClose={() => setIsRejectionModalOpen(false)}
            onSubmit={() => handleReject(id)}
            handleClick={handleClick}
          />
          <button
            className="btn-view"
            onClick={() => setIsRescheduleModalOpen(true)}
          >
            Reschedule
          </button>
          <RescheduleModal
            isOpen={isRescheduleModalOpen}
            onClose={() => setIsRescheduleModalOpen(false)}
            selectedClassId={id}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingRequestCard;
