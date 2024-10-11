import { api } from "api";
import { useQuery } from "react-query";

const useCreditTransactions = () => {
  return useQuery("credPointsTransactions", async () => {
    const { data } = await api.get("/accounts/cred-points-transactions");
    return data.result;
  });
};

export default useCreditTransactions;
