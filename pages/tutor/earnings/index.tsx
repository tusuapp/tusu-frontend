import Filter from "../../../components/filter";
import TutorDashboardLayout from "layouts/TutorDashboard";
import EarningsChart from "@/tutor/components/EarningsChart";
import useEarnings from "@/tutor/hooks/useEarnings";
import useEarningsHistory from "@/tutor/hooks/useEarningsHistory";
import {useEffect, useState} from "react";
import moment from "moment";
import {fetch} from "../../../api";

function Earnings() {
    const [filter, setFilter] = useState("all");
    const [dashData, setDashData] = useState({chartData: [], total: 0, help: {}})

    const earnings = useEarnings(filter);

    const earningsHistory = useEarningsHistory();

    useEffect(() => {

        (async () => {
            try {
                let token = localStorage.getItem("accessToken") || ""
                const response = await fetch(token).get("/tutor/dashboard/chart?filter=" + filter); // all,week,month,year

                if (response && response.data && response.data.result)
                    setDashData(response.data.result)
                console.log(response.data.result)
            } catch (e: any) {
                return console.log(e.message);
            }
        })()
    }, [filter])

    return (
        <>
            <TutorDashboardLayout>
                <div className="row">
                    <div className="col-lg-7">
                        <h2 className="tutor__dashboard__title">My Earnings</h2>

                        <Filter
                            options={null}
                            onChange={(value: any) => setFilter(value.value)}
                        />
                        <div className="total-earnings">
                            <div className="title">Your total earnings</div>
                            <div className="earnings">
                                {earnings?.data?.currency}
                                {dashData.total}
                            </div>
                        </div>
                        <EarningsChart data={dashData} filter={filter}/>
                    </div>
                    <div className="col-lg-5">
                        <h4 className="mb-3" style={{color: "#924781", fontSize: "16px"}}>
                            Detailed Summary
                        </h4>
                        <div className="transaction-summaries">
                            {/* {JSON.stringify(earningsHistory.data)} */}
                            {earningsHistory &&
                            earningsHistory?.data?.data?.map(
                                (transaction: any, index: number) => (
                                    <div className="transaction-item" key={index}>
                                        <div className="d-flex justify-content-between  align-items-center">
                                            <div>
                                                <div className="title" style={{color: "#000"}}>
                                                    {transaction.description}
                                                </div>
                                                <div style={{color: "#6D6A6A"}}>
                                                    {moment(transaction?.created_at).format(
                                                        "DD/MM/YYYY"
                                                    )}
                                                </div>
                                            </div>
                                            <div className="title">
                                                {transaction.amount < 0 ? (
                                                    <span style={{color: "red"}}>
                              {`-${earnings?.data?.currency}${Math.abs(
                                  transaction.amount
                              )}`}
                            </span>
                                                ) : (
                                                    <>
                              <span
                                  style={{color: "green"}}
                              >{`${earnings?.data?.currency}${transaction.amount}`}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="title">{transaction.date}</div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </TutorDashboardLayout>
        </>
    );
}

export default Earnings;
