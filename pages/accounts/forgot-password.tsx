import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";
import Head from "next/head";
import PhoneInput from "react-phone-number-input";
import Button from "../../components/button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useRequestPasswordReset from "modules/auth/hooks/useRequestPasswordReset";
import { useSelector } from "react-redux";
import { selectAuth } from "features/auth/authSlice";
import { v2api } from "api";
import { set } from "react-hook-form";
import { toast } from "react-toastify";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [selected, setSelected] = useState("");
  const { user } = useSelector(selectAuth);
  const initialValues = {
    phone: user?.phone,
    email: user?.email,
  };
  const [value, setValue] = useState();
  const handleFormSubmit = async ({ email }: any) => {
    try {
      setIsLoading(true);
      const response = await v2api.post(`/auth/forgot-password?email=${email}`);
      toast.success(
        "If an account with that email exists, a password reset link has been sent."
      );
      router.push("/signin");
    } catch (error) {
      console.error("Error requesting password reset:", error);
    }
    setIsLoading(false);
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
                <h4 className="sign-in-title text-center">Forgot Password?</h4>
                <br />
                <p className="text-center px-5">
                  {" "}
                  Enter the Email associated with your account to reset your
                  password.
                </p>
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignInSchema}
                  onSubmit={handleFormSubmit}
                >
                  {(formik) => {
                    const { errors, touched, isValid, dirty } = formik;
                    return (
                      <Form className="sign-in-form">
                        <div className="d-flex mb-3 flex-column align-items-center">
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              {/* <ReactFlagsSelect
                                selected={selected}
                                onSelect={(code) => console.log(code)}
                                countries={["US", "GB"]}
                                customLabels={{
                                  US: { primary: "US", secondary: "+1" },
                                  GB: { primary: "GB", secondary: "+44" },
                                }}
                              /> */}
                              {/* <PhoneInput
                                international
                                value={value}
                                onChange={setValue}
                              /> */}
                              {/* <Field
                                type="text"
                                name="phoneNumber"
                                id="email"
                                className={
                                  errors.email && touched.email
                                    ? "form-control input-error"
                                    : "form-control"
                                }
                              /> */}
                              {/* <ErrorMessage
                                name="phoneNumber"
                                component="div"
                                className="error"
                              /> */}
                            </div>
                          </div>{" "}
                          <br />
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
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error"
                          />
                        </div>

                        <Button
                          type="primary"
                          className="w-100 mt-4"
                          loading={isLoading}
                          disabled={!(dirty && isValid)}
                        >
                          RESET PASSWORD
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

export default SignUpPage;
