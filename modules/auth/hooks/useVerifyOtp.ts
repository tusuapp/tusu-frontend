import { api, setApplicationName, v2api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const verifyOtp = async (session: string, otp: string) => {
  setApplicationName("student");

  const res = await v2api.post(
    `/auth/otp/verify-email?session=${session}&otp=${otp}`
  );

  return res.data.result;
};

export const resendOtp = async (data: any) => {
  setApplicationName("student");

  const res = await api.post("/auth/otp/send", data);

  return res.data.result;
};

const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => verifyOtp(data.session, data.otp), {
    onSuccess: async () => {
      toast.success("OTP verified successfully");
    },

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries("verifyOtp");
    },

    onError: async (err: any) => {
      const errorMessage = err.response.data.message;

      if (
        Object.keys(errorMessage).length === 0 &&
        errorMessage.constructor === Object
      ) {
        toast.error("Empty message from server");
      }

      if (errorMessage) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Unknown error occured");
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries("verifyOtp");
    },
  });
};

export default useVerifyOtp;
