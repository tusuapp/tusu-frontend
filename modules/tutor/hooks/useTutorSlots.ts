import { api, v2api } from "api";
import { useQuery } from "react-query";

const useTutorSlots = (date: string) => {
  return useQuery(["tutorSlots", date], async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const { data } = await v2api.get(
      `/slots?date=${date}&tutorId=${currentUser.user.id}`
    );
    return data;
  });
};

// module.exports = {
//   useTutorSlotsWithDate,
// };

export default useTutorSlots;
