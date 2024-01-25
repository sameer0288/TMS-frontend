import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../path-to/AuthContext.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = ({ authStatus }) => {
  const { setAuthToken } = useAuth();

  const handleLogout = () => {
    // Clear authentication token and perform other logout actions
    setAuthToken(null);

    // Show logout success toast
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Delay the page reload by 2 seconds
    setTimeout(() => {
      // Reload the page
      window.location.reload();
    }, 1400);
  };

  return (
    <div>
      <h1>Welcome to the Task Management App!</h1>
      {authStatus ? (
        <>
          <p>You are logged in. Start managing your tasks!</p>
          <Link to="/task">
            <button>Go to Task List</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Please log in or register to get started.</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LandingPage;
