import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { socket } from "../../../socket/socket";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = useCallback(async () => {
    try {
      setError("");

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getNotifications`,
        {
          withCredentials: true,
        }
      );

      // Change this according to your API response
      setNotifications(
        response.data.notifications ||
          response.data.data ||
          []
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const handleNewEnquiry = (data) => {
      if (data.type === "notifications") {
        fetchNotifications();
      }
    };

    socket.on("newEnquiry", handleNewEnquiry);

    return () => {
      socket.off("newEnquiry", handleNewEnquiry);
    };
  }, [fetchNotifications]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto my-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-xl shadow">
      <div className="p-5 border-b flex justify-between">
        <h2 className="text-xl font-bold">Notifications</h2>

        <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
          {notifications.length}
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No notifications found.
        </div>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif._id}
            className="border-b p-5 hover:bg-gray-50 flex gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              {notif.sentBy?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <p>
                <span className="font-semibold">
                  {notif.sentBy}
                </span>{" "}
                {notif.message}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {new Date(notif.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;