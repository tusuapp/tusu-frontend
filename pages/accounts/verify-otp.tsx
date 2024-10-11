import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../../components/button";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useVerifyOtp, { resendOtp } from "modules/auth/hooks/useVerifyOtp";
import OtpField from "react-otp-field";
import Input from "../../components/@next/atoms/input";
import { api } from "../../api";

const SignInSchema = Yup.object().shape({
  otp: Yup.number().required("OTP is required"),
});

const SignUpPage = () => {
  const { data, mutate, isLoading } = useVerifyOtp();
  const router = useRouter();

  const token = router.query.token;

  const [newToken, setNewToken] = useState("");

  const initialValues = {
    email: "",
  };

  useEffect(() => {
    if (!router.query) return;

    // @ts-ignore
    setNewToken(router.query.token);
  }, [router.query]);

  const [value, setValue] = useState("");
  const [config, setConfig] = useState({
    numInputs: 4,
    otpValue: "",
    separator: " ",
    regex: /^([0-9]{0,})$/,
    isDisabled: false,
    isTypeNumber: false,
    hasErrored: false,
  });
  const handleFormSubmit = async (data: any) => {
    mutate(
      { token: newToken, otp: value },
      {
        onSuccess: (res) => {
          console.log("res", res);

          setTimeout(() => {
            if (router.query.type == "tutor") {
              router.push(`/signin/tutor`);
            } else if (router.query.type == "student") {
              router.push(`/signin/student`);
            } else {
              router.push(`/accounts/reset-password?token=${res.token}`);
            }
          }, 2000);
        },
      }
    );
  };

  const handleResendOtp = async () => {
    let res = await resendOtp({ token: newToken });

    console.log(res);
    if (res && res.token) {
      setNewToken(res.token);
      alert("success");
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
                <h4 className="sign-in-title text-center">OTP verfication</h4>
                <br />
                <p className="text-center px-5">
                Please enter the OTP sent to your mobile number & Check your registered email to verify the account.
                </p>

                <div className="otp col-12 col-sm-4 d-flex justify-content-center align-items-center">
                  <OtpField
                    classNames="otp__field d-flex justify-content-end"
                    value={value}
                    onChange={setValue}
                    numInputs={Number(config.numInputs)}
                    onChangeRegex={config.regex}
                    autoFocus
                    separator={<span>{config.separator}</span>}
                    isTypeNumber={config.isTypeNumber}
                    hasErrored={config.hasErrored}
                    inputProps={{
                      disabled: config.isDisabled,
                    }}
                  />
                </div>
                <Button
                  type="primary"
                  className="w-100 mt-4"
                  loading={isLoading}
                  onClick={handleFormSubmit}
                >
                  Verify OTP
                </Button>

                <div className="text-center pt-4" onClick={handleResendOtp}>
                  Didn't recieve the OTP?&nbsp;
                  <a
                    className="text-decoration-none"
                    href="#"
                    style={{ color: "#924781" }}
                  >
                    Resend
                  </a>
                </div>
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
