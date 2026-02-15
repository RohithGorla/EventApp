import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/registrations/my-events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchMyEvents();
    }
  }, [token]);

  const cancelRegistration = async (eventId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/registrations/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh list after cancel
      const res = await axios.get(
        "http://localhost:5000/api/registrations/my-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  const today = new Date();

  const upcoming = events.filter(
    (item) => new Date(item.event.date) > today
  );

  const past = events.filter(
    (item) => new Date(item.event.date) <= today
  );

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>My Dashboard</h1>

      <button
        onClick={logout}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Logout
      </button>

      <h2>Upcoming Events</h2>
      {upcoming.length === 0 && <p>No upcoming events</p>}
      {upcoming.map((item) => (
        <div key={item._id} style={{ marginBottom: "15px" }}>
          <p>{item.event.name}</p>
          <button
            onClick={() => cancelRegistration(item.event._id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
        </div>
      ))}

      <h2>Past Events</h2>
      {past.length === 0 && <p>No past events</p>}
      {past.map((item) => (
        <div key={item._id}>
          <p>{item.event.name}</p>
        </div>
      ))}
    </div>
  );
}