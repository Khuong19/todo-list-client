import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
const [user, setUser] = useState(null);
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const [isEditing, setIsEditing] = useState(false);
const navigate = useNavigate();
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {
    const fetchUserData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
        navigate('/login');
        return;
        }

        const response = await axios.get(`${apiBaseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
    } catch (err) {
        console.error(err);
        setError('Failed to fetch user data.');
    }
    };

    fetchUserData();
}, [navigate]);

const handleSave = async () => {
    try {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return;
    }

    await axios.put(`${apiBaseUrl}/auth/me`, 
        { username, email },
        {
        headers: { Authorization: `Bearer ${token}` }
        }
    );
    setUser({ ...user, username, email });
    setIsEditing(false);
    setError('');
    } catch (err) {
    console.error(err);
    setError('Failed to update user data.');
    }
};

if (!user) {
    return <div>Loading...</div>;
}

return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
    <Card className="p-4 w-100 shadow-lg" style={{ maxWidth: '500px' }}>
        <Card.Body className="text-center">
        <FaUserCircle size={100} className="mb-3 text-primary" />
        <Card.Text className="mb-3">
            <strong>Username:</strong>
            {isEditing ? (
            <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2"
            />
            ) : (
            ` ${user.username}`
            )}
        </Card.Text>
        <Card.Text>
            <strong>Email:</strong>
            {isEditing ? (
            <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
            />
            ) : (
            ` ${user.email}`
            )}
        </Card.Text>
        {isEditing ? (
            <>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="secondary" className="ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
        ) : (
            <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
        )}
        </Card.Body>
    </Card>
    {error && alert(error)}
    </Container>
);
};

export default Profile;
