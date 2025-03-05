import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import TopNav from "../components/TopNav.jsx";

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

  return (
    <>
      <TopNav />
      <div className="register-container">
        <div className="register-box">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={formData.is_admin}
                  onChange={handleChange}
                />
                Admin
              </label>
              <label>
                <input
                  type="checkbox"
                  name="is_author"
                  checked={formData.is_author}
                  onChange={handleChange}
                />
                Author
              </label>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
