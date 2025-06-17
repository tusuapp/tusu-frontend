import React, { useEffect, useState } from "react";

import Router from "next/router";

import DayPicker from "../../../../components/dayPicker";
import Button from "../../../../components/button";
import CreateNewScheduleModal from "./CreateNewScheduleModal";
import ScheduleItem from "./ScheduleItem";
import useTutorSlots from "@/tutor/hooks/useTutorSlots";
import useDeleteTutorSlots from "@/tutor/hooks/useDeleteTutorSlots";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import Skeleton from "react-loading-skeleton";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";

interface CreateScheduleProps {
  scheduleCreated: any;
}

const CreateSchedule: React.FC<CreateScheduleProps> = ({ scheduleCreated }) => {
  const [timeslots, setTimeslots] = useState<any>([]);

  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { mutate } = useDeleteTutorSlots();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  console.log(selectedDate);

  const { data, isFetching, isLoading } = useTutorSlots(selectedDate);

  const isTimeslotsEmpty = (timeslots: any) => {
    // for (let index = 0; index < timeslots.length; index++) {
    //   if (timeslots[index].times.length !== 0) return false;
    // }
    return timeslots.length == 0;
  };

  const handleDateChange = async (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
    const day = date.getDate().toString().padStart(2, "0");

    // Format as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(formattedDate); // Save formatted date
    // await setSelectedDate(date);
  };

  useEffect(() => {
    console.log("CreateSchedule");

    if (!data) return;

    console.log(data);

    setTimeslots(data);
    scheduleCreated(!isTimeslotsEmpty(data));
  }, [data]);

  useEffect(() => {
    if (!data) return;

    setTimeslots(data);
  }, [data]);

  const handleDelete = async (id: number) => {
    mutate(id);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="ConfirmDialogueBox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="d-flex mb-4 justify-content-around p-0">
            <div className="d-flex">
              <h1 className="Create-schedule__title ">Create Schedule</h1>
              <div className="me-5"></div>
            </div>

            <CreateNewScheduleModal
              isOpen={IsModalOpen}
              onClose={setIsModalOpen}
              selectedDate={selectedDate}
            />
          </div>
          {/* {<DayPicker days={data?.days || []} onSelect={handleDayChange} />} */}
          <div className="Calender_Timing d-flex mt-4 justify-content-around">
            <span className="col-md-6">
              <Calendar
                // activeStartDate={new Date()}
                onChange={handleDateChange}
                // maxDate={MAX_DATE}
                minDate={new Date()}
                // nextLabel={null}
                // prevLabel={null}
                next2Label={null}
                prev2Label={null}
              />
            </span>
            <div className="col-md-5 ms-3">
              <span className="d-flex flex-row justify-content-between align-items-center">
                <h1 className="Create-schedule__title me-3">Class timing</h1>
                <button
                  className="btn-brand btn-sm px-3"
                  onClick={() => setIsModalOpen(true)}
                  style={{ height: "36px" }}
                >
                  <span
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>{" "}
                  Add
                </button>
              </span>
              <div className="me-5">
                {isFetching ||
                  (isLoading && (
                    <BeatLoader
                      loading={isFetching || isLoading}
                      color={"grey"}
                      size={5}
                    />
                  ))}
              </div>
              <div className="Schedules">
                {isLoading && (
                  <>
                    {[1, 2, 3, 4, 5].map(() => (
                      <div style={{ height: "30px" }}>
                        <Skeleton />
                      </div>
                    ))}
                  </>
                )}
                {timeslots && timeslots.length === 0 && !isLoading && (
                  <div className="text-center">
                    You haven't created <br />
                    any timeslots on {selectedDate}. <br />
                    Please a create a timeslot.
                  </div>
                )}
                {timeslots.map((timeslot: any) => (
                  <ScheduleItem
                    id={timeslot.id}
                    startTime={timeslot.fromDatetime}
                    endTime={timeslot.toDatetime}
                    onEdit={() => setIsModalOpen(true)}
                    onDelete={() => handleDelete(timeslot.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

// export default withAuthNew(CreateSchedule, "tutor");
export default CreateSchedule;
