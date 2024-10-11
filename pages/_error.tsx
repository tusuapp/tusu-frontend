import Header from "../components/header";
import Container from "../components/container";
import Head from "next/head";

function Error() {
  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
