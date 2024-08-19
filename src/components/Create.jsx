import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Toast, ToastContainer } from 'react-bootstrap';

function Create({ refreshTasks }) {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('pending');
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // success or error
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleAdd = async () => {
    if (!task || task.trim().length < 5) {
      setToastMessage('Task name must be at least 5 characters long.');
      setToastType('error');
      setShowToast(true);
      return;
    }

    if (token && userId) {
      try {
        await axios.post(`${apiBaseUrl}/tasks/${userId}`, { name: task, status }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTask('');
        setStatus('pending');
        setShowModal(false);
        refreshTasks();
        setToastMessage('Task added successfully.');
        setToastType('success');
        setShowToast(true);
      } catch (err) {
        console.error('Error adding task:', err.response || err);
        setToastMessage('Failed to add task. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    } else {
      setToastMessage('You must be logged in to add a task.');
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <>
      <Button
        className="btn btn-primary floating-button"
        onClick={() => setShowModal(true)}
        style={{ position: 'fixed', bottom: '20px', right: '20px', borderRadius: '50%', width: '60px', height: '60px' }}
      >
        +
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                value={task}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <Form.Group controlId="taskStatus" className="mt-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-right" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastType === 'success' ? 'success' : 'danger'}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Create;
