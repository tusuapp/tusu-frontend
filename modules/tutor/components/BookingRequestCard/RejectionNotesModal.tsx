import useCreateTutorSlots from "@/tutor/hooks/useCreateTutorSlots";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TimeField from "react-simple-timefield";
import { toast } from "react-toastify";
import { boolean } from "yup/lib/locale";
import Button from "../../../../components/button";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import moment from "moment";

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
    width: "399px",
    height: "396px",
    padding: "40px",
    boxShadow: "0px 3px 6px #00000029",
  },
};

interface Props {
  isOpen: boolean;
  onClose?: any;
  day?: string;
  message?: string;
  description?: string;
  buttonLabel?: string;
  onSubmit?: any;
  handleClick?: any;
}

const RejectionNotesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  day,
  message = "Are you sure you want to reject ?",
  description = "Create a new time schedule for your class by adding your class timing",
  handleClick,
}) => {
  const [reason, setReason] = useState("");

  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal">
      <AnimatePresence>
        <motion.div
          key="ConfirmDialogueBox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="d-flex justify-content-end">
            <div
              style={{ fontSize: "22px", position: "absolute", top: "20px" }}
              onClick={() => onClose(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="Create-schedule__modal__title">{message}</div>
          <p className="Create-schedule__modal__desc">
            Explain your reason ({reason.length}/160)
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea
              id="w3review"
              name="w3review"
              rows={4}
              cols={50}
              onChange={(e) => setReason(e.target.value)}
              className="mb-4"
            ></textarea>
            <div className="d-flex">
              <Button
                className="mt-1 w-100 btn-lg me-2"
                style={{ backgroundColor: "#EC6565" }}
                type="primary"
                onClick={(e: any) => handleClick(reason)}
                // loading={true}
              >
                Reject
              </Button>
              <Button
                className="mt-1 w-100 btn-lg"
                type="primary"
                style={{ backgroundColor: "#FFC93C" }}
                onClick={() => onClose(false)}
                // loading={true}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default RejectionNotesModal;
