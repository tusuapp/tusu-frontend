import Header from "../components/header";
import Container from "../components/container";
import Seo from "../components/seo";

function Error() {
  return (
    <>
      <Seo
        title="Something Went Wrong"
        description="An unexpected error occurred. Please try again."
        noindex
      />
      <Header />

      <Container>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <h1>Unknown Error</h1>
        </div>
      </Container>
    </>
  );
}

export default Error;
