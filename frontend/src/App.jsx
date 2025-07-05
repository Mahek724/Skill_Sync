import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LearnerProfile from './pages/learner/Learnerprofile.jsx';
import MentorProfile from './pages/mentor/MentorProfile';
import ContributorProfile from './pages/contributor/ContributorProfile';
import ResetPassword from './pages/auth/ResetPassword';
import LearnerDashboard from './pages/learner/LearnerDashboard.jsx';
import MentorDashboard from './pages/mentor/MentorDashboard.jsx';
import ContributorDashboard from './pages/contributor/ContributorDashboard.jsx';
import HomePage from './components/HomePage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/footer.jsx';
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
<>
            <Navbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />


              <Route path="/learner_profile" element={<ProtectedRoute role="learner"><LearnerProfile /></ProtectedRoute>}/>
              <Route path="/learner_dashboard" element={<ProtectedRoute role="learner"><LearnerDashboard /></ProtectedRoute>}/>
              
              <Route path="/mentor_profile" element={<ProtectedRoute role="mentor"><MentorProfile /></ProtectedRoute>}/>
              <Route path="/mentor_dashboard" element={<ProtectedRoute role="mentor"><MentorDashboard /></ProtectedRoute>}/>

              
              <Route path="/contributor_profile" element={<ProtectedRoute role="contributor"><ContributorProfile /></ProtectedRoute>}/>
              <Route path="/contributor_dashboard" element={<ProtectedRoute role="contributor"><ContributorDashboard /></ProtectedRoute>}/>

          </Routes>
          <Footer />
          </>
  )
}

export default App
