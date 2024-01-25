import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ... (imports and other code)

const TaskForm = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 300;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validate form fields before submitting
      if (!title.trim()) {
        props.showToast("Please enter a title.", { position: "top-right" });
        return;
      }

      // You can add more validations for other fields if needed

      await axios.post("https://tms-backend-lovv.onrender.com/api/tasks", {
        title,
        description,
        dueDate,
      });

      // Display success toast
      props.showToast("Task created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the form fields
      resetForm();

      // Navigate to the root path ("/") after successful task creation
      navigate("/task");
    } catch (error) {
      console.error("Error creating task:", error);

      // Display error toast
      props.showToast("Error creating task. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <Container>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => {
            if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
              setDescription(e.target.value);
            }
          }}
          margin="normal"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span>{`${description.length}/${MAX_DESCRIPTION_LENGTH} characters`}</span>
        </div>
        <label htmlFor="dueDate" style={{ width: "100%", cursor: "pointer" }}>
          Due Date
          <input
            id="dueDate"
            type="date"
            style={{ width: "98%", marginTop: "8px" }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Creating Task..." : "Create Task"}
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default TaskForm;
