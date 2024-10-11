import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { convertErrorsToArray } from "../../../utils";

const updateProfile = async (schedule: any) => {
  const { data } = await api.put("/student/profile", schedule);
  // console.log(data);
  
  return data.result;
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => updateProfile(data), {
    onSuccess: () => {
      toast.success("Profile updated successfully");
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

      if(err.response.status === 422) {
        const errorMessages = convertErrorsToArray(err?.response?.data?.error);
        let message = errorMessages.map((key)=> { 
          return key;
        })
        toast.error(message.join(","));
      }
      else {
        if (errorMessage) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Unknown error occured");
        }
    }

      if (
        Object.keys(errorMessage).length === 0 &&
        errorMessage.constructor === Object
      ) {
        toast.error("Empty message from server");
      }

      

      queryClient.setQueryData("tutorSlots", context.previousTodos);
    },

    // Always refetch after error or success:

    onSettled: () => {
      queryClient.invalidateQueries("tutorSlots");
    },
  });
};

export default useUpdateProfile;
