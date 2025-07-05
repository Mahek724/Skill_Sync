// src/pages/HomePage.jsx
import React from 'react';
import '../assets/css/home.css';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaUserPlus, FaBriefcase, FaStar } from 'react-icons/fa';
import { Player } from '@lottiefiles/react-lottie-player';
import homeAnimation from '../assets/lotties/hero.json';
import vision from '../assets/lotties/vision.json';
import mission from '../assets/lotties/mission.json';
import Rating from '../components/Rating.jsx';


;

const HomePage = () => {


const roles = [
  {
    role: 'Learner',
    description: 'Step into real-world projects, learn by doing, and build your portfolio while collaborating with experienced contributors and mentors.',
    image: '/images/learner.png',
  },
  {
    role: 'Contributor',
    description: 'Use your skills to contribute to real tasks in live projects, grow your credibility, and earn endorsements from mentors and peers.',
    image: '/images/contributor.png',
  },
  {
    role: 'Mentor',
    description: 'Share your expertise, guide learners and contributors, and help shape the next generation of professionals while boosting your personal brand.',
    image: '/images/mentor.png',
  },
  {
    role: 'Project Creator',
    description: 'Launch your idea, build a collaborative team, and bring your vision to life by posting micro-internship projects with real impact.',
    image: '/images/project_creator.png',
  },
];


  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>Welcome to <span>SkillSync</span></h1>
          <p>Where Skills Connect, Experience Begins.</p>
          <button className="cta-btn">Explore Opportunities</button>
        </div>
        <div className="hero-right">
          <Player autoplay loop src={homeAnimation} className="hero-animation" />
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <motion.div className="step" whileHover={{ scale: 1.05 }}>
            <FaUserPlus className="step-icon" />
            <p>Create your SkillSync profile</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05 }}>
            <FaBriefcase className="step-icon" />
            <p>Join or post micro-internship projects</p>
          </motion.div>
          <motion.div className="step" whileHover={{ scale: 1.05 }}>
            <FaStar className="step-icon" />
            <p>Collaborate, learn, and get endorsed</p>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="vision-section">
        <div className="vision-left">
          <Player autoplay loop src={vision} className="vision-animation" />

        </div>
        <div className="vision-right">
          <h2>Our Vision</h2>

          <p>At SkillSync, our vision is to democratize access to real-world experience by building a collaborative
            ecosystem where skills speak louder than credentials. We aspire to create a world where every learner, 
            regardless of background, can connect with mentors, contribute to meaningful projects, and grow through 
            hands-on learning — all within a unified platform that values skill, collaboration, and impact over 
            traditional qualifications.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section">
        <div className="mission-left">
          <h2>Our Mission</h2>
            <p>
              Our mission is to empower students, freelancers, and aspiring professionals by providing them with a 
              dynamic space to engage in skill-based micro-internships. Through mentorship, collaboration, 
              and role-specific dashboards, we aim to foster experiential learning, build digital portfolios, 
              and promote career readiness. SkillSync bridges the gap between learning and doing — enabling users 
              to gain confidence, endorsements, and exposure through real contributions in a professional-like 
              environment.
            </p>
        </div>
        <div className="mission-right">
          <Player autoplay loop src={mission} className="mission-animation" />
        </div>
      </section>

      {/* Role-Based Cards */}
      {/* Role-Based Cards */}
      <section className="roles-section">
          <h2>Choose Your Role</h2>

          <div className="role-cards">
            {roles.map(({ role, description, image }, index) => (
              <motion.div key={index} className="role-card" whileHover={{ scale: 1.05 }}>
                <div className="role-card-image">
                  <img src={image} alt={role} />
                </div>
                <h4>{role}</h4>
                <p>{description}</p>
                <button>Join as {role}</button>
              </motion.div>
            ))}
          </div>
        </section>



      {/* Call to Action */}
      <section className="cta-section">
        <h2>Start your SkillSync journey today.</h2>
        <div className="cta-buttons">
          <button>Join as Learner</button>
          <button>Become a Mentor</button>
          <button>Post Project</button>
        </div>
      </section>

        <Rating />




      {/* Live Metrics */}
      <section className="metrics-section">
        <h2>Our Impact</h2>
        <div className="metrics">
          <div className="metric"><h3><CountUp end={1250} />+</h3><p>Projects Completed</p></div>
          <div className="metric"><h3><CountUp end={6000} />+</h3><p>Active Users</p></div>
          <div className="metric"><h3><CountUp end={300} />+</h3><p>Mentors Onboard</p></div>
          <div className="metric"><h3><CountUp end={75} />+</h3><p>Live Internships</p></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
