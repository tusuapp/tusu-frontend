import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Router from "next/router";
import { selectAuth, signUp, signUpTutor } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { faEye, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { isEmailVerfied, isProfileCompleted } from "../../utils";
import Link from "next/link";
import LoginGoogle from "modules/auth/components/SocialMediaLinks/Google";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { timezones } from "consts/timezones";
import { useQuery } from "react-query";
import { api } from "api";

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;
// const emailAddresses = [(data?.user?.email)];
const SignUpSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Name is required")
    .matches(/[a-zA-z][a-zA-Z\s]*/, "Please enter valid name"),

  email: Yup.string().email().required("Email is required"),
  // .notOneOf(emailAddresses, "Email already taken!"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(6, "Phone number must be between 6 and 15 digits")
    .max(15, "Phone number must be between 6 and 15 digits"),

  password: Yup.string()
    .required("Password is required")
    .matches(lowercaseRegex, "One lowercase required")
    .matches(uppercaseRegex, "One uppercase required")
    .matches(numericRegex, "One number required")
    .matches(specialCharRegex, "One special character required")
    .min(6, "The password must be at least 6 characters"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Enter the pasword again"),

  timezone: Yup.string()
    .typeError("Ivalid format")
    .required("Timezone is required"),
});

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    if (!isEmailVerfied(user)) {
      Router.replace("/accounts/verify-email");
      return;
    }

    Router.replace("/student");

    return;
  }, [user]);

  const initialValues = {
    email: "",
    phone: "",
    full_name: "",
    password: "",
    confirm_password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [value, setValue] = useState<any>("");

  const customStyles = {
    control: (provided: any, state: any) => {
      const border = state.isFocused
        ? "1px solid #671A5629"
        : "1px solid #671A5629";

      return {
        ...provided,
        border,
        borderRadius: "16px",
        padding: "2px 10px",
        outline: "none",
        maxHeight: "50px",
        overflow: "hidden",
      };
    },

    valueContainer: (provided: any) => ({
      ...provided,
      "flex-wrap": "nowrap",
      "white-space": "nowrap",
      overflow: "hidden",
      "text-overflow": "ellipsis",
    }),
  };

  const allCountries = useQuery("allCountries", () =>
    api.get("/countries").then((res) => res.data)
  );

  interface TimeZoneOptions {
    label: String;
    value: String;
  }

  const timezoneOptions: TimeZoneOptions[] = [];

  timezones.map((timezone) => {
    timezoneOptions.push({ label: timezone, value: timezone });
  });

  const [countryCode, setCountryCode] = useState<number>();

  const handleFormSubmit = async (data: any) => {
    const newData = {
      ...data,
      country_id: 1,
      timezone: "Asia/Kolkata",
      prefix: countryCode,
      callback_url: `${process.env.NEXT_PUBLIC_FRONTEND_HOME}/accounts/activate-email`,
    };

    setIsLoading(true);
    await dispatch(signUp(newData, "student"));
    setIsLoading(false);
  };
  const togglePasswordVisiblity = () => {
    setShowPassword((state) => !state);
  };
  const toggleConfirmPasswordVisiblity = () => {
    setShowConfirmPassword((state) => !state);
  };

  return (
    <>
      <Head>
        <title>Register as a new Tutor | Tusu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />

      <div className="auth-container">
        <div className="container">
          <div className="auth-container-inner d-flex justify-content-center align-content-center h-100 flex-column">
            <div className="row align-content-center">
              <div className="col-md-7 col-lg-7 col-xs-12">
                <img
                  src="/image/signup.png"
                  className="image-fluid pl-5 w-100"
                  alt=""
                  width="auto"
                />
              </div>
              <div className="col-md-12 mt-md-5 mt-lg-0 col-lg-5 col-xs-12">
                <div className="card bg-white sign-up-form">
                  <div className="auth-page__title">Sign Up</div>
                  <br />
                  <Formik
                    initialValues={initialValues}
                    validationSchema={SignUpSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {(formik) => {
                      const { errors, touched, isValid, dirty } = formik;
                      return (
                        <Form className="sign-in-form">
                          <div className="d-flex">
                            <div className="form-field-icon me-3">
                              <img
                                src="/icons/name.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating mb-3">
                                <Field
                                  type="text"
                                  name="full_name"
                                  id="full_name"
                                  className={
                                    errors.full_name && touched.full_name
                                      ? "form-control input-error"
                                      : "form-control"
                                  }
                                />
                                <label htmlFor="full_name">Full name</label>
                                <ErrorMessage
                                  name="full_name"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex">
                            <div className="form-field-icon  me-3">
                              <img
                                src="/icons/email.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating mb-3">
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

                          <div className="d-flex">
                            <div className="form-field-icon  me-3">
                              <PhoneInTalkOutlinedIcon />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating mb-3">
                                <Field
                                  name="phone"
                                  id="phone"
                                  className={
                                    errors.phone && touched.phone
                                      ? "form-control input-error"
                                      : "form-control"
                                  }
                                >
                                  {({
                                    field,
                                    form: { setFieldValue },
                                  }: any) => (
                                    <div className="mb-3">
                                      <PhoneInput
                                        country={"us"}
                                        value={field.value}
                                        onChange={(val, country: any) => {
                                          setFieldValue(field.name, val);
                                          setCountryCode(country?.dialCode);
                                        }}
                                        onBlur={field.onBlur}
                                        inputStyle={{
                                          width: "100%",
                                          border: 0,
                                          borderBottom: "1px solid #ddd",
                                          borderRadius: "16px",
                                        }}
                                        buttonStyle={{
                                          borderTopLeftRadius: "16px",
                                          borderBottomLeftRadius: "16px",
                                          border: 0,
                                          backgroundColor: "#fff",
                                        }}
                                        inputProps={{
                                          name: field.name,
                                        }}
                                        specialLabel="phone"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="phone"
                                  component="span"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="d-flex">
                            <div className="form-field-icon  me-3">
                              <img
                                src="/icons/password.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating mb-3">
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
                          <div className="d-flex">
                            <div className="form-field-icon  me-3">
                              <img
                                src="/icons/password.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating mb-3">
                                <Field
                                  type={
                                    showConfirmPassword ? "text" : "password"
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

                          <div className="d-flex">
                            <div className="form-field-icon  me-3">
                              <PublicOutlinedIcon />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating mb-3">
                                <Field name="timezone">
                                  {({
                                    field,
                                    form: {
                                      touched,
                                      setFieldValue,
                                      setTouched,
                                    },
                                  }: any) => (
                                    <div className="mb-3">
                                      <Select
                                        instanceId="timezone-select"
                                        options={timezoneOptions}
                                        styles={customStyles}
                                        placeholder="Choose timezone"
                                        // isLoading={isFetching}
                                        onChange={(option) =>
                                          setFieldValue(
                                            field.name,
                                            (option as any).value
                                          )
                                        }
                                        onBlur={() =>
                                          setTouched({
                                            ...touched,
                                            [field.name]: true,
                                          })
                                        }
                                        menuPlacement="top"
                                      />
                                    </div>
                                  )}
                                </Field>
                                <ErrorMessage
                                  name="timezone"
                                  component="div"
                                  className="error"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="acceptTerms">
                            <input type="checkbox" />
                            <p>I have read and accept <Link href="/student/terms-and-condition">Terms and Conditions</Link></p>
                          </div>

                          <Button
                            type="primary"
                            className="w-100 mt-4"
                            loading={isLoading}
                            disabled={!(dirty && isValid)}
                          >
                            Sign Up
                          </Button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="d-lg-flex d-block justify-content-lg-between justify-content-center align-items-center mt-5 text-center">
              <div style={{ color: "#515259", fontSize: "18px" }}>
                Already have an account?{" "}
                <Link href="/signin">
                  <a
                    href="/signin"
                    style={{
                      color: "#924781",
                    }}
                  >
                    Sign in
                  </a>
                </Link>
              </div>

              {/* <div className="t-btn-group d-lg-flex align-items-center">
                
                  <LoginGoogle /> */}

                  {/* Sign in with Google */}

                {/* <div className="btn btn-social-auth facebook me-3">
                  <img src="/icons/facebook-icon.svg" className="me-2" /> Sign
                  in with Facebook
                </div>
                <div className="btn btn-social-auth apple">
                  <img src="/icons/apple-icon.svg" className="me-2" />
                  Sign in with Apple
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
