import React from "react";

interface Props {
  children: React.ReactNode;
}

const ProfileContent: React.FC<Props> = ({ children }) => {
  return <div className="tutor__profile__content">{children}</div>;
};

export default ProfileContent;
