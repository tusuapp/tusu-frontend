import Header from "../../../components/header";
import Container from "../../../components/container";
import Footer from "../../../components/footer";
import TutorCard from "../../../components/@next/molecules/tutorCard";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectStudentDashboard,
  fetchDashboard,
  fetchAllTutors,
} from "../../../features/students/DashboardSlice";
import withAuthNew from "../../../HOC/withAuthNew";

const ROLE = "student";

const AllTutors = () => {
  const dispatch = useDispatch();

  const { dashboard, all_tutors } = useSelector(selectStudentDashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchAllTutors());
  }, []);

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container>
        <br />
        <br />
        <br />
        <br />

        <section>
          <div className="d-flex  justify-content-between mb-5 mt-5">
            <h3
              className="header"
              style={{ color: "#0D1333", fontSize: "30px" }}
            >
              Recomended tutors
            </h3>
          </div>

          <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
            {all_tutors &&
              all_tutors.map((tutor: any, index: any) => (
                <Link href={`/student/tutors/${tutor.id}`} key={index}>
                  <div className="col mb-5 tutor__list_column" key={index}>
                    <TutorCard
                      tutorName={tutor.name}
                      profilePicture={tutor.image}
                      tutorSubject={tutor.subject}
                      rating={tutor.ratting}
                    />
                  </div>
                </Link>
              ))}
          </div>
        </section>
        <br />
        <br />

        <br />
        <br />
        <br />
        <br />
      </Container>

      <Footer />
    </>
  );
};

export default withAuthNew(AllTutors, ROLE);
