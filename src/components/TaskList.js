import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Fab,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend
    axios
      .get("http://localhost:5000/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDelete = async (taskId) => {
    try {
      // Send a DELETE request to remove the task
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);

      // Update the local state after successful deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container>
      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/create-task"
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
        }}
      >
        <AddCircleIcon />
      </Fab>
      <Typography variant="h2" gutterBottom>
        Task List
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id}>
            <ListItemText
              primary={task.title}
              secondary={`${task.description} - Due: ${task.dueDate}`}
            />
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              component={Link}
              to={`/edit-task/${task._id}`}
              style={{ marginRight: "8px" }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;
