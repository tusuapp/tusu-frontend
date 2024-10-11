import { api } from "api";
import { useQuery } from "react-query";

const useTutorSlots = () => {
  return useQuery("tutorSlots", async () => {
    const { data } = await api.get("/tutor/get-tutor-slots");
    return data.result;
  });
};

export default useTutorSlots;
