import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Needed for OAuth sessions (Google/LinkedIn)
});

// Signup
export const signup = (data) => API.post("/auth/signup", data);

// Login
export const loginUser = async (userData) => {
  try {
     const res = await API.post("/auth/login", userData, {
      withCredentials: true, // ensure cookies are sent
    });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// ForgotPassword
export const forgotPassword = async (email) => {
  try {
    const res = await API.post("/auth/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// ResetPassword
export const resetPassword = async (token, password) => {
  try {
    const res = await API.post("/auth/reset-password", { token, password });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// GoogleLogin
export const googleLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/google";

};

// LinkedinLogin
export const linkedInLogin = () => {
  window.location.href = "http://localhost:5000/api/auth/linkedin";

};
