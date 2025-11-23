import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useRouter } from "next/router";
import InputText from "../../modules/auth/components/InputText";
import Head from "next/head";
import Button from "../../components/button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useResetPassword from "modules/auth/hooks/useResetPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "react-password-strength-bar";
import { v2api } from "api";
import { toast } from "react-toastify";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "The password must be at least 6 characters"),

  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
// const [password, setPassword] = useState("");
// const [passwordStrength, setPasswordStrength] = useState("");
const ResetPassword = () => {
  const { data, mutate, isLoading } = useResetPassword();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const token = router.query.token;

  const initialValues = {
    password: "",
    confirm_password: "",
  };

  const togglePasswordVisiblity = () => {
    setShowPassword((state) => !state);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setShowConfirmPassword((state) => !state);
  };

  useEffect(() => {
    if (!router.query) return;

    console.log("token", token);
  }, [router.query]);

  const handleFormSubmit = async (values: any) => {
    try {
      const response = await v2api.post(
        `/user/profile/reset-password`,
        {
          token: token,
          password: values.password,
          confirmPassword: values.confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password has been reset successfully!");
    } catch (error) {
      console.error("Error resetting password:", error);
    }
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
              <div className="col-12 col-md-3 col-lg-4"></div>
              <div className="col-12 col-lg-4">
                <h4
                  className="sign-in-title text-center"
                  style={{ color: "#172B4D" }}
                >
                  Set your password
                </h4>
                <br />

                <Formik
                  initialValues={initialValues}
                  validationSchema={ResetPasswordSchema}
                  onSubmit={handleFormSubmit}
                >
                  {(formik) => {
                    const { errors, touched, isValid, dirty } = formik;
                    return (
                      <Form className="reset-form">
                        <div className="d-flex mb-3 align-items-center">
                          <div className="flex-grow-1">
                            <div className="form-floating bd-5">
                              <div className="d-flex">
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
                                          color: showPassword
                                            ? "black"
                                            : "grey",
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
                            </div>
                          </div>
                        </div>
                        <div></div>

                        <div className="d-flex mb-3 align-items-center">
                          <div className="flex-grow-1">
                            <div className="form-floating">
                              <div className="d-flex">
                                <div className="flex-grow-1">
                                  <div className="form-floating">
                                    <Field
                                      type={
                                        showConfirmPassword
                                          ? "text"
                                          : "password"
                                      }
                                      name="confirm_password"
                                      id="confirm_password"
                                      className={
                                        errors.confirm_password &&
                                        touched.confirm_password
                                          ? "form-control input-error"
                                          : "form-control"
                                      }
                                    />
                                    <i
                                      className="eye-icon"
                                      onClick={toggleConfirmPasswordVisiblity}
                                    >
                                      <FontAwesomeIcon
                                        icon={faEye}
                                        style={{
                                          color: showConfirmPassword
                                            ? "black"
                                            : "grey",
                                        }}
                                      />
                                    </i>
                                    <label htmlFor="confirm_password">
                                      Confirm password
                                    </label>
                                    <ErrorMessage
                                      name="confirm_password"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="primary"
                          className="w-100 mt-4"
                          loading={isLoading}
                          disabled={!(dirty && isValid)}
                        >
                          Reset password
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

export default ResetPassword;
