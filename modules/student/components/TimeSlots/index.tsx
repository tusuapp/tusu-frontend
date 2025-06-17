import { RadioGroup } from "@headlessui/react";
import moment from "moment";

interface TimePeriod {
  start: string;
  end: string;
}

interface TimeSlotData {
  id: number;
  fromDatetime: string;
  toDatetime: string;
  isBooked: boolean;
}

interface TimeSlotsProps {
  data: TimeSlotData[];
  onChange: (value: TimePeriod) => void;
  setSelectedSlot: (id: number) => void;
}

const TimeSlot = ({
  timePeriod,
  isChecked,
  onClick,
}: {
  timePeriod: TimePeriod;
  isChecked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={isChecked ? "tutor__timeslot--active" : "tutor__timeslot"}
      onClick={onClick}
    >
      {timePeriod.start} - {timePeriod.end}
    </div>
  );
};

const TimeSlots = ({ data, onChange, setSelectedSlot }: TimeSlotsProps) => {
  return (
    <RadioGroup value={null} onChange={onChange}>
      {data
        .filter((slot) => !slot.isBooked)
        .map((slot) => {
          const timePeriod = {
            start: moment(slot.fromDatetime).format("hh:mm a"),
            end: moment(slot.toDatetime).format("hh:mm a"),
          };

          return (
            <div className="mb-5" key={slot.id}>
              <RadioGroup.Option value={timePeriod} disabled={slot.isBooked}>
                {({ active }) => (
                  <TimeSlot
                    timePeriod={timePeriod}
                    isChecked={active}
                    onClick={() => setSelectedSlot(slot.id)}
                  />
                )}
              </RadioGroup.Option>
            </div>
          );
        })}
    </RadioGroup>
  );
};

export default TimeSlots;
