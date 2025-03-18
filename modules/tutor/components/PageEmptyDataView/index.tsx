const PageEmptyDataView = ({ message }: any) => {
  return (
    <>
      <div
        style={{ minHeight: "65vh" }}
        className="d-flex justify-content-center align-item-center flex-column"
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src="/image/tutor/empty-screens/empty-mailbox.png"
            className="mb-5"
          />
          <h5 className="mt-2">{message}</h5>
          <p className="w-50 text-center"></p>
        </div>
      </div>
    </>
  );
};

export default PageEmptyDataView;
