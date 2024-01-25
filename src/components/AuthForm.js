import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../path-to/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi"; // Assuming you have these icons

const AuthForm = ({ showToast, setAuthStatus, authType }) => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tms-backend-lovv.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      setAuthToken(response.data.token);
      setAuthStatus(true);
      showToast("Login successful!");
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tms-backend-lovv.onrender.com/api/auth/register",
        {
          email,
          password,
        }
      );

      showToast("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div>
      <h2>{authType === "login" ? "Login" : "Register"}</h2>
      <form>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "98%" }}
          />
          <span
            style={{
              position: "absolute",
              top: "20%",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </span>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={authType === "login" ? handleLogin : handleRegister}>
          {authType === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
