import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password || !username) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}/auth/register`, {
        email,
        username,
        password,
      });
      setSuccessMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="glassmorphism p-5 rounded-4 w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-dark">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-transparent text-dark"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control bg-transparent text-dark"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control bg-transparent text-dark"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>
          <button className="btn btn-dark w-100" type="submit">
            Register
          </button>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;
