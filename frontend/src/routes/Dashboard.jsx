import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/protected",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch user data");

        setUser(data.message);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <TopNav />
      <div className="main-content">
        <div className="dashboard-container">
          <h2>Dashboard</h2>
          {error && <p className="error-message">{error}</p>}
          {user ? (
            <>
              <p>{user}</p>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;