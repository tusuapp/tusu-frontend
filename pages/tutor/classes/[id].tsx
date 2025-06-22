import useBookings from "@/tutor/hooks/useBookings";
import {
  faCamera,
  faGlobe,
  faMicrophone,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api, v2api } from "api";
import Footer from "components/footer";
import Firebase from "firebase";
import Header from "modules/tutor/components/Header";
import Head from "next/head";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SystemCheck() {
  const [isLoading, setIsLoading] = useState(false);
  const [classDetails, setClassDetails] = useState<any>();
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const fetchSessionDetails = async () => {
    setIsLoading(true);
    let url = "/user/classes/start?bookingId=" + id;
    const response = await v2api.post(url);
    console.log(response.data);
    setClassDetails(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id === undefined) return;

    fetchSessionDetails();
  }, [id]);

  const handleStartClass = () => {
    if (!classDetails) return;

    if (typeof window !== undefined) {
      // browser code
      window?.open(classDetails.tutorBBBUrl, "_blank")?.focus();
    }
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div style={{ backgroundColor: "#f5f5f5 ", height: "100%" }}>
        <div className="container">
          <div className="inner-container">
            <h3 className="student__page__header__title mt-5 mb-4">
              System Check
            </h3>
            <div className="d-flex justify-content-between">
              <div className="system-check__component">
                <div className="">
                  <span>
                    <FontAwesomeIcon
                      icon={faCamera}
                      style={{ color: "#924781", fontSize: "24px" }}
                    />
                  </span>
                </div>
                <div className="ms-4 ">
                  <h6 className="m-0">Video Camera</h6>
                  <div className="text-success system-status">Working fine</div>
                </div>
              </div>

              <div className="system-check__component">
                <div className="">
                  <span>
                    <FontAwesomeIcon
                      icon={faGlobe}
                      style={{ color: "#924781", fontSize: "24px" }}
                    />
                  </span>
                </div>
                <div className="ms-4">
                  <h6 className="m-0">Internet Connection</h6>
                  <div className="system-status">
                    Network Quality: <span className="text-success"> Ok</span>
                  </div>
                </div>
              </div>

              <div className="system-check__component">
                <div>
                  <span>
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      style={{ color: "#924781", fontSize: "24px" }}
                    />
                  </span>
                </div>
                <div className="ms-4">
                  <h6 className="m-0">Microphone</h6>
                  <div className="system-status">
                    Network Quality:
                    <span className="text-success"> Ok</span>
                  </div>
                </div>
              </div>

              <div className="system-check__component">
                <div className="">
                  <span>
                    <FontAwesomeIcon
                      icon={faVolumeUp}
                      style={{ color: "#924781", fontSize: "24px" }}
                    />
                  </span>
                </div>
                <div className="ms-4">
                  <h6 className="m-0">Sound</h6>
                  <div className="text-success system-status">Working fine</div>
                </div>
              </div>
            </div>
            <div className="system-check__container">
              <div>
                <br />
                <div className="mt-3" style={{ fontSize: "18px" }}>
                  System check is completed. You can start class now.
                </div>
              </div>
              {classDetails && (
                <button
                  className="btn btn-brand mt-5"
                  onClick={handleStartClass}
                  disabled={!classDetails.tutorBBBUrl}
                >
                  Start Class
                </button>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>

      <Footer />
    </>
  );
}

export default SystemCheck;
