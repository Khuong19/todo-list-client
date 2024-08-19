import axios from 'axios';
import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import '../index.css';

const DeleteById = ({ taskId, onDeleteSuccess }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleDelete = () => {
        axios.delete(`${apiBaseUrl}/tasks/${userId}/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` } // Pass the token in headers
        })
        .then((response) => {
            console.log(response.data);
            onDeleteSuccess(taskId); // Call the callback function to remove the task from the list
        })
        .catch((err) => {
            console.error('Error deleting task:', err);
            alert(err)
        });
    };

    return (
        <div className='ms-3' onClick={handleDelete}>
            <BsFillTrashFill className='icon' />
        </div>
    );
};

export default DeleteById;
