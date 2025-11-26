import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import Button from "components/button";
import Header from "components/header";
import { selectAuth, signUpTutor } from "features/auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import LoginGoogle from "modules/auth/components/SocialMediaLinks/Google";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const rePhoneNumber =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const lowercaseRegex = /(?=.*[a-z])/;
const uppercaseRegex = /(?=.*[A-Z])/;
const numericRegex = /(?=.*[0-9])/;
const specialCharRegex = /(?=.*[!@#$%^&*])/;

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Name is required")
    .matches(/[a-zA-z][a-zA-Z\s]*/, "Please enter valid name"),

  email: Yup.string().email().required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(6, "Phone number must be between 6 and 15 digits")
    .max(15, "Phone number must be between 6 and 15 digits"),
  // .matches(rePhoneNumber, "Phone number is not valid")

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
});

const SignUpPage = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [isTnCAccepted, setIsTnCAccepted] = useState(false);

  const [countryCode, setCountryCode] = useState<number>();

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const initialValues = {
    email: "",
    phone: "",
    fullName: "",
    password: "",
    confirm_password: "",
  };

  const handleFormSubmit = async (data: any) => {
    const newData = {
      ...data,
      country_id: 1,
      callback_url: `${process.env.NEXT_PUBLIC_FRONTEND_HOME}/tutor/activate-email`,
    };

    setIsLoading(true);

    const response = await dispatch(signUpTutor(newData));
    setIsLoading(false);

    if (response.status === 200) {
      Router.push(
        `/accounts/verify-otp?session=${response.data.sessionId}&type=tutor`
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
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
              <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-center text-center">
                <div className="p-4">
                  <img
                    src="/image/signup.png"
                    className="img-fluid"
                    alt="Tusu icon"
                    style={{ maxWidth: "50%", height: "auto" }}
                  />

                  <div className="mt-5 px-5">
                    <h1 className="display-6 fw-bold ">
                      Learn, Connect, Grow.
                    </h1>
                    <p className="lead text-muted mt-3">
                      Join our global network of tutors and students. Signing up
                      takes just a minute!
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mt-md-5 mt-lg-0 col-lg-5 col-xs-12">
                <div className="card bg-white sign-up-form">
                  <div className="auth-page__title">Sign Up</div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={SignUpSchema}
                    onSubmit={handleFormSubmit}
                  >
                    {({ errors, touched, isValid, dirty }) => {
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
                                  name="fullName"
                                  id="fullName"
                                  className={
                                    errors.fullName && touched.fullName
                                      ? "form-control input-error"
                                      : "form-control"
                                  }
                                />
                                <label htmlFor="fullName">Full name</label>
                                <ErrorMessage
                                  name="fullName"
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
                                        country={"in"}
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

                          <div className="d-flex mb-3 align-items-center">
                            <div className="form-field-icon  me-3">
                              <img
                                src="/icons/password.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="form-floating">
                                <div className="d-flex">
                                  <div className="flex-grow-1">
                                    <div className="form-floating">
                                      <Field
                                        type={
                                          showPassword ? "text" : "password"
                                        }
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
                          <div className="d-flex mb-3 align-items-center">
                            <div className="form-field-icon  me-3">
                              <img
                                src="/icons/password.svg"
                                height="23px"
                                width="23px"
                              />
                            </div>
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

                          <div className="acceptTerms">
                            <input
                              type="checkbox"
                              checked={isTnCAccepted}
                              onChange={(value) => {
                                setIsTnCAccepted(value.target.checked);
                              }}
                            />
                            <p>
                              I have read and accept{" "}
                              <Link href="/student/terms-and-condition">
                                Terms and Conditions
                              </Link>
                            </p>
                          </div>

                          <Button
                            type="primary"
                            className="w-100 mt-4"
                            loading={isLoading}
                            disabled={!(dirty && isValid) || !isTnCAccepted}
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
              <div
                style={{
                  color: "#515259",
                  fontSize: "16px",
                  marginBottom: "5px",
                }}
              >
                Already have an account?{" "}
                <Link href="/signin/tutor">
                  <a
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

              {/* <div className="btn btn-social-auth facebook me-lg-2">
                  <img src="/icons/facebook-icon.svg" className="me-2" /> Sign
                  in with Facebook
                </div>
                <div className="btn btn-social-auth apple">
                  <img src="/icons/apple-icon.svg" className="me-2" />
                  Sign in with Apple
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
