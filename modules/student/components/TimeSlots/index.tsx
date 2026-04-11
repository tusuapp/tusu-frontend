import { RadioGroup } from "@headlessui/react";
import moment from "moment";
import { TrialTag } from "components/tutorClass";

interface TimePeriod {
  start: string;
  end: string;
  isTrialSlot?: boolean;
}

interface TimeSlotData {
  id: number;
  fromDatetime: string;
  toDatetime: string;
  isBooked: boolean;
  isTrialSlot?: boolean;
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
  isTrialSlot,
}: {
  timePeriod: TimePeriod;
  isChecked: boolean;
  onClick: () => void;
  isTrialSlot?: boolean;
}) => {
  return (
    <div
      className={isChecked ? "tutor__timeslot--active" : "tutor__timeslot"}
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      {timePeriod.start} - {timePeriod.end}
      {isTrialSlot && <TrialTag />}
    </div>
  );
};

const TimeSlots = ({ data, onChange, setSelectedSlot }: TimeSlotsProps) => {
  console.log("TimeSlots data", data);

  return (
    <RadioGroup value={null} onChange={onChange}>
      {data
        .filter((slot) => !slot.isBooked)
        .map((slot) => {
          const slotDuration = moment(slot.toDatetime).diff(
            moment(slot.fromDatetime),
            "minutes"
          );
          const isTrialSlot = slot.isTrialSlot || slotDuration <= 15;

          const timePeriod: TimePeriod = {
            start: moment(slot.fromDatetime).format("hh:mm a"),
            end: moment(slot.toDatetime).format("hh:mm a"),
            isTrialSlot,
          };

          return (
            <div className="mb-5" key={slot.id}>
              <RadioGroup.Option value={timePeriod} disabled={slot.isBooked}>
                {({ active }) => (
                  <TimeSlot
                    timePeriod={timePeriod}
                    isChecked={active}
                    onClick={() => setSelectedSlot(slot.id)}
                    isTrialSlot={isTrialSlot}
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
