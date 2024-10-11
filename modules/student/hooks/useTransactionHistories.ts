import { api } from "api";
import { useQuery } from "react-query";

const useTransactionHistories = () => {
  return useQuery("creditPointTransactionHistories", async () => {
    const { data } = await api.get("/accounts/cred-points-transactions");
    return data.result;
  });
};

export default useTransactionHistories;
