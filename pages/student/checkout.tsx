import Header from "../../components/header";
import Container from "../../components/container";
import Footer from "../../components/footer";
import Head from "next/head";
import { api, v2api } from "../../api";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Button from "../../components/button";
import { arrayToSentence } from "../../utils";
import { toast } from "react-toastify";
import useCreditPoints from "@/student/hooks/useCreditPoints";
import moment from "moment";

const makePayment = async (
  cartId: any,
  notes: string,
  isCreditPoint = false
) => {
  try {
    console.log("cartId", cartId);

    let url = `/user/classes/bookings/pay?bookingId=${cartId}&message=${notes}`;
    const response = await v2api.post(url);
    console.log("response", response.data);
    if (response.data.paid) {
      router.push({
        pathname: "/student/payment/success/",
        query: { credit: "success" },
      });
    } else return response.data.payment_url;

    // return redirect_url;
  } catch (error) {
    toast.error("Failed to confirm payment");

    return false;
  }
};

const Checkout = () => {
  const router = useRouter();
  const creditPoints = useCreditPoints();
  const { query } = router;

  const [cartDetails, setCartDetails] = useState<any>(null);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [isTermsAgreed, setisTermsAgreed] = useState("");
  const [isCreditPoint, setIsCreditPoint] = useState(false);
  const [payNowButttonLoading, setPayNowButtonLoading] = useState<any>(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchCartDetails(query.id);
    getOurTutors();
  }, [query]);

  const handlePayNow = async () => {
    setPayNowButtonLoading(true);
    console.log("cartDetails", cartDetails);

    const res = await makePayment(
      cartDetails.id,
      additionalNotes,
      isCreditPoint
    );

    if (res) {
      router.push(res);
    }

    setPayNowButtonLoading(false);
  };

  const fetchSubjectDetails = async (subjectId: number | string) => {
    try {
      const response = await v2api.get(`/subjects/${subjectId}`);
      console.log("Subject details", response.data);

      setCartDetails((prev: any) => ({
        ...prev,
        subject: response.data.name,
      }));
    } catch (error) {
      console.error("Failed to fetch subject details:", error);
    }
  };

  const fetchCartDetails = (cartId: any) => {
    v2api
      .get(`/user/classes/bookings/${cartId}`)
      .then((response) => {
        console.log("Cart deatils", response.data);
        setCartDetails(response.data);
        fetchSubjectDetails(response.data.subjectId);
      })
      .catch(() => {
        return null;
      });
  };

  const getOurTutors = async () => {
    try {
      const { data } = await api.get("/student/tutors?type=all-tutors");
      setGetTutors(data.result);
      return data.result;
    } catch (e) {}
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Container>
        {cartDetails && (
          <>
            <div className="inner-contaner">
              <br />
              <br />

              <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-10">
                  <div
                    style={{
                      color: "#222222",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    You are booking{" "}
                    {/* {tutorDetails?.gender == "Male" ? "Mr. " : "Miss. "} */}
                    {cartDetails?.tutor?.fullName}
                  </div>
                  {/* <code>{JSON.stringify(cartDetails)}</code> */}
                  <br />
                  <div className="Checkout-card">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="">
                          <div className="row">
                            <div>
                              <div className="d-flex ml-5 w-100 flex-grow-1">
                                <div className="flex-shrink-0">
                                  <img
                                    src={
                                      cartDetails?.tutor?.imageUrl ||
                                      "/image/tutorprofileimage.png"
                                    }
                                    alt="..."
                                    height={80}
                                    width={80}
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3 w-50">
                                  <h3 className="small-header m-0">
                                    {cartDetails?.tutor?.fullName}
                                  </h3>
                                  <p className="mb-0">
                                    <span style={{ color: "#8A959ECC" }}>
                                      Subject:
                                    </span>{" "}
                                    {cartDetails?.subject}
                                  </p>
                                  <p className="mb-0">
                                    <span style={{ color: "#8A959ECC" }}>
                                      Hourly Fee:
                                    </span>{" "}
                                    {cartDetails?.currencySymbol ||
                                      "$" + " " + cartDetails?.hourlyFee}
                                  </p>
                                </div>
                              </div>

                              <br />
                              <br />
                            </div>
                          </div>
                          <div className="">
                            <div className="d-flex">
                              {" "}
                              <svg
                                id="_2_"
                                data-name="calendar (2)"
                                xmlns="http://www.w3.org/2000/svg"
                                width="28.926"
                                height="28.926"
                                viewBox="0 0 28.926 28.926"
                              >
                                <path
                                  id="Path_24527"
                                  data-name="Path 24527"
                                  d="M25.2,2.26H22.6V.9a.9.9,0,0,0-1.808,0V2.26H8.136V.9A.9.9,0,1,0,6.328.9V2.26h-2.6A3.733,3.733,0,0,0,0,5.989V25.2a3.733,3.733,0,0,0,3.729,3.729H25.2A3.733,3.733,0,0,0,28.926,25.2V5.989A3.733,3.733,0,0,0,25.2,2.26ZM3.729,4.068h2.6v.9a.9.9,0,0,0,1.808,0v-.9H20.791v.9a.9.9,0,0,0,1.808,0v-.9h2.6a1.923,1.923,0,0,1,1.921,1.921V8.136H1.808V5.989A1.923,1.923,0,0,1,3.729,4.068ZM25.2,27.119H3.729A1.923,1.923,0,0,1,1.808,25.2V9.943H27.119V25.2A1.923,1.923,0,0,1,25.2,27.119Z"
                                  fill="#51bda5"
                                />
                              </svg>
                              <div className="ms-3 w-100">
                                <div className="d-flex justify-content-between">
                                  <div>Chosen day</div>
                                  <div>
                                    {" "}
                                    {moment(
                                      new Date(cartDetails?.startTime)
                                    ).format("YYYY-MM-DD")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <div className="d-flex">
                              <svg
                                id="clock"
                                xmlns="http://www.w3.org/2000/svg"
                                width="27.029"
                                height="27.029"
                                viewBox="0 0 27.029 27.029"
                              >
                                <path
                                  id="Path_24519"
                                  data-name="Path 24519"
                                  d="M24.186,7.112a1.126,1.126,0,0,0-.523,1.5,11.147,11.147,0,0,1,1.115,4.9A11.262,11.262,0,1,1,13.515,2.252a11.127,11.127,0,0,1,6.992,2.43,1.126,1.126,0,1,0,1.4-1.763,13.517,13.517,0,1,0,5.122,10.6,13.377,13.377,0,0,0-1.34-5.879,1.125,1.125,0,0,0-1.5-.523Zm0,0"
                                  transform="translate(0 0)"
                                  fill="#fbb017"
                                />
                                <path
                                  id="Path_24520"
                                  data-name="Path 24520"
                                  d="M177.126,64A1.127,1.127,0,0,0,176,65.126V73.01a1.127,1.127,0,0,0,1.126,1.126h5.631a1.126,1.126,0,0,0,0-2.252h-4.5V65.126A1.127,1.127,0,0,0,177.126,64Zm0,0"
                                  transform="translate(-163.612 -59.495)"
                                  fill="#fbb017"
                                />
                              </svg>
                              <div className="ms-3 w-100">
                                <div className="d-flex justify-content-between">
                                  <div> Chosen schedule Time</div>
                                  <div>
                                    {moment(
                                      new Date(cartDetails?.startTime)
                                    ).format("hh:mm a")}{" "}
                                    -
                                    {moment(
                                      new Date(cartDetails?.endTime)
                                    ).format("hh:mm a")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                          <div
                            style={{ color: "#181818", marginBottom: "7px" }}
                          >
                            Additional Note (If Any)
                          </div>
                          <textarea
                            id="w3review"
                            name="w3review"
                            rows={4}
                            cols={50}
                            onChange={(e) => setAdditionalNotes(e.target.value)}
                          ></textarea>
                          <div className="Checkout-card__accentBg">
                            <div className="d-flex justify-content-between">
                              <div>Booked Hour(s):</div>
                              <div>
                                {cartDetails?.payment_summary?.total_hour || 1}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div>Total</div>
                              <div>
                                1 x {cartDetails?.tutor?.final_amount} ={" "}
                                {cartDetails?.currency_symbol ||
                                  "$" + " " + cartDetails?.totalAmount}
                              </div>
                            </div>
                            <div
                              className="d-flex justify-content-between"
                              style={{
                                color: "#924781",
                                fontSize: "16px",
                                marginTop: "10px",
                                fontWeight: 500,
                              }}
                            >
                              <div> Amount Payable</div>
                              <div>
                                {cartDetails?.currency_symbol ||
                                  "$" + " " + cartDetails?.totalAmount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-1"></div>
                      <div className="col-lg-5">
                        <div className="row justify-content-start">
                          <div>
                            <img
                              src="/image/student_checkout.png"
                              height="100%"
                            />
                          </div>

                          <div className="p-0">
                            <br />
                            <br />
                            <span style={{ color: "#924781", fontWeight: 500 }}>
                              Note:
                            </span>{" "}
                            If the tutor doesn’t accept your request, your
                            amount will be reimbersed to your credit points.
                            <br />
                            <br />
                            <div>
                              <input
                                type="checkbox"
                                id="vehicle1"
                                name="vehicle1"
                                className="me-1"
                                onChange={(value) =>
                                  setisTermsAgreed(value.target.value)
                                }
                              />{" "}
                              I agree to the terms and conditions
                            </div>
                            <div>
                              <input
                                type="checkbox"
                                id="pay-credit"
                                name="pay-credit"
                                className="me-1"
                                checked={!!isCreditPoint}
                                onChange={(value) => {
                                  let cc = !isCreditPoint;
                                  setIsCreditPoint(cc);
                                  console.log(cc);
                                }}
                              />{" "}
                              Pay using credit ({" "}
                              {creditPoints?.data?.credit_points} )
                            </div>
                          </div>

                          <Button
                            type="primary"
                            onClick={handlePayNow}
                            loading={payNowButttonLoading}
                            className="w-75"
                            style={{
                              backgroundColor: "#924781",
                              borderColor: "#924781",
                              paddingTop: "10px",
                            }}
                            disabled={!isTermsAgreed}
                          >
                            Pay now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1"></div>
              </div>
              <br />
              <br />
              <br />
              <br />
            </div>
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default Checkout;
