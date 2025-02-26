import { api } from "api";
import { useQuery } from "react-query";

const useTutorSlots = (date: string) => {
  return useQuery(["tutorSlots", date], async () => {
    const { data } = await api.get(`/tutor/get-tutor-slots?date=${date}`);
    return data.result;
  });
};

// module.exports = {
//   useTutorSlotsWithDate,
// };

export default useTutorSlots;
