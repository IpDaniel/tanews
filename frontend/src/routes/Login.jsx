import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.access_token); // Store JWT token
      navigate("/dashboard"); // Redirect to a protected page
    } catch (err) {
      setError(err.message);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="app-container">
      <TopNav />
      <div className="main-content">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Login to TaNews</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="auth-button primary">Log In</button>
            </form>
            <div className="auth-footer">
              <p>Don't have an account?</p>
              <button onClick={goToRegister} className="auth-button secondary">
                Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;