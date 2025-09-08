import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth(); // register must be implemented in AuthContext
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if passwords match
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    // simple validation
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { success, message } = await register(
        form.username,
        form.email,
        form.password
      );

      if (success) {
        navigate("/login"); // after successful registration
      } else {
        setError(message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="login-input"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="login-input"
        />
        <input
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="login-error">{error}</p>}

        <p className="login-register">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
