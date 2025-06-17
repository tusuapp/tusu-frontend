import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v2api } from "api";
import { selectAuth } from "features/auth/authSlice";

const useBookingRequests = () => {
  const { user } = useSelector(selectAuth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await v2api.get("/user/classes", {
          params: { types: "requested" },
        });
        setData(response.data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An error occurred while fetching bookings.";
        console.error("Failed to fetch bookings:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchRequests();
    }
  }, [user]);
  return { data, loading, error };
};

export default useBookingRequests;
