import EarningsChart from "@/tutor/components/EarningsChart";
import TutorDashboardLayout from "layouts/TutorDashboard";
import BookingRequestCard from "modules/tutor/components/BookingRequestCard";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Filter from "../../components/filter";
import TutorClass from "../../components/tutorClass";
import {
    fetchDashboard, getEarnings,
    selectTutorDashboard,
} from "../../features/tutorDashboard/tutorDashboardSlice";
import withAuth from "../../HOC/withAuth";
import {api, fetch} from "../../api";
import useBookingRequests from "@/tutor/hooks/useBookingRequests";

function TutorDashboard() {
    const dispatch = useDispatch();
    const dashboard = useSelector(selectTutorDashboard);
    const { data, error, isFetching, isLoading, isError } = useBookingRequests();
    const [dashData, setDashData] = useState({chartData: [], total: 0, help: {}})
    const [filter, setFilter] = useState("all")

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


    useEffect(() => {
        dispatch(fetchDashboard());
    }, []);

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
                            <div
                                className="earnings">${`${dashData.total}`}</div>
                        </div>
                        <EarningsChart data={dashData} filter={filter} />
                    </div>
                    <div className="col-lg-5">
                        <h2 className="tutor__dashboard__title mb-4">Booking requests</h2>
                        <div
                            className="booking-requests-notification mb-3 d-flex justify-content-between"
                            style={{backgroundColor: "#924781"}}
                        >
              <span>
                {dashboard?.dashboard?.booking_request?.count} new bookings{" "}
              </span>
                            <span>
                <Link href="/tutor/booking-requests">
                  <a> View all</a>
                </Link>
              </span>
                        </div>
                        {data && data?.booking_request?.booking?.length === 0 && (
                            <div className="mb-3">
                                You don't have any new booking requests
                            </div>
                        )}
                        {data && data?.booking_request?.booking?.map(
                            (booking: any) => (
                                <BookingRequestCard
                                    id={booking.id}
                                    name={booking.student.fullname}
                                    subject={booking.subject}
                                    amount={booking.order.amount}
                                    date={booking.schedule?.date}
                                    startTime={booking.schedule?.start_time}
                                    endTime={booking.schedule?.end_time}
                                />
                            )
                        )}
                        <h4 style={{fontSize: "22px"}} className="mb-3">
                            Bookings
                        </h4>
                        {dashboard?.dashboard?.my_bookings.map((booking: any) => (
                            <div className="mb-3">
                                <TutorClass
                                    id={booking.id}
                                    name={booking.student.fullname}
                                    image={booking.student.image}
                                    subject={booking.subject}
                                    scheduleInfo={booking.schedule}
                                    status={booking.status}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </TutorDashboardLayout>
        </>
    );
}

export default withAuth(TutorDashboard);
