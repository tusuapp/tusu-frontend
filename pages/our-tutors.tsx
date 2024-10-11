import {useEffect} from "react";
import { api } from "api";
import Head from "next/head";
import Container from "../components/container";
import Footer from "../components/footer";
import Header from "../components/header";
import TutorCard from "../components/TutorCard";
import { useDispatch, useSelector } from "react-redux";
import { selectStudentDashboard, fetchDashboard, fetchAllTutors } from "features/students/DashboardSlice";
import {  } from "features/subjects";
import Link from "next/dist/client/link";
import AllTutors from "./student/tutors/all";

export default function OurTutorsPage({ tutors }: any) {
  const dispatch = useDispatch();

  const { dashboard, all_tutors } = useSelector(selectStudentDashboard);
  

  useEffect(() => {
    dispatch(fetchDashboard());
    dispatch(fetchAllTutors());
  }, []);
  return (
    <>
      <Head>
        <title>Our tutors | Tusu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />

      <Container>
        <section id="our-tutors ">
          <div className="container">
            <h3 className="Page__title">Our Tutors</h3>
            <div className="row row-cols-2  row-cols-lg-5 row-cols-xl-5  row-cols-md-2">
            {all_tutors &&
              all_tutors.map((tutor: any, index: any) => (
                // <Link href={`/student/tutors/${tutor.id}`} key={index}>
                  <div className="col mb-5 tutor__list_column" key={index}>
                    <TutorCard
                      tutorName={tutor.name}
                      profilePicture={tutor.image}
                      tutorSubject={tutor.subject}
                      rating={tutor.ratting}
                    />
                  </div>
                // </Link>
              ))}
          </div>
                {/* <AllTutors/> */}
            <br />
            <br />
            <br />
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

const getOurTutors = async () => {
  const { data } = await api.get("/student/tutors?type=all-tutors&limit=1000");
  return data.result;
};

async function getServerSideProps() {
  const tutors = await getOurTutors();

  return {
    props: {
      tutors,
    },
  };
}
