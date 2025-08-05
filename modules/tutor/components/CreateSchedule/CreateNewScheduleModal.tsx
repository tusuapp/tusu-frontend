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
    height: "470px",
    padding: "40px",
    boxShadow: "0px 3px 6px #00000029",
  },
};

interface Props {
  isOpen: boolean;
  onClose: any;
  day?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  onSubmit?: any;
  selectedDate: string;
}

const CreateNewScheduleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  day,
  title = "Add New Time Schedule",
  description = "Create a new time schedule for your class by adding your class timing",
  selectedDate = "",
}) => {
  const [data, setData] = useState({
    start_time: new Date(new Date().setHours(0, 0)), // 12:00 AM
    end_time: new Date(new Date().setHours(13, 0)), // 1:00 PM
    date: selectedDate,
  });

  console.log("Modal date = ", selectedDate);

  const { mutate } = useCreateTutorSlots();

  const handleSaveSchedule = () => {
    const schedulePayload = {
      fromDateTime: `${selectedDate}T${data.start_time}`,
      toDateTime: `${selectedDate}T${data.end_time}`,
    };
    mutate(schedulePayload, {
      onSuccess: () => {
        setData({ start_time: "", end_time: "", date: selectedDate });
        onClose();
      },
    });
  };

  const handleStartTimeChange = (value: any) => {
    if (value == null) {
      return;
    }
    setData({
      ...data,

      start_time: moment(value, "hh:mm").format("HH:mm:ss"),
      end_time: moment(value, "hh:mm").add(1, "hours").format("HH:mm:ss"),
    });
  };

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
              onClick={() => {
                setData({ start_time: "", end_time: "" });
                onClose(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="Create-schedule__modal__title">{title}</div>
          <p className="Create-schedule__modal__desc">{description}</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="Create-schedule__modal__fields">
              <label>Start time</label>
              <div>
                <TimePicker
                  onChange={handleStartTimeChange}
                  clockIcon={null}
                  clearIcon={null}
                  // amPmAriaLabel={"Select AM/PM"}
                  value={data.start_time}
                  disableClock={true}
                  locale="hu-HU"
                  format="hh:mm a"
                />
              </div>
            </div>
            <br />
            <div className="Create-schedule__modal__fields">
              <label>End time</label>
              <div>
                <TimePicker
                  clockIcon={null}
                  clearIcon={null}
                  // amPmAriaLabel={"Select AM/PM"}
                  value={data.end_time}
                  disableClock={true}
                  locale="hu-HU"
                  format="hh:mm a"
                  disabled={true}
                />
              </div>
            </div>
            <br />
            <Button
              className="mt-1 w-100 btn-lg"
              type="primary"
              onClick={handleSaveSchedule}
              // loading={true}
            >
              Save Schedule
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default CreateNewScheduleModal;
