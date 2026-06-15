import Header from "../components/header";
import Container from "../components/container";
import Seo from "../components/seo";

function Custom404() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found."
        noindex
      />
      <Header />

      <Container>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <h1>404 - Not found</h1>
        </div>
      </Container>
    </>
  );
}

export default Custom404;
