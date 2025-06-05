import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  loginUser,
  forgotPassword,
  googleLogin,
  linkedInLogin,
} from "../../services/authApi";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import logo from "../../images/logo.png";
// import { useEffect } from "react";

const Popup = ({ message, type = "success", onClose }) => (
  <div className={`popup-message ${type}`}>
    <span>{message}</span>
    <button className="popup-close" onClick={onClose}>×</button>
  </div>
);


const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };
const [forgotSuccess, setForgotSuccess] = React.useState('');
const [forgotError, setForgotError] = React.useState('');

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 chars").required("Required"),
  });

//   useEffect(() => {
//   const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));

//   if (token && user?.role) {
//     navigate(`/${user.role}_profile`);
//   }
// }, [navigate]);
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const data = await loginUser(values);
      if (values.remember) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      }
      navigate(`/${data.user.role}_profile`);
      console.log(data)
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
        <img src={logo} alt="SkillSync" className="left-image" />
      </div>

      <div className="login-right">
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
                <label>
                  <Field type="checkbox" name="remember" />
                  Remember me
                </label>
                <span className="forgot-link" onClick={async () => {
                    const email = prompt("Enter your registered email for password recovery:");
                    if (email) {
                      try {
                        const res = await forgotPassword(email);
                        setForgotSuccess(res.message); // "Password reset email sent"
                        setForgotError('');

                        // ✅ Auto-dismiss after 3 seconds
                        setTimeout(() => setForgotSuccess(""), 3000);
                      } catch (err) {
                        setForgotError(err.message || "Something went wrong.");
                        setForgotSuccess('');

                        // ✅ Auto-dismiss error after 3 seconds
                        setTimeout(() => setForgotError(""), 3000);
                      }
                    }
                  }}
                  >Forgot password?</span>
              </div>

              <button type="submit" disabled={isSubmitting}>Login</button>
            </Form>
          )}
        </Formik>
                  {forgotSuccess && (
              <Popup
                message={forgotSuccess}
                type="success"
                onClose={() => setForgotSuccess("")}
              />
            )}
            {forgotError && (
              <Popup
                message={forgotError}
                type="error"
                onClose={() => setForgotError("")}
              />
            )}



        <div className="oauth-divider">Or Continue With</div>

        <div className="oauth-buttons">
          <button className="google-btn" onClick={googleLogin}>Google</button>
          <button className="linkedin-btn" onClick={linkedInLogin}>LinkedIn</button>
        </div>

        <p className="signup-switch">Don’t have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
