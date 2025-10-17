import useCreateTutorSlots from "@/tutor/hooks/useCreateTutorSlots";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Modal from "react-modal";
import { toast } from "react-toastify";
import Button from "../../../../components/button";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import moment from "moment";



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
  const { mutate } = useCreateTutorSlots();
  const [isShortSlot, setIsShortSlot] = useState(false);

  const [data, setData] = useState({
    start_time: moment().set({ hour: 9, minute: 0 }).format("HH:mm"), // default 9 AM
    end_time: moment().set({ hour: 10, minute: 0 }).format("HH:mm"), // default +1 hr
    date: selectedDate,
  });

  // 🕐 When user changes start time
  const handleStartTimeChange = (value: string | null) => {
    if (!value) return;

    const startMoment = moment(value, "HH:mm");
    const newEnd = isShortSlot
      ? startMoment.clone().add(15, "minutes")
      : startMoment.clone().add(1, "hours");

    setData({
      ...data,
      start_time: startMoment.format("HH:mm"),
      end_time: newEnd.format("HH:mm"),
    });
  };

  // ✅ Checkbox handler for short slot
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsShortSlot(checked);

    const startMoment = moment(data.start_time, "HH:mm");
    const newEnd = checked
      ? startMoment.clone().add(15, "minutes")
      : startMoment.clone().add(1, "hours");

    setData((prev) => ({
      ...prev,
      end_time: newEnd.format("HH:mm"),
    }));
  };

  // 💾 Save schedule
  const handleSaveSchedule = () => {
    const schedulePayload = {
      fromDateTime: `${selectedDate}T${data.start_time}:00`,
      toDateTime: `${selectedDate}T${data.end_time}:00`,
      isTrialSlot : isShortSlot
    };

    mutate(schedulePayload, {
      onSuccess: () => {
        toast.success("Schedule saved successfully!");
        setData({
          start_time: moment().set({ hour: 9, minute: 0 }).format("HH:mm"),
          end_time: moment().set({ hour: 10, minute: 0 }).format("HH:mm"),
          date: selectedDate,
        });
        setIsShortSlot(false);
        onClose();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} className={"scheduling-modal"}  contentLabel="Create Schedule Modal">
      <AnimatePresence>
        <motion.div
          key="CreateScheduleModal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="d-flex justify-content-end">
            <div
              style={{ fontSize: "22px", position: "absolute", top: "20px", cursor: "pointer" }}
              onClick={() => {
                onClose(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>

          <div className="Create-schedule__modal__title">{title}</div>
          <p className="Create-schedule__modal__desc">{description}</p>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Start Time */}
            <div className="Create-schedule__modal__fields">
              <label>Start time</label>
              <div>
                <TimePicker
                  onChange={handleStartTimeChange}
                  clockIcon={null}
                  clearIcon={null}
                  value={data.start_time}
                  disableClock={true}
                  locale="en-US"
                  format="hh:mm a"
                />
              </div>
            </div>

            <br />

            {/* End Time */}
            <div className="Create-schedule__modal__fields">
              <label>End time</label>
              <div>
                <TimePicker
                  clockIcon={null}
                  clearIcon={null}
                  value={data.end_time}
                  disableClock={true}
                  locale="en-US"
                  format="hh:mm a"
                  disabled={true}
                />
              </div>
            </div>

            <br />

            {/* Trial Checkbox */}
            <div style={{ marginTop: 8 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isShortSlot}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="This is a trial"
              />
            </div>

            <Button
              className="mt-3 w-100 btn-lg"
              type="primary"
              onClick={handleSaveSchedule}
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
