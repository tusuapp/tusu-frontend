import { api } from "api";
import { useQuery } from "react-query";

const useStudentProfile = () => {
  return useQuery("studentProfile", async () => {
    const { data } = await api.get("/student/profile");
    return data.result;
  });
};

export default useStudentProfile;
