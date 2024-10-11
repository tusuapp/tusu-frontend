import React from "react";
import styles from "./discipline.module.scss";

interface DisciplineProps {
  name: string;
  fontColor: string;
  href: string;
  icon: string;
  backgroundColor: string;
}

const Discipline: React.FC<DisciplineProps> = ({
  name,
  fontColor,
  href,
  icon,
  backgroundColor,
}) => {
  return (
    <div
      className={styles.discipline}
      style={{
        backgroundColor: backgroundColor,
        display: "grid",
        placeContent: "center",
      }}
    >
      <div
        style={{
          height: "150px",
          width: "150px",
          // border: "1px solid red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h6 className="text-center subject-name" style={{ color: fontColor }}>
          {name}
        </h6>
        <div className="">
          <img src={icon} alt={name} height="75px" width="75px" />
        </div>
      </div>
    </div>
  );
};

export default Discipline;
