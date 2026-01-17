import { v2api } from "api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { PayoutCreationDto, PayoutRequest } from "../../../models/PayoutRequest";
import { toast } from "react-toastify";

export const usePayouts = () => {
  return useQuery<PayoutRequest[], Error>("tutorPayouts", async () => {
    const { data } = await v2api.get("/tutor/payouts");
    return data;
  });
};

export const useRequestPayout = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (payoutData: PayoutCreationDto) => {
      const { data } = await v2api.post("/tutor/payouts/request", payoutData);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tutorPayouts");
        toast.success("Payout requested successfully");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to request payout");
      },
    }
  );
};
