import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const sendMessage = async (booking: any) => {
  const { id, message } = booking;

  const { data } = await api.post(`/chat/request-chat/send/${id}`, {
    message,
  });

  return data.result;
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => sendMessage(data), {
    onMutate: async () => {
      await queryClient.cancelQueries("tutorChatHistory");
    },

    // If the mutation fails, use the context returned from onMutate to roll back

    onError: async (err: any, newTodo, context: any) => {
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

      queryClient.setQueryData("tutorChatHistory", context.previousTodos);
    },

    // Always refetch after error or success:

    onSettled: () => {
      queryClient.invalidateQueries("tutorChatHistory");
    },
  });
};

export default useSendMessage;
