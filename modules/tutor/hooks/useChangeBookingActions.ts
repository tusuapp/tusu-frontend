import { api } from "api";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {SingletonRouter} from "next/router";

const changeBookingActions = async (booking: any) => {
  const { id, status, notes } = booking;

  const { data } = await api.put(`/tutor/bookings/change-status/${id}`, {
    status,
    notes,
  });

  return data.result;
};

const useChangeBookingActions = (router : SingletonRouter) => {
  const queryClient = useQueryClient();

  return useMutation((data: any) => changeBookingActions(data), {
    // When mutate is called:

    onSuccess: async () => {
      toast.success("Booking status changed successfully.");
      router.reload();
    },

    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)

      await queryClient.cancelQueries("bookingRequests");

      // Snapshot the previous value

      const previousTodos = queryClient.getQueryData("bookingRequests");

      // Optimistically update to the new value

      // queryClient.setQueryData("bookingRequests", (old: any) => [...old, newTodo]);

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

      queryClient.setQueryData("bookingRequests", context.previousTodos);
    },

    // Always refetch after error or success:

    onSettled: () => {
      queryClient.invalidateQueries("bookingRequests");
    },
  });
};

export default useChangeBookingActions;
