import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://YOUR-BACKEND-NAME.onrender.com';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup
      ? '/api/signup'
      : '/api/login';

    try {
      const res = await axios.post(
        `${API_URL}${endpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', res.data);

      if (
        res.data.message?.toLowerCase().includes('successful') ||
        res.data.message === 'Success'
      ) {
        if (!isSignup) {
          localStorage.setItem(
            'token',
            res.data.token
          );

          navigate('/dashboard');
        } else {
          alert('Signup Successful!');
          setIsSignup(false);
        }
      }
    } catch (err) {
      console.error(
        'Auth Error:',
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Something went wrong'
      );
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <h1 className="brand-title">
          CloudLearn <span>Hub</span>
        </h1>

        <ul className="features-list">
          <li>
            ✓ User authentication with MongoDB for
            secure access.
          </li>
          <li>
            ✓ File upload and storage powered by AWS
            S3.
          </li>
          <li>
            ✓ Fast, scalable platform for managing
            study materials.
          </li>
        </ul>
      </div>

      <div className="right-section">
        <div className="login-card glass">
          <h2 className="form-title">
            {isSignup
              ? 'Create Account'
              : 'Welcome Back'}
          </h2>

          <p className="subtitle">
            {isSignup
              ? 'Join our workspace'
              : 'Login to your workspace'}
          </p>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Login ID (Email)"
              value={email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
              autoComplete={
                isSignup
                  ? 'new-password'
                  : 'current-password'
              }
            />

            <button
              type="submit"
              className="login-btn"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          <p className="toggle-text">
            {isSignup
              ? 'Already have an account? '
              : "Don't have an account? "}

            <span
              onClick={() =>
                setIsSignup(!isSignup)
              }
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
