import {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "../../../components/header";
import {useRouter} from "next/router";
import {
    fetchAllSubjectTutors,
    subjects,
    fetchAllTutors,
} from "../../../features/subjects";
import withAuthNew from "../../../HOC/withAuthNew";
import TutorList from "../../../modules/student/components/molecules/TutorList";
import StudentContainer from "../../../components/studentContainer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import StudentDashboardLayout from "layouts/StudentDashboard";
import PageSearchField from "@/student/components/PageSearchField";
import Container from "components/container";
import {selectChat, setOnlineUsers} from "../../../components/chat/redux/reducer";

function MyTutors() {
    const router = useRouter();
    const {subject_id, subject} = router.query;
    const {onlineUsers, onlineUsersStatus} = useSelector(selectChat);
    const dispatch = useDispatch();
    const {subject_tutor} = useSelector(subjects);
    const {all_tutors} = useSelector(subjects);

    console.log("all tutors =>", all_tutors);
    

    useEffect(() => {

        dispatch(fetchAllSubjectTutors(1));
        dispatch(fetchAllTutors("my-tutors"));

    }, []);


    useEffect(() => {
        if (all_tutors && all_tutors.length)
        {
            dispatch(setOnlineUsers(all_tutors))
        }
    },[all_tutors]);



    useEffect(() => {
        if (Object.keys(onlineUsersStatus).length)
        {
            dispatch(setOnlineUsers(all_tutors))
        }
    },[onlineUsersStatus]);



    return (
        <>
            <StudentDashboardLayout>
                <Container>
                    <section>
                        <div className="d-flex  justify-content-between mb-5 mt-5">
                            <h3 className="student__page__header__title">My tutors</h3>
                            {/* <div>{isFetching ? "Updating..." : ""}</div> */}
                        </div>
                        <div className="d-flex justify-content-between mb-5">
                            <div>
                                <PageSearchField/>
                            </div>
                            <div>{/* <PageFilters /> */}</div>
                        </div>
                        <div className="row">
                            {all_tutors?.map((value: any, index: any) => (
                                <div
                                    key={index}
                                    className="col-md-4"
                                    style={{marginBottom: 25}}
                                >
                                    <TutorList
                                        uuid={value.uuid}
                                        id={value.id}
                                        name={value.name}
                                        subjects={value.subject}
                                        rating={value.ratting}
                                        // @ts-ignore
                                        active={!!(onlineUsersStatus[value.uuid] && onlineUsersStatus[value.uuid].connected)}
                                        image={value.image}
                                        href={`/student/tutors/${value.id}`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="row"></div>
                    </section>
                </Container>
            </StudentDashboardLayout>
        </>
    );
}

export default withAuthNew((MyTutors), "student");
