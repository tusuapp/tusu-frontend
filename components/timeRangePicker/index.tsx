import React, { useEffect, useState } from "react";
import TimeField from "react-simple-timefield";
import { v4 as uuid } from "uuid";

interface TimeRangePickerProps {
  onChange: any;
  activeDay: string;
  timeslots: any;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  onChange,
  activeDay,
  timeslots,
}) => {
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    console.log(timeslots);
  }, []);

  useEffect(() => {
    if (!timeslots) {
      return;
    }

    setState(timeslots);
  }, [timeslots]);

  const addNewTimeSlot = async () => {
    console.log(state);

    const newState = [
      ...state,
      { id: uuid(), start: "00:00:00", end: "00:00:00", day: activeDay },
    ];

    onChange(newState);
  };

  const removeNewTimeSlot = async (input: any) => {
    const newState = [...state];

    newState.forEach((item, index) => {
      if (item.id === input) {
        newState.splice(index, 1);
      }
    });

    onChange(newState);
  };

  const changeTime = (id: any, position: any, value: any) => {
    let state = timeslots;
    state.forEach((state: any) => {
      if (id === state.id) {
        if (position === 0) {
          state.start = value + ":00";
        }

        if (position === 1) {
          state.end = value + ":00";
        }
      }
    });
    onChange(state);
    console.log(state);
  };

  return (
    <>
      {state &&
        state.map((item: any) => {
          if (item?.day === activeDay) {
            return (
              <div className="d-flex mb-3">
                <TimeField
                  className="time-field me-2"
                  value={item.start}
                  onChange={(e: any) => {
                    changeTime(item.id, 0, e.target.value);
                  }}
                />
                <div className="px-1 d-grid" style={{ placeContent: "center" }}>
                  -
                </div>
                <TimeField
                  className="time-field ms-2"
                  value={item.end}
                  onChange={(e: any) => {
                    changeTime(item.id, 1, e.target.value);
                  }}
                />
                <button
                  className="btn  btn-icon btn-brand ms-3"
                  onClick={() => removeNewTimeSlot(item.id)}
                >
                  -
                </button>
              </div>
            );
          }
        })}
      <div className="d-flex mb-3">
        <button className="btn btn-brand w-100" onClick={addNewTimeSlot}>
          Add New Time Schedule
        </button>
      </div>
    </>
  );
};

export default TimeRangePicker;
