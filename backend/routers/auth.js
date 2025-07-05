const express = require('express');
require('../config/passport'); 
const passport = require('passport'); 
const router = express.Router();
const { signup} = require("../controllers/authController");
const authController = require('../controllers/authController');

router.post("/signup", signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

 //Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const { role, email, isNew } = req.user;

    if (isNew || !role) {
      return res.redirect(`http://localhost:5173/signup?email=${email}`);
    }

    if (role === 'mentor') return res.redirect('http://localhost:5173/mentor_profile');
    if (role === 'learner') return res.redirect('http://localhost:5173/learner_profile');
    if (role === 'contributor') return res.redirect('http://localhost:5173/contributor_profile');

    return res.redirect('/login');
  }
);




//LinkedIn OAuth
router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login?error=need-signup', session: false }),
  (req, res) => {
    const { role } = req.user;

    if (!role) {
      // User exists but hasn't selected a role, redirect to signup completion
      return res.redirect(`http://localhost:5173/signup?email=${req.user.email}`);
    }

    // Redirect to the correct profile page
    if (role === 'mentor') return res.redirect('http://localhost:5173/mentor_profile');
    if (role === 'learner') return res.redirect('http://localhost:5173/learner_profile');
    if (role === 'contributor') return res.redirect('http://localhost:5173/contributor_profile');

    return res.redirect('http://localhost:5173/login?error=invalid-role');
  }
);



module.exports = router;

