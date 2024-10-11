import Header from "../../components/header";
import Footer from "../../components/footer";
import Head from "next/head";

function Home() {
  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Header />
      <div className="content-wrapper">
        <div className="container-fluid bg-custom-dark">
          <div className="container">
            <div className="pt-5">
              <a href="#" className="p-4 text-white text-decoration-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>{" "}
                Physics Class
              </a>
            </div>
            <div className="d-flex justify-content-center pb-3">
              <iframe
                width={282}
                height={200}
                src="https://www.youtube.com/embed/3olM-9vcd4M"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="d-flex justify-content-center pb-5">
              <iframe
                width={550}
                height={300}
                src="https://www.youtube.com/embed/3olM-9vcd4M"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="d-flex justify-content-center pb-5">
              <nav className="nav">
                <li className="nav-item p-1">
                  <i className="blue-bg-icon text-white rounded-circle fas fa-comment-alt" />
                </li>
                <li className="nav-item p-1">
                  <i className="blue-bg-icon text-white rounded-circle fas fa-microphone-slash" />
                </li>
                <li className="nav-item p-1">
                  <i className="blue-bg-icon text-white rounded-circle fas fa-video-slash" />
                </li>
                <li className="nav-item p-1">
                  <i className="red-bg-icon text-white rounded-circle fas fa-phone-slash" />
                </li>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
