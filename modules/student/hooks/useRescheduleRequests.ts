import { api } from "api";
import { useQuery } from "react-query";

const useRescheduleRequests = () => {
  return useQuery("rescheduleRequests", async () => {
    const { data } = await api.get("/student/booking/rescheduled");
    return data.result;
  });
};

export default useRescheduleRequests;
