import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

const SearchTasks = ({ setTasks }) => {
    const [query, setQuery] = useState('');
    const token = localStorage.getItem('token');
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${apiBaseUrl}/tasks/search`, {
                params: {
                    query: query
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(response.data.tasks || []); // Pass the tasks to the parent component
        } catch (err) {
            console.error('Error searching tasks:', err);
            setTasks([]); 
        }
    };

    return (
        <form onSubmit={handleSearch} className="d-flex" style={{maxWidth: '500px'}}>
            <input
                type="text"
                placeholder="Search tasks"
                className="form-control me-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="custom-search-btn">Search</button>
        </form>
    );
};

export default SearchTasks;
