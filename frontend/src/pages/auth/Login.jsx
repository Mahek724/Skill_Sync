import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  loginUser,
  forgotPassword,
  googleLogin,
  linkedInLogin,
} from "../../services/authApi";
import * as Yup from "yup";
import { FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import logo from "../../../public/images/logo.png";

const Popup = ({ message, type = "success", onClose }) => (
  <div className={`popup-message ${type}`}>
    <span>{message}</span>
    <button className="popup-close" onClick={onClose}>×</button>
  </div>
);

const Login = () => {
  const navigate = useNavigate();

  // Use remembered values if they exist
  const rememberedEmail = localStorage.getItem("rememberedEmail") || "";
  // Not recommended for real apps!
  const rememberedPassword = localStorage.getItem("rememberedPassword") || "";

  const initialValues = {
    email: rememberedEmail,
    password: rememberedPassword,
    remember: rememberedEmail ? true : false,
  };

  const [forgotSuccess, setForgotSuccess] = React.useState('');
  const [forgotError, setForgotError] = React.useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
  });

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      // Call the login API!
      const data = await loginUser(values);
      if (values.remember) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("rememberedEmail", values.email);
        localStorage.setItem("rememberedPassword", values.password); // Not for real apps!
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
      navigate(`/${data.user.role}_profile`);
    } catch (errorMsg) {
      const errorText =
        errorMsg?.error || errorMsg?.message || "Login failed. Please try again.";
      setErrors({ email: errorText });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-card">
          <h2>LogIn</h2>
          <p>Welcome back! Please enter your details</p>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
            {({ isSubmitting }) => (
              <Form className="login-form">
                <div className="form-group">
                  <Field name="email" type="email" placeholder="Email" />
                  <ErrorMessage name="email" component="div" className="input-error" />
                </div>
                <div className="form-group">
                  <Field name="password" type="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="input-error" />
                </div>
                <div className="form-utility">
                  <label className="remember-label">
                    <Field type="checkbox" name="remember" />
                    Remember me
                  </label>
                  <span
                    className="forgot-link"
                    onClick={async () => {
                      const email = prompt("Enter your registered email:");
                      if (email) {
                        try {
                          const res = await forgotPassword(email);
                          setForgotSuccess(res.message);
                          setForgotError('');
                          setTimeout(() => setForgotSuccess(""), 3000);
                        } catch (err) {
                          setForgotError(err.message || "Something went wrong.");
                          setForgotSuccess('');
                          setTimeout(() => setForgotError(""), 3000);
                        }
                      }
                    }}
                  >
                    Forgot password?
                  </span>
                </div>
                <button type="submit" disabled={isSubmitting}>Login</button>
              </Form>
            )}
          </Formik>

          {forgotSuccess && (
            <Popup message={forgotSuccess} type="success" onClose={() => setForgotSuccess("")} />
          )}
          {forgotError && (
            <Popup message={forgotError} type="error" onClose={() => setForgotError("")} />
          )}

          <div className="oauth-divider">Or Continue With</div>
          <div className="oauth-buttons">
            <button className="google-btn" onClick={googleLogin} type="button">
              <FaGoogle className="google-icon" size={20} />
                Google
            </button>
            <button className="linkedin-btn" onClick={linkedInLogin} type="button">
              <FaLinkedinIn className="linkedin-icon" size={20} />
                LinkedIn
            </button>
          </div>

          <p className="signup-switch">Don’t have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
      <div className="login-right">
        <img src={logo} alt="SkillSync" className="right-image" />
        <h2 className="right-title">Welcome Back!</h2>
        <p className="right-desc">Login to continue your SkillSync journey</p>
      </div>
    </div>
  );
};

export default Login;