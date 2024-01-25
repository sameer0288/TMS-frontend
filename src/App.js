import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import AuthForm from "./components/AuthForm";
import EditTask from "./components/EditTask";
import LandingPage from "./components/LandingPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [authStatus, setAuthStatus] = useState(false); // Example auth status, replace with your logic
  const [toastQueue, setToastQueue] = useState([]);

  // Function to add a toast to the queue
  const showToast = (message, options = {}) => {
    setToastQueue((prevQueue) => [...prevQueue, { message, options }]);
  };

  // Effect to display toasts from the queue
  useEffect(() => {
    if (toastQueue.length > 0) {
      const { message, options } = toastQueue[0];
      toast(message, options);
      setToastQueue((prevQueue) => prevQueue.slice(1));
    }
  }, [toastQueue]);

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="app-container">
          {/* Include ToastContainer at the App level */}
          <Routes>
            <Route path="/" element={<LandingPage authStatus={authStatus} />} />
            <Route
              path="/login"
              element={
                <AuthForm
                  showToast={showToast}
                  setAuthStatus={setAuthStatus}
                  authType="login"
                />
              }
            />
            <Route
              path="/register"
              element={
                <AuthForm
                  showToast={showToast}
                  setAuthStatus={setAuthStatus}
                  authType="register"
                />
              }
            />
            <Route
              path="/task"
              element={
                <TaskList showToast={showToast} authStatus={authStatus} />
              }
            />
            <Route
              path="/create-task"
              element={
                <TaskForm showToast={showToast} authStatus={authStatus} />
              }
            />
            <Route path="/edit-task/:taskId" element={<EditTask />} />
            {/* Add a catch-all route for unknown paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
