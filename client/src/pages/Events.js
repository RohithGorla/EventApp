import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/events",
          {
            params: { search, category, location },
          }
        );
        setEvents(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [search, category, location]);

  const handleRegister = async (eventId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/registrations/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Successfully registered!");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      
      <h1 style={{ textAlign: "center" }}>Event Discovery</h1>

      {/* Show Dashboard Button if Logged In */}
      {token && (
        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "8px 12px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </div>
      )}

      {/* Search & Filters */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        >
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Sports">Sports</option>
        </select>
      </div>

      {/* Event Cards */}
      {events.length === 0 && <p>No events found.</p>}

      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{event.name}</h3>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Total Capacity:</strong> {event.capacity}</p>

          <button
            onClick={() => handleRegister(event._id)}
            style={{
              padding: "8px 12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
      ))}
    </div>
  );
}