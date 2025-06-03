import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Router from "next/router";
import { selectAuth, signInTutor } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import LoginGoogle from "modules/auth/components/SocialMediaLinks/Google";
import LoginFacebook from "modules/auth/components/SocialMediaLinks/Facebook";
import LoginApple from "modules/auth/components/SocialMediaLinks/Apple";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(4, "Password is too short"),
});

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (!user) return;

    Router.replace("/tutor");
  }, [user]);

  const handleFormSubmit = async (data: any) => {
    setIsLoading(true);

    const newData = {
      identifier: data.email,
      password: data.password,
    };

    await dispatch(signInTutor(newData, setIsLoading));

    // setIsLoading(false);
  };

  const togglePasswordVisiblity = () => {
    setShowPassword((state) => !state);
  };

  return (
    <>
      <Head>
        <title>Login as a new Tutor | Tusu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />

      <div className="auth-container">
        <div className="container">
          <div className="auth-container-inner d-flex justify-content-center align-content-center h-100 flex-column">
            <div className="row align-content-center">
              <div className="col-sm-12 col-md-12 col-lg-7 col-xs-12">
                <div>
                  <img
                    src="/image/signin.png"
                    className="image-fluid pl-5 w-100"
                    alt=""
                    width="auto"
                  />
                </div>
              </div>
              <div className="col-md-12 mt-md-5 mt-lg-0 col-lg-5 col-xs-12">
                <div className="card bg-white sign-up-form">
                  <div className="auth-page__title">Sign In</div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={SignInSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {(formik) => {
                      const { errors, touched, isValid, dirty } = formik;
                      return (
                        <Form className="sign-in-form">
                          <div className="d-flex mb-3 align-items-center">
                            <div className="form-field-icon  me-3 ">
                              <img
                                src="/icons/email.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating">
                                <Field
                                  type="text"
                                  name="email"
                                  id="email"
                                  className={
                                    errors.email && touched.email
                                      ? "form-control input-error"
                                      : "form-control"
                                  }
                                />
                                <label htmlFor="email">Email</label>
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="d-flex mb-3 align-items-center">
                            <div className="form-field-icon  me-3">
                              <img
                                src="/icons/password.svg"
                                height="25px"
                                width="25px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating">
                                <Field
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  id="password"
                                  className={
                                    errors.password && touched.password
                                      ? "form-control input-error"
                                      : "form-control"
                                  }
                                />
                                <i
                                  className="eye-icon"
                                  onClick={togglePasswordVisiblity}
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{
                                      color: showPassword ? "black" : "grey",
                                    }}
                                  />
                                </i>
                                <label htmlFor="password">Password</label>
                                <ErrorMessage
                                  name="password"
                                  component="span"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mb-5 mt-3 d-flex justify-content-end">
                            <Link href="/accounts/forgot-password">
                              <a
                                className="text-decoration-none text-dark text-uppercase"
                                style={{ color: "#373A40" }}
                              >
                                Forgot password?
                              </a>
                            </Link>
                          </div>

                          <Button
                            type="primary"
                            className="w-100 mt-4"
                            loading={isLoading}
                            disabled={!((dirty && isValid) || disableButton)}
                          >
                            Sign In
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap flex-sm-wrap flex-lg-row flex-md-column flex-sm-column justify-content-between mt-5">
              <div style={{ color: "#515259", fontSize: "18px" }}>
                New to TUSU?{" "}
                <Link href="/signup">
                  <a
                    href="/signup"
                    style={{
                      color: "#924781",
                    }}
                  >
                    Sign Up
                  </a>
                </Link>
              </div>

              <div
                style={{
                  maxWidth: "800px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  // marginRight: "10px",
                  paddingRight: "10px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  className="btn me-0 "
                  style={{
                    paddingRight: "0px",
                    marginRight: "100px",
                    alignItems: "center",
                    // marginLeft: "150px",
                    // width: "350px",
                    padding: "10px 20px 10px 0px",
                  }}
                >
                  {/* <LoginGoogle /> */}
                </div>
                <div>{/* <LoginFacebook /> */}</div>
                &nbsp; &nbsp; &nbsp;
                {/* <div>
                  <LoginApple />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
// position: absolute;
//     top: 50%;
//     left: 50%;
//     margin-top: -50px;
//     margin-left: -50px;
