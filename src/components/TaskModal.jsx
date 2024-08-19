import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TaskModal = ({ show, handleClose, task, handleSave }) => {
const [name, setName] = useState(task.name);
const [description, setDescription] = useState(task.description || '');

useEffect(() => {
    setName(task.name);
    setDescription(task.description || '');
}, [task]);

const handleSaveClick = () => {
    handleSave(task._id, name, description);
    handleClose();
};

return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Form.Control
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
        className="border-0 bg-transparent"
        />
    </Modal.Header>
    <Modal.Body>
        <Form>
        <Form.Group controlId="taskDescription">
            <Form.Label><strong>Description:</strong></Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer className="d-flex justify-content-between">
        <div>
        <small className="text-muted">
            Created at: {new Date(task.createdAt).toLocaleString()}
        </small>
        </div>
        <div>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSaveClick} className="ms-2">
            Save
        </Button>
        </div>
    </Modal.Footer>
    </Modal>
);
};

export default TaskModal;
