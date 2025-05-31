import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/signup.css';
import { signup } from '../../services/authApi'; // Adjust path if needed
import logo from '../../assets/logo.png'; // Adjust path as needed

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const { username, email, password, confirmPassword, role } = formData;

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!role || role === '') newErrors.role = 'Please select a role';

    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      const res = await signup(formData);
      console.log('Signup success:', res);
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err);
      setErrors({ server: err.message || 'Signup failed' });
    }
  } else {
    setErrors(validationErrors);
  }
};

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>Welcome to <span>SkillSync</span></h1>
        <p>Exchange Skills. Build Futures.</p>
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <img src={logo} alt="Logo" className="form-logo" />
            <h2>Create an Account</h2>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="input-error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="input-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="input-error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}
          </div>

          <div className="form-group">
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Choose a role</option>
              <option value="mentor">Mentor</option>
              <option value="learner">Learner</option>
              <option value="contributor">Contributor</option>

            </select>
            {errors.role && <p className="input-error">{errors.role}</p>}
          </div>

          <button type="submit">Sign Up</button>
          <p className="login-link">
            Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
