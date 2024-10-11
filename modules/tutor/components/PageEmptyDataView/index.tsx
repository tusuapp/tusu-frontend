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
          <p className="w-50 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            corporis officiis ipsa. Similique nemo hic optio enim molestiae
            omnis aliquid maxime necessitatibus
          </p>
        </div>
      </div>
    </>
  );
};

export default PageEmptyDataView;
