import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Using the same CSS file for consistency
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    is_admin: false,
    is_author: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Registration failed");

      alert("Registration successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="app-container">
      <TopNav />
      <div className="main-content">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Create an Account</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_author"
                    checked={formData.is_author}
                    onChange={handleChange}
                  />
                  Register as Author
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleChange}
                  />
                  Register as Admin
                </label>
              </div>
              <button type="submit" className="auth-button primary">Create Account</button>
            </form>
            <div className="auth-footer">
              <p>Already have an account?</p>
              <button onClick={goToLogin} className="auth-button secondary">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;