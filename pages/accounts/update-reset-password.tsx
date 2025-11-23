import React, { useState, useEffect } from "react";
import Header from "../../components/header"; // Assuming this path is correct
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../../components/button"; // Assuming this path is correct
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useResetPassword from "modules/auth/hooks/useResetPassword"; // Your custom hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PasswordStrengthBar from "react-password-strength-bar"; // Changed to standard name for clarity

// Validation Schema
const UpdatePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "The password must be at least 6 characters"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const UpdatePassword = () => {
  const router = useRouter();
  const { token } = router.query;

  // Use your existing hook
  const { mutate, isLoading } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const togglePasswordVisiblity = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisiblity = () =>
    setShowConfirmPassword((prev) => !prev);

  // Optional: Check if token exists, otherwise redirect to home or login
  useEffect(() => {
    if (router.isReady && !token) {
      // console.warn("No token found in URL");
      // router.push('/signin');
    }
  }, [router.isReady, token]);

  const handleFormSubmit = async (values: any) => {
    if (!token) return;

    mutate(
      {
        token: token,
        password: values.password,
        password_confirmation: values.confirm_password,
      },
      {
        onSuccess: () => {
          // Show a toast message here if you have one
          setTimeout(() => {
            router.push(`/signin`);
          }, 2000);
        },
        onError: (error) => {
          console.error("Failed to reset password", error);
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Update Password | Tusu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />

      <div className="auth-container">
        <div className="container">
          <div className="auth-container-inner d-flex justify-content-center align-content-center h-100 flex-column">
            <div className="row align-content-center">
              <div className="col-12 col-md-3 col-lg-4"></div>
              <div className="col-12 col-lg-4">
                <h4
                  className="sign-in-title text-center"
                  style={{ color: "#172B4D", fontWeight: "bold" }}
                >
                  Create new password
                </h4>
                <p className="text-center text-muted mb-4">
                  Please enter a new password for your account.
                </p>

                <Formik
                  initialValues={initialValues}
                  validationSchema={UpdatePasswordSchema}
                  onSubmit={handleFormSubmit}
                >
                  {(formik) => {
                    const { errors, touched, isValid, dirty, values } = formik;
                    return (
                      <Form className="reset-form">
                        {/* New Password Input */}
                        <div className="d-flex mb-3 align-items-center">
                          <div className="flex-grow-1">
                            <div className="form-floating bd-5">
                              <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="New Password"
                                className={`form-control ${
                                  errors.password && touched.password
                                    ? "input-error"
                                    : ""
                                }`}
                              />
                              <label htmlFor="password">New Password</label>

                              <i
                                className="eye-icon"
                                onClick={togglePasswordVisiblity}
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  right: "15px",
                                  top: "20px",
                                  zIndex: 10,
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={showPassword ? faEye : faEyeSlash}
                                  style={{ color: "#6c757d" }}
                                />
                              </i>
                            </div>
                            <ErrorMessage
                              name="password"
                              component="span"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>

                        {/* Password Strength Bar */}
                        <div className="mb-3">
                          {/* FIX: Pass formik values.password here, not the string "password" */}
                          <PasswordStrengthBar
                            password={values.password}
                            barColors={[
                              "#ddd",
                              "#ef4444",
                              "#eab308",
                              "#22c55e",
                              "#15803d",
                            ]}
                            scoreWords={[
                              "weak",
                              "weak",
                              "okay",
                              "good",
                              "strong",
                            ]}
                            shortScoreWord="too short"
                          />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="d-flex mb-3 align-items-center">
                          <div className="flex-grow-1">
                            <div className="form-floating bd-5">
                              <Field
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm_password"
                                id="confirm_password"
                                placeholder="Confirm Password"
                                className={`form-control ${
                                  errors.confirm_password &&
                                  touched.confirm_password
                                    ? "input-error"
                                    : ""
                                }`}
                              />
                              <label htmlFor="confirm_password">
                                Confirm Password
                              </label>

                              <i
                                className="eye-icon"
                                onClick={toggleConfirmPasswordVisiblity}
                                style={{
                                  cursor: "pointer",
                                  position: "absolute",
                                  right: "15px",
                                  top: "20px",
                                  zIndex: 10,
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    showConfirmPassword ? faEye : faEyeSlash
                                  }
                                  style={{ color: "#6c757d" }}
                                />
                              </i>
                            </div>
                            <ErrorMessage
                              name="confirm_password"
                              component="div"
                              className="text-danger small mt-1"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit" // Changed to standard HTML submit
                          className="w-100 mt-4 btn btn-primary" // Ensure bootstrap classes are present
                          loading={isLoading}
                          disabled={isLoading || !(dirty && isValid)}
                        >
                          Update Password
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
