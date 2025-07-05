import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/signup.css';
import { signup } from '../../services/authApi'; 
import logo from '../../../public/images/logo.png'; 

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

  // Validate fields
  const validate = (fields = formData) => {
    const newErrors = {};
    const { username, email, password, confirmPassword, role } = fields;

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

  // Called on every change, field-level validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Validate only the affected field - "onAll" effect
    const newErrors = validate(updatedFormData);
    setErrors(newErrors);
  };

  // On form submit validate all
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await signup(formData);
        console.log('Signup success:', res);
        navigate('/login');
      } catch (err) {
        setErrors({ server: err.message || 'Signup failed' });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={logo} alt="Logo" className="form-logo" />
        <h1 id='exchange'>Welcome to SkillSync</h1>
        <p style={{fontWeight:'bold'}} id='exchange'>Exchange Skills. Build Futures.</p>
      </div>
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="form-header">
            <h1>Sign Up</h1>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
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
              autoComplete="email"
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
              autoComplete="new-password"
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
              autoComplete="new-password"
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

          {errors.server && <p className="input-error">{errors.server}</p>}

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