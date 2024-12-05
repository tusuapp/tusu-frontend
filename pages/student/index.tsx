import Container from "../../components/container";
import TutorCard from "components/TutorCard";
import Discipline from "../../components/discipline";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { api } from "api";

import {
  selectStudentDashboard,
  fetchDashboard,
  fetchAllTutors,
} from "../../features/students/DashboardSlice";
import withAuthNew from "../../HOC/withAuthNew";
import { selectAuth } from "../../features/auth/authSlice";
import StudentDashboardLayout from "layouts/StudentDashboard";
import MyClass from "@/student/components/MyClass";

const StudentHome = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const { dashboard, all_tutors } = useSelector(selectStudentDashboard);
  const [classesData, setclassesData] = useState([]);

  // console.log("classData ======>", classesData);

  const fetchClasses = async () => {
    const response = await api.get("student/my-bookings?page=1&limit=3");
    // setclassesData(response);
    setclassesData(response.data.result.data);
  };

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchAllTutors());
    fetchClasses();
  }, []);

  return (
    <>
      <StudentDashboardLayout>
        <Container>
          <br />
          <br />
          <br />
          <br />
          <p style={{ color: "#637381", fontSize: "20px" }}>
            Hello {user.fullname}!
          </p>
          <section>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2
                className="discipline-head mb-5"
                style={{
                  color: "#0D1333",
                  fontSize: "30px",
                  width: "350px",
                  letterSpacing: "1px",
                }}
              >
                Upcoming Classes
              </h2>
              <a
                href="student/classes"
                className="text-decoration-none text-dark"
              >
                See More
              </a>
            </div>

            <div className="row">
              {classesData?.map((myClass: any, index: number) => {
                return (
                  <>
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 col-12 my-classes"
                      key={index}
                    >
                      <MyClass myclass={myClass} />
                    </div>
                  </>
                );
              })}
            </div>

            <div className="d-flex justify-content-between align-items-center mb-5">
              <h2
                className="discipline-head mb-5"
                style={{
                  color: "#0D1333",
                  fontSize: "30px",
                  width: "350px",
                  letterSpacing: "1px",
                }}
              >
                What do you want to learn today?
              </h2>
              <a
                href="student/disciplines"
                className="text-decoration-none text-dark"
              >
                See More
              </a>
            </div>
            <div className="row row-cols-2 row-cols-lg-5">
              {dashboard.subjects
                .filter((item: any) => item.type == "subject")
                .map((descipline: any, index: number) => (
                  <Link
                    href={`/student/subjects/tutors/${descipline.id}?subject=${descipline?.name}`}
                    key={index}
                  >
                    <div className="col mb-5 square mouse">
                      <Discipline
                        name={descipline.name}
                        icon={descipline.image}
                        href="#"
                        backgroundColor={descipline.background_color}
                        fontColor={descipline.text_color}
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
          <section>
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3
                className="header"
                style={{
                  color: "#0D1333",
                  fontSize: "30px",
                  width: "250px",
                  letterSpacing: "1px",
                }}
              >
                Find the best tutor for you
              </h3>
              <Link href="/student/tutors/all">
                <a
                  className="text-decoration-none"
                  style={{ color: "#707283" }}
                >
                  {" "}
                  View All
                </a>
              </Link>
            </div>
            <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
              {all_tutors &&
                all_tutors.map((tutor: any, index: any) => {
                  if (tutor.element.tutor_slots.length > 0) {
                    return (
                      <Link href={`/student/tutors/${tutor.id}`} key={index}>
                        <div
                          className="col mb-5 tutor__list_column mouse"
                          key={index}
                        >
                          <TutorCard
                            tutorName={tutor.name}
                            profilePicture={tutor.image}
                            tutorSubject={tutor.subject}
                            rating={tutor.ratting}
                          />
                        </div>
                      </Link>
                    );
                  }
                })}
            </div>
          </section>
          <section id="">
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3
                className="header"
                style={{ color: "#0D1333", fontSize: "30px" }}
              >
                Popular Tutors
              </h3>
              <Link href="/student/tutors/popular">
                <a
                  className="text-decoration-none"
                  style={{ color: "#707283" }}
                >
                  View All
                </a>
              </Link>
            </div>
            <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
              {dashboard?.popular_tutors?.map((tutor: any, index: any) => (
                <div className="col mb-5 tutor__list_column mouse" key={index}>
                  <Link href={`/student/tutors/${tutor.id}`} key={index}>
                    <div
                      className="col mb-5 tutor__list_column mouse"
                      key={index}
                    >
                      <TutorCard
                        tutorName={tutor.fullname}
                        profilePicture={tutor.image}
                        tutorSubject={tutor.subjects}
                        rating={tutor.rating}
                      />
                    </div>
                  </Link>
                  {/* <Link href={`/student/tutors/${tutor.id}`} key={index}>
                      <TutorCard
                        tutorName={tutor.name}
                        profilePicture={tutor.image}
                        tutorSubject={tutor.subject}
                        rating={tutor.ratting}
                      />
                    </Link> */}
                </div>
              ))}
            </div>
          </section>
          <section id="">
            <div className="d-flex  justify-content-between mb-5 mt-5">
              <h3
                className="header"
                style={{ color: "#0D1333", fontSize: "30px" }}
              >
                Recommended Tutors
              </h3>
              <a
                href="/student/tutors/recomended"
                className="text-decoration-none"
                style={{ color: "#707283" }}
              >
                {" "}
                View All
              </a>
            </div>
            <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
              {dashboard?.recommended_tutors?.map((tutor: any, index: any) => (
                <div className="col mb-5 tutor__list_column mouse" key={index}>
                  <Link href={`/student/tutors/${tutor.id}`} key={index}>
                    <div
                      className="col mb-5 tutor__list_column mouse"
                      key={index}
                    >
                      <TutorCard
                        tutorName={tutor.fullname}
                        profilePicture={tutor.image}
                        tutorSubject={tutor.subjects}
                        rating={tutor.rating}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <br />
          <br />
          <br />
          <br />
        </Container>
      </StudentDashboardLayout>
    </>
  );
};

export default withAuthNew(StudentHome, "student");
