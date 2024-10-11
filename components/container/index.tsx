import React from "react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="content-wrapper">
      <div className="container">{children}</div>
    </div>
  );
};

export default Container;
