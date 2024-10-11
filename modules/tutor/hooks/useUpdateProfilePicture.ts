import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const updateProfilePicture = async (schedule: any, setImageId: any) => {
  const { data } = await api.post("/app/upload-auth-profile", schedule);
  setImageId(data?.result?.id)
  return data.result;
};

const useUpdateProfiePicture = (setImageId: any) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => updateProfilePicture(data, setImageId), {
    onSuccess: () => {
      toast.success("Profile picture changed successfully");
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

export default useUpdateProfiePicture;
