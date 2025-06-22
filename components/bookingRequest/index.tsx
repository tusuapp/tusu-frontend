import React from "react";
import { toast } from "react-toastify";
import { api, v2api } from "../../api";

interface BookingRequestProps {
  id?: any;
  name?: any;
  subject?: any;
  amount?: any;
  date?: any;
  startTime?: any;
  endTime?: any;
  onChange?: any;
}

const BookingRequest: React.FC<BookingRequestProps> = ({
  id,
  name,
  subject,
  amount,
  date,
  startTime,
  endTime,
  onChange,
}) => {
  const handleAccept = (id: number) => {
    v2api
      .put("/user/classes/bookings/status", {
        status: "accepted",
        bookingId: id,
      })
      .then(() => {
        toast.success("Booking accepted successfully.");
        onChange();
      })
      .catch((error) => {
        toast.error("Falied to change the booking status.");
        onChange();
        console.log(error);
      });
  };

  const handleReject = (id: number) => {
    v2api
      .put("/user/classes/bookings/status", {
        status: "rejected",
        bookingId: id,
      })
      .then(() => {
        toast.success("Booking has been rejected.");
        onChange();
      })
      .catch((error) => {
        toast.error("Falied to change the booking status.");
        onChange();
        console.log(error);
      });
  };

  return (
    <div className="booking-card mb-5">
      {/* <div className="booking-card-content"> */}
      <b>{name}</b> booked you for <b>{subject}</b> class.
      <br />
      asd Payment of <b>${amount}</b> Received.
      <br />
      Schedule : {date}, {startTime} - {endTime}
      <div className="d-flex justify-content-start mt-3">
        <button className="btn-accept me-3" onClick={() => handleAccept(id)}>
          Accept
        </button>
        <button className="btn-reject me-3" onClick={() => handleReject(id)}>
          Reject
        </button>
        <button className="btn-view">View</button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default BookingRequest;
