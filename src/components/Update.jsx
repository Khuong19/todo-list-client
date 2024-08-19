import React, { useState } from "react";
import axios from "axios";

const Update = ({ taskId, currentName, setTodos, setEditingId }) => {
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState("");
  const userId = localStorage.getItem('userId');  // Fetch user ID from localStorage
  const token = localStorage.getItem('token');    // Fetch token from localStorage
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameBlur = () => {
    if (newName.trim() === currentName) {
      setEditingId(null); // Exit editing mode if name hasn't changed
      return;
    }

    axios
      .put(
        `${apiBaseUrl}/tasks/${userId}/${taskId}`, 
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in headers
          }
        }
      )
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === taskId ? { ...todo, name: newName } : todo
          )
        );
        setEditingId(null);
      })
      .catch((err) => {
        console.error('Error updating task:', err);
        setError("Failed to update task. Please try again.");
      });
  };

  return (
    <div>
      <input
        className="form-control flex-grow-1"
        type="text"
        value={newName}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleNameBlur();
        }}
        autoFocus
      />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Update;
