import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user data using the token
        const response = await fetch("http://localhost:4000/api/users/protected", {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        
        // Get additional user details (like email) using the user ID from the token response
        const userDetailsResponse = await fetch(`http://localhost:4000/api/users/details`, {
          method: "GET",
          headers: { 
            Authorization: `Bearer ${token}` 
          },
        });

        if (!userDetailsResponse.ok) {
          throw new Error("Failed to fetch user details");
        }

        const userDetails = await userDetailsResponse.json();
        
        setUser({
          name: data.message.split("Hello, ")[1].split("!")[0],
          email: userDetails.email,
          profileImage: userDetails.image_url || "/profile_default.svg" // Use default if no image
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <TopNav />
      <div className="main-content">
        <div className="profile-container">
          {loading ? (
            <p className="profile-loading">Loading profile data...</p>
          ) : error ? (
            <p className="profile-error">{error}</p>
          ) : !user ? (
            <div className="profile-not-logged-in">
              <h2>You are not logged in</h2>
              <p>Please log in to view your profile</p>
              <button onClick={() => navigate("/login")} className="login-button">
                Log In
              </button>
            </div>
          ) : (
            <div className="profile-content">
              <div className="profile-header">
                <div className="profile-image-container">
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="profile-image" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profile_default.svg";
                    }}
                  />
                </div>
                <h1 className="profile-name">{user.name}</h1>
              </div>
              <div className="profile-details">
                <div className="profile-info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>
              <button onClick={handleSignOut} className="sign-out-button">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;