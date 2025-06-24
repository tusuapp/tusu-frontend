import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import MultiSelect from "react-multi-select-component";
import { timezones } from "consts/timezones";
import TutorDashboardLayout from "layouts/TutorDashboard";
import withAuthNew from "HOC/withAuthNew";
import useTutorProfile from "@/tutor/hooks/useTutorProfile";

import Button from "components/button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const PAGE_PERMISSION_ROLE = "tutor";

function Profile() {
  const { data, refetch } = useTutorProfile();
  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TutorDashboardLayout>
        <div className="d-flex justify-content-between">
          <div className="tutor__dashboard__title pb-4">My Profile</div>
          <div>
            <Link href="/tutor/profile/edit">
              <Button
                type="primary"
                style={{ backgroundColor: "#FBB017", borderColor: "#FBB017" }}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{
                    color: "white",
                    width: "30px",
                    paddingRight: "10px",
                  }}
                />
                Edit profile
              </Button>
            </Link>
          </div>
        </div>
        {/* {JSON.stringify(data)} */}
        <div className="profile__wrapper">
          <div className="row">
            {/* <div className="col-12 py-4 px-5 d-flex align-items-end">
              <img
                src={data?.image}
                onClick={onImageUpload}
                height={"100px"}
                className="edit-profile__profile__image"
                {...dragProps}
              />
            </div> */}
          </div>
          <div className="row">
            <div className="col-lg-4 py-4 px-5 ">
              <div className="row">
                <div className="col-12 mb-5">
                  <div className="profile__field__label"> Phone Number</div>
                  <div className="profile__field__value">
                    {data?.tutor?.phone}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Address</div>
                  <div className="profile__field__value">
                    {data?.tutor?.address}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Country</div>
                  <div className="profile__field__value">
                    {data?.tutor.country?.name}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Timezone</div>
                  <div className="profile__field__value">
                    {data?.tutor?.timeZone}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Description</div>
                  <div className="profile__field__value">
                    {data?.tutorDetails?.description}
                  </div>
                </div>

                {/* <div className="col-12">
                  <div className="profile__field__label"> Timezone</div>
                  <div className="profile__field__value"> {data?.timezone}</div>
                </div>
                <div>
                  <div className="col-12 mb-5">
                    <div className="profile__field__label">Country</div>
                    <div className="profile__field__value">
                      {data?.country?.name}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-1 py-4 px-1">
              <div className="profile__border__right"></div>
            </div>
            <div className="col-lg-7 py-4 px-5">
              <div className="row">
                <div className="col-12 mb-5">
                  <div className="profile__field__label"> Gender</div>
                  <div className="profile__field__value">
                    {data?.tutorDetails?.gender}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">
                    Experience (year(s))
                  </div>
                  <div className="profile__field__value">
                    {data?.tutorDetails?.experience}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Disciplines</div>
                  <div className="profile__field__value">
                    {data?.tutorDetails?.disciplines.map(
                      (discipline: any) => `${discipline.name}, `
                    )}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Subjects/Modules</div>
                  <div className="profile__field__value">
                    {data?.tutorDetails?.subjects.map(
                      (subject: any) => `${subject.name}, `
                    )}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label"> Hourly charge</div>
                  <div className="profile__field__value">
                    ${data?.tutorDetails?.hourlyCharge}
                  </div>
                </div>
                <div className="col-12 mb-5">
                  <div className="profile__field__label">Known languages</div>
                  <div className="profile__field__value">
                    {data?.tutorDetails?.languages.map(
                      (language: any) => `${language.name}, `
                    )}
                    {/* ${data?.tutor_details?.hourly_charge} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TutorDashboardLayout>
    </>
  );
}

export default withAuthNew(Profile, PAGE_PERMISSION_ROLE);
