import React, { useState, useEffect } from "react";
import TopNav from "../components/TopNav";
import "../styles/AdminAddArticle.css";
import { useNavigate } from "react-router";

const AdminAddArticle = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ✅ Prevents rendering for unauthorized users
    if (!token) {
      setTimeout(() => navigate("/login"), 0);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/users/isadmin",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data.message); // ✅ Only set user if the response is 200 OK
        } else {
          navigate("/dashboard"); // ✅ Redirect non-admins elsewhere
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <>
      <TopNav />
      <div className="add-article-container">
        {error && <p className="error-message-admin">{error}</p>}
        {user ? <p>{user}</p> : <p>Loading...</p>}
      </div>
    </>
  );
};

export default AdminAddArticle;
