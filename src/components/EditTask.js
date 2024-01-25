import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    // Fetch the task data for editing
    axios
      .get(`https://tms-backend-lovv.onrender.com/api/tasks/${taskId}`)
      .then((response) => setTask(response.data))
      .catch((error) => console.error("Error fetching task:", error));
  }, [taskId]);

  const handleUpdate = async () => {
    try {
      // Send a PUT request to update the task
      await axios.put(
        `https://tms-backend-lovv.onrender.com/api/tasks/${taskId}`,
        task
      );

      // Redirect to the task list after successful update
      navigate("/task");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleChange = (e) => {
    setTask((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Edit Task
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        name="title"
        value={task.title}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        name="description"
        value={task.description}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        fullWidth
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        margin="normal"
        required
      />
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleUpdate}
      >
        Update Task
      </Button>
    </Container>
  );
};

export default EditTask;
