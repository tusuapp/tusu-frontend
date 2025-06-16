import Header from "../../../components/header";
import Container from "../../../components/container";
import Link from "next/link";
import Button from "../../../components/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api, v2api } from "../../../api";
import Image from "next/image";
import PaymentSuccesssPic from "public/image/payment-success.svg";

function PaymentSuccesss() {
  const [status, setStatus] = useState("loading");

  // const router = useRouter();

  const { query } = useRouter();

  // const { session, credit } = query;

  const { session_id, resources, credit } = query;
  const url = "payments/stripe/complete?sessionID=" + session_id;
  useEffect(() => {
    if (credit) {
      setStatus("success");
    }
    if (!session_id) return;
    // if (creditSession === "success") setStatus("success");
    v2api
      .post(url)
      .then(() => {
        setStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("failed");
      });
  }, [session_id]);

  return (
    <>
      <Header title="Payment success" />
      <Container>
        <div className="Payment__success__page">
          <div className="containe">
            <div className="mb-5" style={{ height: "40vh" }}>
              <img
                src="/image/payment-success.svg"
                alt="Payment success image"
                height="100%"
                width="100%"
              />
            </div>
            <div className="d-flex flex-column justify-content-center payment-description">
              <h3 className="payment-heading text-center">
                Payment {status === "success" && " successful"}
                {status === "failed" && " failed"}
                {status === "loading" && " loading"}
              </h3>
              <br />

              <p className="payment-message text-center">
                Wait for the booked tutor to confirm your booking.
              </p>
              <div className="text-center">
                <Link href="/student">
                  <Button type="primary">Go to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PaymentSuccesss;
