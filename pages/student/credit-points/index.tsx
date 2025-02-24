import React, { useState } from "react";
import Container from "components/container";
import Head from "next/head";
import StudentDashboardLayout from "layouts/StudentDashboard";
import { api } from "api";
import { useRouter } from "next/router";
import useTransactionHistories from "@/student/hooks/useTransactionHistories";
import useCreditPoints from "@/student/hooks/useCreditPoints";

function CreditPoints() {
  const creditPoints = useCreditPoints();

  const transactionHistories = useTransactionHistories();

  const [count, setCount] = useState(0);
  const router = useRouter();
  let value;

  const handleIncrement = () => {
    value = Number(count) + 1;
    setCount(value);
  };

  const handleDecrement = (e: any) => {
    value = count - 1;
    setCount(value);
  };

  const handleCredit = (e: any) => {
    setCount(e.target.value);
  };

  const handleAddCredits = () => {
    api
      .post("/student/buy/credits", { value: count })
      .then(({ data }) => {
        // console.log(data.result);
        router.push(data.result.checkout_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Tusu - Student | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StudentDashboardLayout>
        <Container>
          <div className="mt-5 mb-5 inner-contaner">
            <div className="row pb-3">
              <div className="col-md-6">
                <h3
                  style={{ fontSize: "18px" }}
                  className="student__page__header__title mb-4"
                >
                  Credit Points
                </h3>
                <div className="card cred-point-main ">
                  <div className="card-body">
                    <div className="bg-dark m-3 cred-point-inner">
                      <div className="d-flex justify-content-between pt-4">
                        <div className="d-flex justify-content-start p-3 ms-3">
                          <div>
                            <h3
                              className="text-white m-0"
                              style={{ fontSize: "28px" }}
                            >
                              {" "}
                              {creditPoints?.data?.credit_points}
                            </h3>
                            <h6
                              className="text-white"
                              style={{
                                fontSize: "18px",
                                fontWeight: "normal",
                              }}
                            >
                              Credit Points
                            </h6>
                          </div>
                        </div>
                        <div className="d-flex justify-content-start p-3 me-3">
                          <div>
                            <p
                              className="font-w600 text-wallet m-0 font-16"
                              style={{ fontWeight: "normal", color: "white" }}
                            >
                              1 Credit ={" "}
                              {`${creditPoints.data?.one_credit_point} 
                              ${creditPoints.data?.default_currency}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center pt-1">
                        <div className="d-flex justify-content-start p-3 ms-3">
                          <div>
                            <button
                              className="d-flex justify-content-start"
                              style={{
                                fontSize: "15px",
                                fontWeight: "normal",
                                backgroundColor: "#ffc720",
                                border: "none",
                                color: "white",
                                borderRadius: "6px",
                                padding: "7px 14px"
                              }}
                              onClick={handleAddCredits}
                            >
                              Add Credits
                            </button>
                          </div>
                        </div>
                        <div className="d-flex p-2 pe-0 me-4">
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <button
                                style={{
                                  backgroundColor: "#212529",
                                  border: "none",
                                  color: "#FBB017",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "inline-block",
                                  width: "50px",
                                  fontWeight: "bold",
                                }}
                                onClick={handleDecrement}
                              >
                                <h4
                                  style={{
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "5px",
                                  }}
                                >
                                  -
                                </h4>
                              </button>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <input
                                  type="text"
                                  className="msger-input"
                                  defaultValue={count}
                                  value={count}
                                  style={{
                                    width: "75px",
                                    fontSize: "18px",
                                    textAlign: "center",
                                    color: "white",
                                    background: "none",
                                    border: "none",
                                  }}
                                  onChange={(e) => handleCredit(e)}
                                />
                              </div>
                              <button
                                style={{
                                  backgroundColor: "#212529",
                                  border: "none",
                                  color: "#FBB017",
                                  textAlign: "center",
                                  textDecoration: "none",
                                  display: "inline-block",
                                  width: "50px",
                                }}
                                onClick={handleIncrement}
                              >
                                <h4
                                  style={{
                                    fontStyle: "normal",
                                    fontWeight: "normal",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingTop: "5px",
                                  }}
                                >
                                  +
                                </h4>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between pb-3">
                        <div className="d-flex justify-content-start p-3 me-5">
                          <span className="text-white">
                            <i
                              className="fa fa-minus text-warning pe-3"
                              style={{ fontSize: "12px" }}
                            />{" "}
                            Value in {creditPoints.data?.default_currency} : ${" "}
                            {count}
                            <i className="fa fa-plus text-warning ps-3" />
                          </span>
                        </div>
                      </div>
                      <div className="text-center bg-brand cred-point-inner2">
                        <button
                          className="btn text-white"
                          onClick={() =>
                            router.push(`/student/credit-transactions`)
                          }
                        >
                          View Transactions
                        </button>
                      </div>
                    </div>
                    <div className="text-center p-1">
                      <img src="/image/TNG_M128_01.png" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6">
                <h3 className="student__page__header__title mb-4">
                  Credit Points Transaction History
                </h3>
                {JSON.stringify(transactionHistories.data)}
                <div className="transaction__history__wrapper">
                  {transactionHistories.data &&
                    transactionHistories.data.map((item: any) => (
                      <div className="w-100 d-flex justify-content-between">
                        <div className="div">
                          {`${item.date} - ${item.notes}`}
                        </div>
                        <div className="div">{`${item.amount}`}</div>
                      </div>
                    ))}
                </div>
              </div> */}
            </div>
          </div>
        </Container>
      </StudentDashboardLayout>
    </>
  );
}

export default CreditPoints;
