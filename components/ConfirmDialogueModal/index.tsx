import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../button";

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
    width: "327px",
    height: "200px",
    padding: "40px",
    boxShadow: "0px 3px 6px #00000029",
  },
};

interface Props {
  title: string;
  // isOpen: boolean;
  onClose?: () => void;
  onConfirm?: any;
  onAfterOpen?: any;
  onRequestClose?: any;
}

const ConfirmDialogueModal: React.FC<Props> = ({
  title = "Delete time schedule?",
  onClose,
  children,
  onConfirm,
  onAfterOpen,
  onRequestClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <AnimatePresence>
        <Modal
          isOpen={isOpen}
          onAfterOpen={onAfterOpen}
          onRequestClose={onRequestClose}
          style={customStyles}
          contentLabel="Confrim dialogue modal"
        >
          <motion.div
            key="ConfirmDialogueBox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="d-flex justify-content-end">
              <div
                style={{
                  fontSize: "22px",
                  position: "absolute",
                  top: "0px",
                  right: "15px",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
            <div className="Create-schedule__modal__title text-center">
              {title}
            </div>
            {/* <p className="Create-schedule__modal__desc">
              Are you sure you want to delete this time slot?
            </p> */}
            <div className="d-flex justify-content-between">
              <Button
                className="mt-1 btn-lg me-2"
                type="primary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="mt-1 me-2 btn-lg"
                type="primary"
                onClick={() => {
                  onConfirm();
                  setIsOpen(false);
                  onClose ? onClose() : null;
                }}
                // loading={true}
              >
                Confirm
              </Button>
            </div>
          </motion.div>
        </Modal>
      </AnimatePresence>
    </>
  );
};

export default ConfirmDialogueModal;
