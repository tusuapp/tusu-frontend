import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../../components/header";
import Button from "../../../components/button";
import { v2api } from "api";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { token } = router.query;

  const [status, setStatus] = useState<
    "loading" | "success" | "error" | "idle"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        setStatus("loading");
        const response = await v2api.post(`/auth/verify-email?token=${token}`);

        if (response.status === 200) {
          setStatus("success");
          setMessage("Your email has been successfully verified!");

          setTimeout(() => {
            router.push("/signin"); // redirect after a few seconds
          }, 2500);
        } else {
          throw new Error("Invalid or expired verification link.");
        }
      } catch (error: any) {
        console.error("Email verification failed:", error);
        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "Invalid or expired verification link."
        );
      }
    };

    verifyEmail();
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <h4 className="text-center mb-3">Verifying your email...</h4>
            <div className="text-center mt-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        );

      case "success":
        return (
          <>
            <h4 className="text-center mb-3 text-success">Email Verified!</h4>
            <p className="text-center">{message}</p>
            <div className="text-center mt-4">
              <Button
                type="primary"
                onClick={() => router.push("/signin/student")}
              >
                Go to Login
              </Button>
            </div>
          </>
        );

      case "error":
        return (
          <>
            <h4 className="text-center mb-3 text-danger">
              Verification Failed
            </h4>
            <p className="text-center">{message}</p>
            <div className="text-center mt-4">
              <Button type="primary" onClick={() => router.push("/")}>
                Back to Home
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <title>Email Verification | Tusu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />

      <div className="auth-container">
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div
            className="verify-box p-5 rounded shadow-sm bg-white text-center"
            style={{ maxWidth: "480px", width: "100%" }}
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage;
