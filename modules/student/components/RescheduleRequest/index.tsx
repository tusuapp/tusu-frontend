import useChangeRescheduleRequestStatus from "@/student/hooks/useChangeRescheduleRequestStatus";
import { toast } from "react-toastify";

interface RescheduleRequestProps {
  id: string;
  image: string;
  name: string;
  subject: string;
  old_schedule: any;
  new_schedule: any;
  old_booking: any;
}

const RescheduleRequest: React.FC<RescheduleRequestProps> = ({
  id,
  image,
  name,
  subject,
  old_schedule,
  new_schedule,
  old_booking,
}) => {
  const { mutate } = useChangeRescheduleRequestStatus();

  const handleAccept = () => {
    mutate(
      { id, status: "accept", notes: "" },
      {
        onSuccess: () => {
          toast.success("Reschedule request accpeted successfully");
        },
      }
    );
  };

  const handleReject = () => {
    mutate(
      { id, status: "reject", notes: "" },
      {
        onSuccess: () => {
          toast.success("Reschedule request rejected successfully");
        },
      }
    );
  };

  return (
    <>


      <div className="col-lg-4 mb-4 p-2">
        <div className="reschedule-request__card align-items-start">
          <div className="me-2 class-img-box rounded-3" style={{width: "23%"}}>
            <img src={image} height="auto" width="100%" className="rounded-3 overflow-hidden" />
            </div>
            <div className="flex-grow-1">
            <div className="Student__my-class__name">
              {name}
              </div>
              <div className ="d-flex justify-content-between align-items-start mb-1 time-sub-box">
                <div>{subject}</div>
           
          <div>
          Fo: {old_booking.date}
          {" | "}
          {old_booking.start_time} - {old_booking.end_time}
          <br />
          To: {new_schedule.date} | {new_schedule.start_time} -
          {new_schedule.end_time}
          {/* <div>View note</div> */}
          </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="button--pending btn-sm" onClick={handleAccept}>
              Accept
            </button>
            <button
              className="button--rejected btn-sm ms-3"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default RescheduleRequest;
