interface Props {
  children: React.ReactNode;
}

const TutorContainer: React.FC<Props> = ({ children }) => {
  return <div className="tutor__container">{children}</div>;
};

export default TutorContainer;
