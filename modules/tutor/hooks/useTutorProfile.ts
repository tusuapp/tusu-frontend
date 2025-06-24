import { api, v2api } from "api";
import { useQuery } from "react-query";

const useTutorProfile = () => {
  return useQuery("tutorProfile", async () => {
    const { data } = await v2api.get("/user/profile/tutor");
    return data;
  });
};

export default useTutorProfile;
