import { api, v2api } from "api";
import { useQuery } from "react-query";

const fetchScheduledClasses = async (date: any) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const { data } = await v2api.get(
    `/slots?date=${date}&tutorId=${currentUser.user.id}`
  );
  return data;
};

export const useScheduledClasses = (date: any) => {
  return useQuery(["tutorSlotsByDate", date], () =>
    fetchScheduledClasses(date)
  );
};

export default useScheduledClasses;
