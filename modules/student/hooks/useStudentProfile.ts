import { api, v2api } from "api";
import { useQuery } from "react-query";

const useStudentProfile = () => {
  return useQuery("studentProfile", async () => {
    const { data } = await v2api.get("/auth/user");
    return data;
  });
};

export default useStudentProfile;
