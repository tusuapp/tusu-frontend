import {
    faCamera,
    faCircle,
    faGlobe,
    faMicrophone,
    faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {api} from "api";
import Firebase from "firebase";
import StudentDashboardLayout from "layouts/StudentDashboard";
import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function SystemCheck() {
    const [isTutorOnline, setIsTutorOnline] = useState(false);
    const [timer, setTimer] = useState(0);

    const [classDetails, setClassDetails] = useState<any>();

    const {query} = useRouter();

    useEffect(() => {
        console.log(timer)
        if (!isTutorOnline && timer) {
            setTimeout(() => {
                getClass(query.id)
            }, 5000)
        }
    }, [isTutorOnline, timer]);

    useEffect(() => {
        if (!query.id) return;

        getClass(query.id);

        // getClassStatus(query.id);
    }, [query]);

    const getUserData = (id: any) => {
        if (!classDetails) return;
        let ref = Firebase.database().ref("/");

        ref
            .child("tutors")
            .child(id)
            .on("value", (snapshot) => {
                const state = snapshot.val();
                setIsTutorOnline(state?.is_online);
            });
    };

    const getClassStatus = (id: any) => {
        api
            .get(`/classes/get-status/${id}`)
            .then(({data}) => {
                setClassDetails(data.result);
                getUserData(data.result.uuid);

                if (data.result.class_link) {
                    setIsTutorOnline(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getClass = (id: any) => {
        api
            .get(`/student/get-class/${id}`)
            .then(({data}) => {
                console.log(data)
                setClassDetails(data.result);
                //   getUserData(data.result.uuid);

                if (data.result.tutor_online_status && data.result.tutor_online_status === "online") {
                    setIsTutorOnline(true);
                    setTimer(0);
                } else {
                    setTimer(timer + 1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleStartClass = () => {
        if (!classDetails) return;

        if (typeof window !== undefined) {
            // browser code
            window?.open(classDetails.class_link, "_blank")?.focus();
        }
    };
    return (
        <>
            <Head>
                <title>Tusu - Student | Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <StudentDashboardLayout>
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
                                        <div className="text-success system-status">
                                            Working fine
                                        </div>
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
                                            Netwrok Quality:{" "}
                                            <span className="text-danger"> Poor</span>
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
                                            Netwrok Quality:
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
                                        <div className="text-success system-status">
                                            Working fine
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="system-check__container">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <img src={classDetails?.image} height="60px"/>
                                    </div>
                                    <div>
                                        <div style={{color: "#924781", fontSize: "20px"}}>
                                            {classDetails?.fullname}
                                        </div>
                                        <div>
                                            Subject:{" "}
                                            <span style={{color: "#924781"}}>
                        {classDetails?.subject}
                      </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <br/>
                                    <div className="mt-3" style={{fontSize: "18px"}}>
                                        {isTutorOnline ? (
                                            <>
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    style={{color: "#6DC217"}}
                                                    className="me-2"
                                                />
                                                Tutor is online now!
                                            </>
                                        ) : (
                                            "Class will be started after Tutor is ready. Kindly Wait."
                                        )}
                                    </div>
                                </div>
                                {((classDetails && classDetails.class_link) ? (<button
                                    className="btn btn-brand mt-5"
                                    onClick={handleStartClass}
                                    disabled={!isTutorOnline} >
                                    Start now
                                </button>) : "")}


                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </StudentDashboardLayout>
        </>
    );
}

export default SystemCheck;
