import Calendar from "react-calendar";
import Link from "next/link";
import BeatLoader from "react-spinners/BeatLoader";
import { useState } from "react";
import { formatDDMMYYYY, formatYYYYMMDD, formatDDDD } from "utils";
import TutorDashboardLayout from "layouts/TutorDashboard";
import useScheduledClasses from "@/tutor/hooks/useScheduledClasses";
import RescheduleModal from "@/tutor/components/RescheduleModal";
import TimeSlots from "@/tutor/components/TimeSlots";
import { api } from "../../../api";
import { useQuery } from "react-query";

function ClassSchedules() {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] =
    useState<boolean>(false);

  const [selectedSlotId, setSelectedSlotId] = useState<any>(null);
  // const [scheduleId, setScheduleId] = useState<any>(null);

  // console.log("selectedSlotId ====> :", selectedSlotId, selectedDate);

  const { data, isLoading, isFetching } = useScheduledClasses(
    formatYYYYMMDD(selectedDate, "-")
  );

  const handleDateChange = (date: any) => {
    setSelectedSlotId(null);
    setSelectedDate(date);
  };

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Ensure two digits
    const day = date.getDate().toString().padStart(2, "0");

    // Format as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  };

  const isTutorSlots = useQuery("checkTutorSlots", () =>
    api
      .get(`/tutor/get-tutor-slots?date=${getFormattedDate()}`)
      .then((res) => res.data)
  );

  return (
    <>
      <TutorDashboardLayout>
        <div className="row">
          <div className="col-12 col-md-6 d-flex justify-content-between">
            <h2 className="tutor__dashboard__title">Class Schedules</h2>
            {isTutorSlots?.data?.result && (
              <div>
                <Link href="/tutor/class-schedules/edit">
                  <button className="btn btn-brand px-4">
                    {/* {isTutorSlots.data.result.total_slots === 0
                      ? "Add schedule"
                      : "Edit Schedule"} */}
                    Add/Edit Schedule
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-3 mt-md-5">
          <div className="col-12 col-md-6 mb-5 mb-md-0">
            <Calendar
              className="color-blue"
              onChange={handleDateChange}
              minDate={new Date()}
              // maxDate={new Date("12-30-2025")}
              // nextLabel={null}
              // prevLabel={null}
              next2Label={null}
              prev2Label={null}
            />
            <p className="mt-5 h6">
              Note : The Schedule may change during day-light-savings!.
            </p>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-5 col-sm-12">
            <div className="d-flex justify-content-between mt-md-3 flex-grow">
              <div className="d-flex">
                <div>
                  {formatDDDD(selectedDate)}
                  <h3 style={{ fontSize: "18px" }} className="">
                    {formatDDMMYYYY(selectedDate, "-")}
                  </h3>
                </div>
                <div>
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
              <div>
                <button
                  className="btn btn-brand "
                  style={{
                    marginLeft: "50px",
                    backgroundColor: "#FBB017",
                    border: "0px",
                  }}
                  onClick={() => setIsRescheduleModalOpen(true)}
                  disabled={!selectedSlotId ? true : false}
                >
                  Reschedule
                </button>
                <RescheduleModal
                  selectedClassId={selectedSlotId}
                  isOpen={isRescheduleModalOpen}
                  onClose={() => setIsRescheduleModalOpen(false)}
                />
              </div>
            </div>
            <div className="scheduled__classes__container">
              {isLoading && "Loading"}

              {data?.times.length === 0 &&
                "No scheduled classes on selected day"}

              {data && (
                <TimeSlots
                  data={data?.times}
                  selectedDate={selectedDate}
                  onChange={(time: any) => {
                    setSelectedSlotId(time);
                  }}
                  selectedSlotId={selectedSlotId}
                />
              )}
            </div>
          </div>
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default ClassSchedules;
