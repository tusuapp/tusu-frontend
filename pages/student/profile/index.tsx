import Head from "next/head";
import withAuthNew from "HOC/withAuthNew";
import Button from "components/button";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import useStudentProfile from "@/student/hooks/useStudentProfile";
import Header from "../../../modules/student/components/Header/index";

const PAGE_PERMISSION_ROLE = "student";

function Profile() {
  const { data } = useStudentProfile();

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className="student__profile profile__container">
        <div className="d-flex justify-content-between">
          <div className="tutor__dashboard__title pb-4">My Profile</div>
          <div>
            <Link href="/student/profile/edit">
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
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="profile__wrap">
          <div className="profile__leftContainer">
            <div className="profile__leftContainer__top">
              <img src={data?.imageUrl} />
              <h6>{data?.fullName}</h6>
              <p>{data?.email}</p>
            </div>
            <div className="profile__leftContainer__bottom">
              <div className="profile__class__count">
                <div>
                  <img src="/icons/teacher.svg" />
                </div>
                <div>
                  <h6>{data?.total_classes}</h6>
                  <p>Classes</p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="col-12 py-4 px-5 d-flex align-items-end">
              <img
                src={data?.image}
                onClick={onImageUpload}
                height={"100px"}
                className="edit-profile__profile__image"
                {...dragProps}
              />
            </div> */}

          <div className="row profile__rightContainer">
            <div className="profileField">
              <div className="profile__field__label"> Phone Number</div>
              <div className="profile__field__value profileField__value">
                {data?.phone}
              </div>
            </div>
            <div className="profileField">
              <div className="profile__field__label">Address</div>
              <div className="profile__field__value profileField__value">
                {data?.address ? data?.address : "N/A"}
              </div>
            </div>
            <div className="profileField">
              <div className="profile__field__label">Country</div>
              <div className="profile__field__value profileField__value">
                {data?.country?.name}
              </div>
            </div>
            <div className="profileField">
              <div className="profile__field__label">Timezone</div>
              <div className="profile__field__value profileField__value">
                {data?.timeZone}
              </div>
            </div>
            {/* <div className="profileField">
                  <div className="profile__field__label">Password</div>
                  <div className="profile__field__value profileField__value">{data?.password}</div>
                </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthNew(Profile, PAGE_PERMISSION_ROLE);
