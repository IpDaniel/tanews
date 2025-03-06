import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // using this to navigate to /login on handleLogout

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // the state of the user remains set at null.

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
  }, [user]);
  return (
    <>
      <TopNav />
      <div className="profile-container">
        {user ? (
          <div className="logged-in">
            <p>you are logged in !</p>
            <button onClick={handleLogout}>log out</button>
          </div>
        ) : (
          <div className="not-logged-in">
            <a href="/login">
              <button>go and login/ register</button>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
