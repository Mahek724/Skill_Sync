require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User.js');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;
  const googleId = profile.id;

  let user = await User.findOne({ email });

  if (!user) {
    // No user found → Redirect to signup (role not yet assigned)
    return done(null, { email, role: null, isNew: true });
  }

  // ✅ User exists but googleId is not linked yet
  if (!user.googleId) {
    user.googleId = googleId;
    await user.save();
  }

  return done(null, user);
}));



passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email });

      // If no user, do not create - fail authentication
      if (!user) {
        // null for error, false for user, { message } for Passport error message
        return done(null, false, { message: 'User must sign up first.' });
      }

      // Link linkedinId if not already linked
      if (!user.linkedinId) {
        user.linkedinId = profile.id;
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
