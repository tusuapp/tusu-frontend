import { api } from "api";
import { useQuery } from "react-query";

const useTutorProfile = () => {
  return useQuery("tutorProfile", async () => {
    const { data } = await api.get("/tutor/profile");
    return data.result;
  });
};

export default useTutorProfile;
