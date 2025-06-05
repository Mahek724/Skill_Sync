import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LearnerProfile from './pages/learner/Learnerprofile';
import MentorProfile from './pages/mentor/MentorProfile';
import ContributorProfile from './pages/contributor/ContributorProfile';
import ResetPassword from './pages/auth/ResetPassword';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
          <Routes>
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/learner_profile" element={<ProtectedRoute role="learner"><LearnerProfile /></ProtectedRoute>}/>
              <Route path="/mentor_profile" element={<ProtectedRoute role="mentor"><MentorProfile /></ProtectedRoute>}/>
              <Route path="/contributor_profile" element={<ProtectedRoute role="contributor"><ContributorProfile /></ProtectedRoute>}/>
          </Routes>
  )
}

export default App
