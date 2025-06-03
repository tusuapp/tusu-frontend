import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputText from "../../modules/auth/components/InputText";
import AuthContainer from "../../modules/auth/components/AuthContainer";
import Button from "../../components/button";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signIn, selectAuth } from "../../features/auth/authSlice";
import { appendInputError } from "../../utils";
import { isEmailVerfied } from "../../utils";
import Router from "next/router";
import Link from "next/link";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { user } = useSelector(selectAuth);

  useEffect(() => {
    if (!user) return;

    if (!isEmailVerfied(user)) {
      Router.replace("/accounts/verify-email");
      return;
    }

    Router.replace("/student");
  }, [user]);

  const dispatch = useDispatch<any>();
  const [disableButton, setDisableButton] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  // const [disableButton, setDisableButton] = useState(true);

  const handleFormSubmit = async (data: any) => {
    const newData = {
      identifier: data.email,
      password: data.password,
    };

    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    setIsLoading(true);

    dispatch(signIn(newData, "student"))
      .then((res: any) => {
        console.log(res);
        Router.replace("/student");
      })
      .catch((error: any) => {
        appendInputError("email", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <AuthContainer title="Sign In">
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, handleChange, errors, touched, isValid, dirty }) => (
            <Form className="sign-in-form">
              <InputText
                error={errors.email}
                type="email"
                name="email"
                label="email"
                placeholder="Email Id"
                onChange={handleChange}
                value={values.email}
              />

              <InputText
                error={errors.password}
                type="password"
                name="password"
                label="password"
                top={40}
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />

              <div className="mb-5 mt-3 d-flex justify-content-end">
                <Link href="/accounts/forgot-password">
                  <a
                    className="text-decoration-none text-dark text-uppercase"
                    style={{ color: "#373A40", fontSize: "12px" }}
                  >
                    Forgot password?
                  </a>
                </Link>
              </div>

              <div style={{ marginTop: 25 }}>
                <Button
                  height={50}
                  style={{
                    boxShadow: "0px 15px 30px #92478159",
                    fontSize: "18px",
                    borderRadius: "12px",
                  }}
                  type="primary"
                  className="w-100 mt-4"
                  loading={isLoading}
                  disabled={!((dirty && isValid) || disableButton)}
                >
                  Sign In
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </AuthContainer>
    </>
  );
};

export default SignIn;
