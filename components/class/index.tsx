import React from "react";

interface ClassProps {
  name: string;
  fontColor: string;
  href: string;
  icon: string;
  backgroundColor: string;
  time?: string;
}

const Class: React.FC<ClassProps> = ({
  name,
  fontColor,
  href,
  icon,
  backgroundColor,
  time = "future",
}) => {
  return (
    <div className="d-flex tutors-list  my-classes">
      <div className="flex-shrink-0">
        <img
          src="/image/tutors/1.png"
          className="mr-3 tutors-image"
          alt="..."
          width="71px"
          height="71px"
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <h4 className="tutor-name">John Doe</h4>
        <h6 className="tutor-subject">Mathematics</h6>
        <img className="class-timer" src="/image/clock.svg" />{" "}
        <p className="my-class-time"> 23 Dec | SAT | 6Pm</p>
        {/* {time === "now" && "Join now"}
        {time === "past" && "Play now"}
        {time === "future" && "Timer"} */}
        <button className="btn btn-brand rounded-pill p-1 btn-sm btn-myclass">
          Join Now
        </button>
      </div>
    </div>
  );
};

export default Class;
