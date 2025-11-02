import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext.jsx'; // 1. Import Context
import { loginUser } from '../api';                  // 2. Import API call
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const { user, login } = useUserContext(); // 3. Get login function from Context
  const navigate = useNavigate();

  // If already logged in, redirect to homepage
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Basic email regex
      errors.email = 'Email address is invalid.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }
    // Add more password validation if needed (e.g., min length)
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if client-side validation fails
    }
    setLoading(true);

    try {
      // API Call to your backend's /api/users/login endpoint
      const { data } = await loginUser({ email, password });
      
      // Call the global login function to save user info and JWT
      login(data); 

      // Explicitly navigate to homepage after successful login
      navigate('/');
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || 'Login failed. Check credentials.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Log In to ThinkBoard</h2>
      <form onSubmit={submitHandler} className="auth-form">
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidationErrors(prev => ({ ...prev, email: undefined })); // Clear error on change
            }}
            placeholder="Enter email"
            required
            aria-invalid={!!validationErrors.email}
            aria-describedby={validationErrors.email ? "email-error" : undefined}
          />
          {validationErrors.email && (
            <p className="error-message" id="email-error">{validationErrors.email}</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors(prev => ({ ...prev, password: undefined })); // Clear error on change
            }}
            placeholder="Enter password"
            required
            aria-invalid={!!validationErrors.password}
            aria-describedby={validationErrors.password ? "password-error" : undefined}
          />
          {validationErrors.password && (
            <p className="error-message" id="password-error">{validationErrors.password}</p>
          )}
        </div>
        
        <button type="submit" className="btn btn-green" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-footer">
        New User? <Link to="/signup">Register Here</Link>
      </div>
    </div>
  );
};

export default LoginPage;