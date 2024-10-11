import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Header from "../../../../components/header";
import Header from "@/student/components/Header";
import { useRouter } from "next/router";
import { fetchAllSubjectTutors, subjects } from "../../../../features/subjects";
import withAuthNew from "../../../../HOC/withAuthNew";
import TutorList from "../../../../modules/student/components/molecules/TutorList";
import StudentContainer from "../../../../components/studentContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SubjectTutors() {
  const router = useRouter();
  const { subject_id, subject } = router.query;
  const dispatch = useDispatch();
  const { subject_tutor } = useSelector(subjects);
  useEffect(() => {
    if (!subject_id) return;
    dispatch(fetchAllSubjectTutors(subject_id));
  }, [subject_id]);


  console.log(subject_tutor);
  

  return (
    <>
      <Header title='Student | "Subject tutors" Tutors' />
      <StudentContainer
        header={
          <div>
            <div style={{ fontSize: 18, color: "#222222" }}>
              {subject || "loading"} Tutors
            </div>
            <div className="row" id="custom-search-box-block">
              <div
                className="col-md-5"
                style={{ marginBottom: 28, marginTop: 28 }}
              >
                <div style={{ width: "344px" }}>
                  <input
                    name="search"
                    className="inner-page-search-box"
                    placeholder="Search tutors..."
                  />
                  <div
                    style={{
                      float: "right",
                      transform: "translate(-110%, -133%)",
                      color: "darkgrey",
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} size="2x" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        <div className="row">
          {subject_tutor.map((value: any, index: any) => (
            <div key={index} className="col-md-4" style={{ marginBottom: 25 }}>
              <TutorList
                  uuid={value.uuid}
                  id={value.id}
                name={value.name}
                  rating={value.ratting}
                subjects={value.subject}
                active={value.is_online}
                image={value.image}
                href={`/student/tutors/${value.id}`}
              />
            </div>
          ))}
        </div>
      </StudentContainer>
    </>
  );
}

export default withAuthNew(SubjectTutors, "student");
