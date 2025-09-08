import { api, v2api } from "api";
import { useQuery } from "react-query";

const fetchScheduledClasses = async (date: any) => {
  const { data } = await v2api.get(`/slots?date=${date}`);
  return data;
};

export const useScheduledClasses = (date: any) => {
  return useQuery(["tutorSlotsByDate", date], () =>
    fetchScheduledClasses(date)
  );
};

export default useScheduledClasses;
