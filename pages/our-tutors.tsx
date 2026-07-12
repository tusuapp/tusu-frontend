import {useEffect} from "react";
import { api } from "api";
import Seo from "../components/seo";
import { buildBreadcrumbs } from "../consts/site";
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
      <Seo
        title="Language Tutors & IELTS Instructors"
        description="Browse Tusu's certified language tutors and IELTS specialists. Compare native speakers, reviews and availability, then book a personalised 1-on-1 online lesson."
        canonical="/our-tutors"
        jsonLd={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Language Tutors", path: "/our-tutors" },
        ])}
      />
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
