import useChangeRescheduleRequestStatus from "@/student/hooks/useChangeRescheduleRequestStatus";
import { v2api } from "api";
import moment from "moment";
import { Router, useRouter } from "next/router";
import { toast } from "react-toastify";

interface RescheduleRequestProps {
  rescheduleRequest: any;
}

const RescheduleRequest: React.FC<RescheduleRequestProps> = ({
  rescheduleRequest,
}) => {
  const { mutate } = useChangeRescheduleRequestStatus();

  const router = useRouter();
  console.log(rescheduleRequest);

  interface UpdateStatusResponse {
    success: boolean;
    message: string;
    data?: any;
  }

  const updateStatus = async (
    status: "accepted" | "rejected"
  ): Promise<UpdateStatusResponse> => {
    const response = await v2api.put<UpdateStatusResponse>(
      `/user/classes/bookings/reschedule/${rescheduleRequest.id}?status=${status}`
    );
    return response.data;
  };

  const handleAccept = async () => {
    await updateStatus("accepted");
    toast.success("Reschedule request accpeted successfully");
    router.reload();
  };

  const handleReject = async () => {
    await updateStatus("rejected");
    toast.success("Reschedule request rejected successfully");
    router.reload();
  };

  return (
    <>
      <div className="col-lg-4 mb-4 p-2">
        <div className="reschedule-request__card align-items-start">
          <div
            className="me-2 class-img-box rounded-3"
            style={{ width: "23%" }}
          >
            <img
              src={
                rescheduleRequest?.booking?.tutor?.imageUrl ||
                "/image/tutor.png"
              }
              height="auto"
              width="100%"
              className="rounded-3 overflow-hidden"
            />
          </div>
          <div className="flex-grow-1">
            <div className="Student__my-class__name">
              {rescheduleRequest?.booking?.tutor?.fullName}
            </div>
            <div>
              Proposed Date &nbsp;
              {moment(new Date(rescheduleRequest?.proposedDateTime)).format(
                "hh:mm a DD/MM/YYYY"
              )}
            </div>
            <div className="d-flex justify-content-between align-items-start mb-1 time-sub-box">
              <div>
                Previous Date &nbsp;
                {moment(new Date(rescheduleRequest?.booking?.startTime)).format(
                  "hh:mm a DD/MM/YYYY"
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="button--pending btn-accept btn-sm"
                onClick={handleAccept}
              >
                Accept
              </button>
              <button
                className="button--rejected btn-sm ms-3 btn-reject"
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
