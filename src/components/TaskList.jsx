import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteById from "./DeleteById";
import TaskModal from "./TaskModal";
import TaskCountBubble from "./TaskCountBubble";
import SearchTasks from "./SearchTasks";
import { Toast, ToastContainer, Button } from 'react-bootstrap';

const TaskList = ({ todos, setTodos, refreshTasks }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // success or error
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const statuses = ['pending', 'ongoing', 'completed'];
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (!todos.length) {
            refreshTasks();
        }
    }, [todos, refreshTasks]);

    const handleDeleteAll = async () => {
        if (!token || !userId) return;

        try {
            await axios.delete(`${apiBaseUrl}/tasks/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            refreshTasks();
            showToastMessage('Tasks deleted successfully.', 'success');
        } catch (err) {
            console.error('Error deleting tasks:', err);
            showToastMessage('Failed to delete tasks. Please try again.', 'error');
        }
    };

    const updateTask = async (taskId, updates) => {
        if (!token || !userId) return;

        try {
            await axios.put(`${apiBaseUrl}/tasks/${userId}/${taskId}`, updates, {
                headers: { Authorization: `Bearer ${token}` }
            });
            refreshTasks();
            showToastMessage('Task updated successfully.', 'success');
        } catch (err) {
            console.error('Error updating task:', err);
            showToastMessage('Failed to update task. Please try again.', 'error');
        }
    };

    const handleStatusChange = (taskId, newStatus) => {
        updateTask(taskId, { status: newStatus });
    };

    const handleSave = (taskId, name, description) => {
        updateTask(taskId, { name, description });
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        handleStatusChange(taskId, newStatus);
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

    const handleSearch = (searchResults) => {
        setSearchResults(searchResults);
        setIsSearching(true);
        if (searchResults.length === 0) {
            setIsSearching(false);
            showToastMessage('No tasks found', 'error');
        }
    };

    const handleReset = () => {
        setIsSearching(false);
        showToastMessage('Reset completed', 'info');
    };

    const showToastMessage = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const tasksToDisplay = isSearching ? searchResults : todos;

    return (
        <div className="row">
            <div className="search-container d-flex justify-content-center align-items-center mb-4">
                <SearchTasks setTasks={handleSearch} />
                <Button onClick={handleReset} variant='secondary' className='ms-2'>
                    Reset
                </Button>
                <Button onClick={handleDeleteAll} variant='danger' className='ms-2'>
                    Delete All
                </Button>
            </div>
            
            {statuses.map(status => {
                const taskCount = tasksToDisplay.filter(todo => todo.status === status).length;
                return (
                    <div
                        key={status}
                        className={`col-md-4 task-column ${status}`}
                        onDrop={(e) => handleDrop(e, status)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <h3 className="text-center mb-4 position-relative mt-4">
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            <span className="task-count-container">
                                <TaskCountBubble count={taskCount} />
                            </span>
                        </h3>
                        <div className="task-column-content p-2 rounded">
                            {taskCount === 0 ? (
                                <p className="text-center">No tasks in this status</p>
                            ) : (
                                tasksToDisplay.filter(todo => todo.status === status).map(todo => (
                                    <div
                                        key={todo._id}
                                        className="task-item shadow-sm rounded-3 d-flex align-items-center border mb-3 p-3 bg-white text-dark"
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, todo._id)}
                                    >
                                        <div 
                                            className="flex-grow-1 text-start"
                                            onClick={() => handleTaskClick(todo)} 
                                        >
                                            {todo.name}
                                        </div>
                                        <div className="delete-btn ms-3">
                                            <DeleteById 
                                                taskId={todo._id} 
                                                onDeleteSuccess={refreshTasks} 
                                                onClick={(e) => e.stopPropagation()} 
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                );
            })}
            {selectedTask && (
                <TaskModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    task={selectedTask}
                    handleSave={handleSave} 
                />
            )}
            <ToastContainer className="p-3" position="top-right">
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    bg={toastType === 'success' ? 'success' : toastType === 'error' ? 'danger' : 'info'}
                    className="text-light"
                >
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default TaskList;
