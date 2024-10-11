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

interface CreateScheduleProps {
  scheduleCreated: any;
}

const CreateSchedule: React.FC<CreateScheduleProps> = ({ scheduleCreated }) => {
  const [activeDay, setActiveDay] = useState<string>("Sunday");

  const [timeslots, setTimeslots] = useState<any>([]);

  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isFetching, isLoading } = useTutorSlots();

  const { mutate } = useDeleteTutorSlots();

  const isTimeslotsEmpty = (timeslots: any) => {
    for (let index = 0; index < timeslots.length; index++) {
      if (timeslots[index].times.length !== 0) return false;
    }

    return true;
  };

  useEffect(() => {
    if (!data) return;

    scheduleCreated(!isTimeslotsEmpty(data.times_slots));
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const timeSlotsByDay = getTimeSlotsByDay(data.times_slots, activeDay);

    setTimeslots(timeSlotsByDay);
  }, [activeDay, data]);

  const getTimeSlotsByDay = (timeslots: any, day: string) => {
    let timeslotsBydate: any = [];

    timeslots.forEach((days: any) => {
      if (days.weeks === day) {
        timeslotsBydate = days.times;
      }
    });

    return timeslotsBydate;
  };

  const handleDayChange = (day: any) => {
    setActiveDay(day);
  };

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
          <div className="d-flex mb-4 justify-content-between p-0">
            <div className="d-flex">
              <h1 className="Create-schedule__title ">Create Schedule</h1>
              <div className="me-5"></div>
            </div>
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
            <CreateNewScheduleModal
              day={activeDay}
              isOpen={IsModalOpen}
              onClose={setIsModalOpen}
            />
          </div>
          {<DayPicker days={data?.days || []} onSelect={handleDayChange} />}
          <div className="d-flex mt-4">
            <h1 className="Create-schedule__title me-3">Class timing</h1>
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
            {timeslots.length === 0 && (
              <div className="text-center">
                You haven't created <br />
                any timeslots on {activeDay}. <br />
                Please a create a timeslot.
              </div>
            )}
            {timeslots.map((timeslot: any) => (
              <ScheduleItem
                id={timeslot.id}
                startTime={timeslot.start}
                endTime={timeslot.end}
                onEdit={() => setIsModalOpen(true)}
                onDelete={() => handleDelete(timeslot.id)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

// export default withAuthNew(CreateSchedule, "tutor");
export default CreateSchedule;
