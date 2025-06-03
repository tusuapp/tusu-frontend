import React, { useEffect, useState } from "react";
import Header from "../../../../components/header";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import SocialMediaLinks from "../SocialMediaLinks";

interface Props {
  title: string;
  children: React.ReactNode;
}

const AuthContainer: React.FC<Props> = ({ title = "", children }) => {
  return (
    <>
      <Header title={"Student | " + title} backgroundColor="#f5f5f5" />
      <div className="auth-container">
        <div className="container">
          <div className="auth-container-inner d-flex justify-content-center align-content-center h-100 flex-column">
            <div className="row" id="auth-page-container">
              <div className="col-sm-12 col-lg-7">
                <div className="text-center image-container">
                  <img
                    src="/image/signin.png"
                    className="image-left"
                    alt=""
                    width="auto"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-5">
                <div className="card sign-up-form bg-white">
                  <div>
                    <h4 style={{ fontSize: 16 }}>{title}</h4>
                    <div style={{ marginTop: 30 }}>{children}</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              id="social-login-container"
              className="d-flex flex-wrap col-md-6 flex-sm-wrap flex-lg-row flex-md-column flex-sm-column justify-content-end mt-5"
            >
              <div
                style={{ color: "#515259", fontSize: "18px" }}
                className="d-flex"
              >
                New to TUSU ?&nbsp;
                <Link href="/signup/">
                  <a
                    style={{
                      color: "#924781",
                    }}
                  >
                    Sign Up
                  </a>
                </Link>
              </div>
              {/* <SocialMediaLinks /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
