import { api, v2api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const completeTutorProfile = async (schedule: any) => {
  const { data } = await v2api.put("/user/profile/tutor", schedule);

  return data.result;
};

const useCompleteTutorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => completeTutorProfile(data), {
    // When mutate is called:

    onSuccess: async () => {
      // toast.success("Schedule created successfully");ss
    },

    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)

      await queryClient.cancelQueries("tutorSlots");

      // Snapshot the previous value

      const previousTodos = queryClient.getQueryData("tutorSlots");

      // Optimistically update to the new value

      // queryClient.setQueryData("tutorSlots", (old: any) => [...old, newTodo]);

      // Return a context object with the snapshotted value

      return { previousTodos };
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

      queryClient.setQueryData("tutorSlots", context.previousTodos);
    },

    // Always refetch after error or success:

    onSettled: () => {
      queryClient.invalidateQueries("tutorSlots");
    },
  });
};

export default useCompleteTutorProfile;
