import useBookings from "@/tutor/hooks/useBookings";
import {
    faCamera,
    faGlobe,
    faMicrophone,
    faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {api} from "api";
import Footer from "components/footer";
import Firebase from "firebase";
import Header from "modules/tutor/components/Header";
import Head from "next/head";
import moment from "moment";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

function SystemCheck() {
    const [isTutorOnline, setIsTutorOnline] = useState(false);

    const [classDetails, setClassDetails] = useState<any>();
    const [showStart, setShowStart] = useState<boolean>(false);
    const [showMessage, setMessage] = useState("");
    const {data} = useBookings();
    const {query} = useRouter();

    useEffect(() => {
    }, []);

    useEffect(() => {
        if (!query.id) return;

        // getClassStatus(query.id);
        createClassLink(query.id);
    }, [query]);

    const getUserData = (id: any) => {
        let ref = Firebase.database().ref("/");

        ref
            .child("tutors")
            .child(id)
            .on("value", (snapshot) => {
                const state = snapshot.val();
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", state)
                setIsTutorOnline(state?.is_online);
            });
    };

    const getClassStatus = (id: any) => {
        api
            .get(`/classes/get-status/${id}`)
            .then(({data}) => {
                let startDateIn = data?.result?.start_date_time;
                var date1: any = moment(new Date()).format("YYYY-MM-DD");
                var date2: any = moment(new Date(startDateIn)).format("YYYY-MM-DD");

                if (date1 === date2) {
                    const startTime = moment(startDateIn, "YYYY-MM-DD HH:mm").format();
                    var endClassTime = new Date(startDateIn);
                    endClassTime.setHours(endClassTime.getHours() + 1);
                    let endClassTimeFormat = moment(new Date(endClassTime)).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                    const endTime = moment(
                        endClassTimeFormat,
                        "YYYY-MM-DD HH:mm"
                    ).format();

                    let todayDateObject = new Date();
                    let AppointmentDate = new Date(startTime);
                    let AppointmentEndDate = new Date(endTime);
                    todayDateObject.setMinutes(todayDateObject.getMinutes());
                    todayDateObject.setSeconds(0);
                    if (
                        todayDateObject >= AppointmentDate &&
                        AppointmentEndDate >= todayDateObject
                    ) {
                        setShowStart(true);
                    } else if (todayDateObject >= AppointmentEndDate) {
                        setShowStart(false);
                    }
                } else {
                    setShowStart(false);
                }

                setClassDetails(data.result);
                getUserData(data.result.uuid);
            })
            .catch((err) => {
                console.log(err);
                setClassDetails(null);
            });
    };

    const createClassLink = (id: any) => {

        api.get(`/tutor/create-class/${id}`)
            .then(({data}) => {
                setClassDetails(data.result);
                // getUserData(data.result.uuid);
            }).catch((e) => {
            let msg = e.message
            if (e.request.response && typeof e.request.response === "string") {
                try {
                    let response = JSON.parse(e.request.response)
                    msg = response.message
                } catch (e) {
                }
            }
            toast.error(msg);

        })
    }
    const handleStartClass = () => {
        if (!classDetails) return;

        if (typeof window !== undefined) {
            // browser code
            window?.open(classDetails.class_link, "_blank")?.focus();
        }
    };
    useEffect(() => {
        if (!classDetails?.class_link) {
            console.log(data);
        }
    }, [classDetails]);
    return (
        <>
            <Head>
                <title>Tusu - Student | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Header/>
            <div style={{backgroundColor: "#f5f5f5 ", height: "100%"}}>
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
                        style={{color: "#924781", fontSize: "24px"}}
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
                        style={{color: "#924781", fontSize: "24px"}}
                    />
                  </span>
                                </div>
                                <div className="ms-4">
                                    <h6 className="m-0">Internet Connection</h6>
                                    <div className="system-status">
                                        Network Quality: <span className="text-danger"> Poor</span>
                                    </div>
                                </div>
                            </div>

                            <div className="system-check__component">
                                <div>
                  <span>
                    <FontAwesomeIcon
                        icon={faMicrophone}
                        style={{color: "#924781", fontSize: "24px"}}
                    />
                  </span>
                                </div>
                                <div className="ms-4">
                                    <h6 className="m-0">Microphone</h6>
                                    <div className="system-status">
                                        Network Quality:
                                        <span className="text-danger"> Poor</span>
                                    </div>
                                </div>
                            </div>

                            <div className="system-check__component">
                                <div className="">
                  <span>
                    <FontAwesomeIcon
                        icon={faVolumeUp}
                        style={{color: "#924781", fontSize: "24px"}}
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
                                <br/>
                                <div className="mt-3" style={{fontSize: "18px"}}>
                                    System check is completed. You can start class now.
                                </div>
                            </div>
                            {classDetails && (
                                <button
                                    className="btn btn-brand mt-5"
                                    onClick={handleStartClass}
                                    disabled={!classDetails.class_link}
                                >
                                    Start Class
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>

            <Footer/>
        </>
    );
}

export default SystemCheck;
