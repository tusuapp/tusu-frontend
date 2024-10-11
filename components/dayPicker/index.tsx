import React, { useState } from "react";

interface DayPickerProps {
  days: any;
}

const DayPicker = ({ days, onSelect }: any) => {
  const [activeDay, setActiveDay] = useState("Sunday");
  const handleSelect = (day: any) => {
    // alert(day);
    onSelect(day);
    setActiveDay(day);
  };

  return (
    <>
      <div className="day-picker-wrapper">
        {days.map((day: any, index: number) => {
          const trimmedDay = day.substring(0, 3);

          return (
            <div
              className={
                activeDay === day ? "day-picker-item active" : "day-picker-item"
              }
              onClick={() => handleSelect(day)}
              key={index}
            >
              {activeDay === day ? (
                <span className="active">{trimmedDay}</span>
              ) : (
                trimmedDay
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DayPicker;
