import React from "react";

interface Props {
  children: React.ReactNode;
}

const Content: React.FC<Props> = ({ children }) => {
  return <div className="tutor__dashboard__content">{children}</div>;
};

export default Content;
