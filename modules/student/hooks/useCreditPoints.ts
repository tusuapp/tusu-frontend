import { api } from "api";
import { useQuery } from "react-query";

const useCreditPoints = () => {
  return useQuery("creditPoints", async () => {
    const { data } = await api.get("/accounts/cred-points");

    return data.result;
  });
};

export default useCreditPoints;
