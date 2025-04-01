import { useState } from "react";
import { arrayToSentence } from "../../../../utils";

const ProfileExtras = ({ profile }: any) => {
  return (
    <div className="profile-extra">
      <div className="card-info wallet-details bg-light p-2">
        <div className="row pt-3">
          <div className="col-6">
            <div className="d-flex justify-content-start p-2">
              <div className="p-2">
                <svg
                  id="dollar"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27.029"
                  height="27.029"
                  viewBox="0 0 27.029 27.029"
                >
                  <path
                    id="Path_24521"
                    data-name="Path 24521"
                    d="M13.515,27.029A13.515,13.515,0,0,1,3.958,3.958,13.515,13.515,0,0,1,23.071,23.071a13.426,13.426,0,0,1-9.556,3.958Zm0-25.34A11.825,11.825,0,1,0,25.34,13.515,11.839,11.839,0,0,0,13.515,1.689Z"
                    transform="translate(0 0)"
                    fill="#fbb017"
                  />
                  <path
                    id="Path_24522"
                    data-name="Path 24522"
                    d="M187.8,103.6a2.112,2.112,0,1,1,2.112-2.112.845.845,0,0,0,1.689,0,3.807,3.807,0,0,0-2.956-3.705v-.94a.845.845,0,1,0-1.689,0v.94a3.8,3.8,0,0,0,.845,7.506,2.112,2.112,0,1,1-2.112,2.112.845.845,0,1,0-1.689,0,3.807,3.807,0,0,0,2.956,3.705v.94a.845.845,0,0,0,1.689,0v-.94a3.8,3.8,0,0,0-.845-7.506Z"
                    transform="translate(-174.286 -90.932)"
                    fill="#fbb017"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="font-w600 text-wallet m-0"
                  style={{ fontSize: "12px", color: "#000000" }}
                >
                  Fee
                </p>
                <span
                  className="text-black"
                  style={{ fontSize: "12px", color: "#00213D" }}
                >
                  ${profile?.tutor_details?.hourly_charge} / Hour
                </span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start">
              <div className="p-2 ps-0">
                <svg
                  id="translation"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27.029"
                  height="27.029"
                  viewBox="0 0 27.029 27.029"
                >
                  <path
                    id="Path_24523"
                    data-name="Path 24523"
                    d="M24.812,9.5H17.387c.024-.26.036-.524.036-.791A8.714,8.714,0,0,0,4.359,1.163a.528.528,0,1,0,.528.914,7.657,7.657,0,1,1,3.825,14.29,7.57,7.57,0,0,1-4.8-1.693.528.528,0,0,0-.486-.093l-1.4.366.549-1.206a.528.528,0,0,0-.054-.529,7.66,7.66,0,0,1-.435-8.335.528.528,0,1,0-.914-.53,8.718,8.718,0,0,0,.316,9.231L.6,15.521a.528.528,0,0,0,.614.729l2.245-.587a8.71,8.71,0,0,0,6.464,1.675v4.623a2.22,2.22,0,0,0,2.217,2.217h7.467l3.338,2.731a.528.528,0,0,0,.862-.409V24.178h1a2.22,2.22,0,0,0,2.217-2.217V11.719A2.22,2.22,0,0,0,24.812,9.5Zm1.161,12.459a1.163,1.163,0,0,1-1.161,1.161H23.281a.528.528,0,0,0-.528.528v1.737l-2.607-2.133c-.144-.131-.27-.131-.552-.131H12.142a1.163,1.163,0,0,1-1.161-1.161V17.123a8.741,8.741,0,0,0,6.245-6.565h7.586a1.163,1.163,0,0,1,1.161,1.161Zm0,0"
                    transform="translate(0 0.001)"
                    fill="#3ab1e9"
                  />
                  <path
                    id="Path_24524"
                    data-name="Path 24524"
                    d="M293.318,255.283a.528.528,0,0,0-.225-1.005h-.216l-1.7-3.88a.528.528,0,0,0-.967,0l-1.7,3.88h-.216a.528.528,0,0,0-.225,1.005l-.634,1.445a.528.528,0,1,0,.967.424l.8-1.819h2.992l.8,1.819a.528.528,0,1,0,.967-.424Zm-3.66-1.005,1.033-2.354,1.033,2.354Zm0,0"
                    transform="translate(-272.214 -236.879)"
                    fill="#3ab1e9"
                  />
                  <path
                    id="Path_24525"
                    data-name="Path 24525"
                    d="M45.93,46.454a.528.528,0,1,0-.373-.155A.532.532,0,0,0,45.93,46.454Zm0,0"
                    transform="translate(-43.005 -43.002)"
                    fill="#3ab1e9"
                  />
                  <path
                    id="Path_24526"
                    data-name="Path 24526"
                    d="M100.407,92.811a.528.528,0,1,0,.508.926,6.046,6.046,0,0,0,2.613-2.834,6.047,6.047,0,0,0,2.613,2.834.528.528,0,1,0,.508-.926,4.993,4.993,0,0,1-2.536-3.633h2.344a.528.528,0,1,0,0-1.056h-2.4v-2.2a.528.528,0,0,0-1.056,0v2.2h-1.907a.528.528,0,1,0,0,1.056h1.851a4.992,4.992,0,0,1-2.536,3.633Zm0,0"
                    transform="translate(-94.847 -80.886)"
                    fill="#3ab1e9"
                  />
                </svg>
              </div>
              <div className="me-">
                <p
                  className="font-w600 text-wallet m-0"
                  style={{ fontSize: "12px", color: "#000000" }}
                >
                  Languages
                </p>
                <div
                  className="text-black"
                  style={{ fontSize: "12px", color: "#00213D" }}
                >
                  {!arrayToSentence(profile?.languages) && "No languages"}
                  {arrayToSentence(profile?.languages)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3"></div>
        <div className="row pb-3">
          <div className="col-6">
            <div className="d-flex justify-content-start p-2">
              <div className="p-2">
                <svg
                  id="_2_"
                  data-name="calendar (2)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.926"
                  height="28.926"
                  viewBox="0 0 28.926 28.926"
                >
                  <path
                    id="Path_24527"
                    data-name="Path 24527"
                    d="M25.2,2.26H22.6V.9a.9.9,0,0,0-1.808,0V2.26H8.136V.9A.9.9,0,1,0,6.328.9V2.26h-2.6A3.733,3.733,0,0,0,0,5.989V25.2a3.733,3.733,0,0,0,3.729,3.729H25.2A3.733,3.733,0,0,0,28.926,25.2V5.989A3.733,3.733,0,0,0,25.2,2.26ZM3.729,4.068h2.6v.9a.9.9,0,0,0,1.808,0v-.9H20.791v.9a.9.9,0,0,0,1.808,0v-.9h2.6a1.923,1.923,0,0,1,1.921,1.921V8.136H1.808V5.989A1.923,1.923,0,0,1,3.729,4.068ZM25.2,27.119H3.729A1.923,1.923,0,0,1,1.808,25.2V9.943H27.119V25.2A1.923,1.923,0,0,1,25.2,27.119Z"
                    fill="#51bda5"
                  />
                </svg>
              </div>
              <div>
                <div
                  className="font-w600 m-0"
                  style={{ fontSize: "12px", color: "#000000" }}
                >
                  Schedule
                </div>
                <span style={{ fontSize: "12px", color: "#00213D" }}>
                  {profile.days}
                </span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-start p-2">
              <div className="p-2 ps-0">
                <svg
                  id="clock"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27.029"
                  height="27.029"
                  viewBox="0 0 27.029 27.029"
                >
                  <path
                    id="Path_24519"
                    data-name="Path 24519"
                    d="M24.186,7.112a1.126,1.126,0,0,0-.523,1.5,11.147,11.147,0,0,1,1.115,4.9A11.262,11.262,0,1,1,13.515,2.252a11.127,11.127,0,0,1,6.992,2.43,1.126,1.126,0,1,0,1.4-1.763,13.517,13.517,0,1,0,5.122,10.6,13.377,13.377,0,0,0-1.34-5.879,1.125,1.125,0,0,0-1.5-.523Zm0,0"
                    transform="translate(0 0)"
                    fill="#fbb017"
                  />
                  <path
                    id="Path_24520"
                    data-name="Path 24520"
                    d="M177.126,64A1.127,1.127,0,0,0,176,65.126V73.01a1.127,1.127,0,0,0,1.126,1.126h5.631a1.126,1.126,0,0,0,0-2.252h-4.5V65.126A1.127,1.127,0,0,0,177.126,64Zm0,0"
                    transform="translate(-163.612 -59.495)"
                    fill="#fbb017"
                  />
                </svg>
              </div>
              <div className="">
                <p
                  className="font-w600 text-wallet m-0"
                  style={{ fontSize: "12px", color: "#000000" }}
                >
                  Tutor Timezone
                </p>
                <span
                  className="text-black"
                  style={{ fontSize: "12px", color: "#00213D" }}
                >
                  {profile.timezone}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          {/* <p class="mb-1 text-white fs-14">Main Balance</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileExtras;
