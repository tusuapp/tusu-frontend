import useRescheduleClass from "@/tutor/hooks/useRescheduleClass";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "../../../../components/button";
import moment from "moment";
import Calendar from "react-calendar";
import { formatYYYYMMDD, formatDDDD } from "utils";
import useScheduledClasses from "@/tutor/hooks/useScheduledClasses";
import { BeatLoader } from "react-spinners";
import Timeslots from "./Timeslots";
import TimePicker from "react-time-picker/dist/entry.nostyle";
import DatePicker from "react-date-picker";

interface Props {
  isOpen: boolean;
  onClose: any;
  selectedClassId: any;
  onSubmit?: any;
}

const RescheduleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedClassId,
}) => {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const { mutate } = useRescheduleClass();

  const [timeData, setTimeData] = useState({
    reschedule_date: "",
    start_time: "00:00",
    end_time: "01:00",
  });

  useEffect(() => {
    const test = {
      reschedule_date: moment(selectedClassId?.reschedule_date).format(
        "YYYY-MM-DD"
      ),
      start_time: moment(selectedClassId?.reschedule_date).format("hh:mm"),
      end_time: moment(selectedClassId?.reschedule_date)
        .add(60, "minutes")
        .format("hh:mm"),
    };

    setTimeData(test);
    setSelectedDate(test?.reschedule_date);
  }, [selectedClassId]);

  const { data, isLoading, isFetching } = useScheduledClasses(
    formatYYYYMMDD(selectedDate, "-")
  );

  const handleSaveSchedule = () => {
    console.log("selectedclassId : ", selectedClassId);

    const schedule = {
      date:
        formatYYYYMMDD(selectedDate, "-") +
        ` ${moment(timeData?.start_time, "hh:mm:ss").format("HH:mm:ss")}`,
      startTime: moment(timeData?.start_time, "hh:mm").format("HH:mm"),
      endTime: moment(timeData?.end_time, "hh:mm").format("HH:mm"),
      bookingId: selectedClassId,
    };
    mutate(schedule, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleStartTimeChange = (value: any) => {
    setTimeData({
      ...data,

      start_time: moment(value, "h:mm").format("HH:mm:ss"),
      end_time: moment(value, "h:mm").add(1, "hours").format("HH:mm:ss"),
    });
  };

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
      width: "100%",
      maxHeight: "620px",
      padding: "40px",
      boxShadow: "0px 3px 6px #00000029",
      maxWidth: "400px",
      heigth: "100%",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      portalClassName="modal-wrap"
      contentLabel="Example Modal"
    >
      <AnimatePresence>
        <motion.div
          key="ConfirmDialogueBox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="reschedule-modal">
            <div className="row">
              <div className="d-flex justify-content-between align-items-center ">
                <div className="Create-schedule__modal__title mb-0">
                  Reschedule
                </div>
                <div
                  style={{ fontSize: "22px", top: "20px" }}
                  onClick={() => onClose(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </div>
              <p className="Create-schedule__modal__desc mb-3">
                Change time schedule for your class by changing your class date
                and timing <br />
              </p>
              {/* <div className="col-12 col-lg-7">
                <Calendar
                  onChange={setSelectedDate}
                  // maxDate={MAX_DATE}
                  minDate={new Date()}
                  nextLabel={null}
                  prevLabel={null}
                  next2Label={null}
                  prev2Label={null}
                />
              </div> */}
              {/* <div className="col-12 col-lg-5">
                <div className="d-flex justify-content-between mt-md-3 flex-grow">
                  <div className="d-flex">
                    <div>
                      {formatDDDD(selectedDate)}
                      <h3 style={{ fontSize: "18px" }} className="">
                        {formatYYYYMMDD(selectedDate, "-")}
                      </h3>
                    </div>
                    <div>
                      {isFetching && (
                        <BeatLoader
                          loading={isFetching || isLoading}
                          color={"grey"}
                          size={5}
                        />
                      )}
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="scheduled__classes__container">
                  {isLoading && "Loading"}

                  {data?.times.length === 0 && "No slots on selected day"}
                  {data && (
                    <Timeslots
                      data={data.times}
                      onChange={(time: any) => setSelectedSchedule(time)}
                      setSelectedSlot={setSelectedSlot}
                    />
                  )}
                </div>
              </div> */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="Create-schedule__modal__fields">
                  <label>New Date</label>
                  <div>
                    {/* <TimePicker
                    // onChange={handleStartTimeChange}
                    clockIcon={null}
                    clearIcon={null}
                    // amPmAriaLabel={"Select AM/PM"}
                    // value={data.start_time}
                    disableClock={true}
                    locale="hu-HU"
                    // format={"HH:mm"}
                  /> */}
                    <input
                      type="date"
                      className="reschedule_date_picker"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <div className="Create-schedule__modal__fields">
                  <label>Start time</label>
                  <div>
                    <TimePicker
                      onChange={handleStartTimeChange}
                      value={timeData.start_time}
                      clockIcon={null}
                      clearIcon={null}
                      // amPmAriaLabel={"Select AM/PM"}
                      // value={data.start_time}
                      disableClock={true}
                      locale="hu-HU"
                      // format={"HH:mm"}
                      // onChange={(e: any) => setStartTime(e.target.value)}
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
                      // value={data.end_time}
                      disableClock={true}
                      locale="hu-HU"
                      // format={"HH:mm"}
                      disabled={true}
                      value={timeData.end_time}
                      // onChange={(e: any) => setEndTime(e.target.value)}
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
                  Reschedule
                </Button>
              </form>
            </div>
          </div>

          {/* <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handleSaveSchedule}>
              Reschedule
            </Button>
          </div> */}
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};

export default RescheduleModal;
