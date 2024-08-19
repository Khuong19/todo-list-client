import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from '../components/Create';
import TaskList from '../components/TaskList';

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  console.log('Token: ', token);
  console.log('UserId: ', userId);

  useEffect(() => {
    if (token && userId) {
      fetchTasks();
    } else {
      setError('You must be logged in to view tasks.');
      setLoading(false);
    }
  }, [token, userId]);

  const fetchTasks = async () => {
    if (!token || !userId) {
      setError('Unauthorized: Please log in again.');
      return;
    }

    try {
      const response = await axios.get(`${apiBaseUrl}/tasks/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      if (err.response && err.response.status === 401) {
        setError('Unauthorized: Please log in again.');
      } else {
        setError('Failed to fetch tasks. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <div className="text-center mb-5">
        <h1>Task Management</h1>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          {error && <div className="alert alert-danger">{error}</div>}
          {!error && <Create refreshTasks={fetchTasks} />}
          <TaskList todos={todos} setTodos={setTodos} refreshTasks={fetchTasks} />
        </div>
      )}
    </div>
  );
}

export default Home;
