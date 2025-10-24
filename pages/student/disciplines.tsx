import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";
import Discipline from "../../components/discipline";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { disciplines } from "../../data/desciplines";
import {
  selectStudentDashboard,
  fetchDashboard,
  fetchAllTutors,
} from "../../features/students/DashboardSlice";
import withAuthNew from "../../HOC/withAuthNew";

const ROLE = "student";

const Disciplines = () => {
  const dispatch = useDispatch();

  const { dashboard } = useSelector(selectStudentDashboard);

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
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h3
              className="header"
              style={{ color: "#0D1333", fontSize: "30px" }}
            >
              Subjects
            </h3>
          </div>

          <div className="row row-cols-2 row-cols-lg-5">
            {/* {dashboard.subjects.filter((item: any) => item.type == "subject").map((descipline: any, index: number) => (
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
            ))} TODO */}
          </div>
        </section>

        <br />
        <br />
        <br />
        <br />
      </Container>

      <Footer />
    </>
  );
};

export default withAuthNew(Disciplines, ROLE);
