import { RadioGroup } from "@headlessui/react";
import moment from "moment";
import { useState } from "react";
import Timeslot from "./timeslot";

const TimeSlots = ({ data, selectedDate, onChange, selectedSlotId }: any) => {
  return (
    <>
      <RadioGroup value={selectedSlotId} onChange={onChange}>
        {data.map((timeslot: any, index: number) => {
          return (
            <div className="mb-5" key={index}>
              <RadioGroup.Option
                value={{ ...timeslot, reschedule_date: selectedDate }}
                disabled={timeslot.is_hide === true ? true : false}
                key={index + 1}
              >
                {({ checked, active }) => (
                  <Timeslot
                    time={`${moment(new Date(timeslot.fromDatetime)).format(
                      "hh:mm a"
                    )} - ${moment(new Date(timeslot.toDatetime)).format(
                      "hh:mm a"
                    )}`}
                    status={timeslot.isBooked ? "Booked" : "Not booked"}
                    disabled={false}
                    subject={timeslot.subject ? timeslot.subject : "Nil"}
                    key={index}
                    isActive={
                      selectedSlotId && timeslot?.id === selectedSlotId?.id
                        ? true
                        : false
                    }
                  />
                )}
              </RadioGroup.Option>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
};

export default TimeSlots;
