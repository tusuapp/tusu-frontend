import { api } from "api";
import { useQuery } from "react-query";

const fetchScheduledClasses = async (date: any) => {
  const { data } = await api.get(`/tutor/class-schedules?date=${date}`);

  return data.result;
};

export const useScheduledClasses = (date: any) => {
  return useQuery(["tutorSlotsByDate", date], () =>
    fetchScheduledClasses(date)
  );
};

export default useScheduledClasses;
