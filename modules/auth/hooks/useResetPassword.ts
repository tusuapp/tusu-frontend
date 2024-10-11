import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const verifyOtp = async (data: any) => {
  const res = await api.post("/auth/reset-password", data);

  return res.data.result;
};

const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => verifyOtp(data), {
    onSuccess: async () => {
      toast.success("Password reset successfully");
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

export default useResetPassword;
