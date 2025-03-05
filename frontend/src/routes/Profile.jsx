import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import TopNav from "../components/TopNav";

const Profile = () => {
  const [user, setUser] = useState(null);

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
  });
  return (
    <>
      <TopNav />
      <div className="profile-container">
        {user ? (
          <p>you are logged in !</p>
        ) : (
          <a href="/login">
            <button>go and login/ register</button>
          </a>
        )}
      </div>
    </>
  );
};

export default Profile;
