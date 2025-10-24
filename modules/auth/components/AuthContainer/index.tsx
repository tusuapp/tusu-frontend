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
              <div className="col-12 col-md-8 col-lg-7 d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <img
                    src="/image/signin.png"
                    alt="Sign In"
                    className="img-fluid"
                    style={{ maxWidth: "150px", width: "100%" }} // reduce size and keep responsive
                  />
                  <div className="mt-5 px-5">
                    <h1 className="display-6 fw-bold ">
                      Welcome back, Student!
                    </h1>
                    <p className="lead text-muted mt-3">
                      Sign in to continue taking your classes .
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-5">
                <div className="card sign-up-form bg-white">
                  <div>
                    <h4 style={{ fontSize: 16 }}>{title}</h4>
                    <div style={{ marginTop: 20 }}>{children}</div>
                  </div>
                  <div
                    style={{
                      color: "#515259",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                    className=" mt-2"
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
                </div>
              </div>
            </div>
            <div
              id="social-login-container"
              className="d-flex flex-wrap col-md-6 flex-sm-wrap flex-lg-row flex-md-column flex-sm-column justify-content-end mt-5"
            >
              {/* <SocialMediaLinks /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
