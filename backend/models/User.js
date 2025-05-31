const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["learner", "mentor", "contributor",], required: true },
  profileRef: { type: mongoose.Schema.Types.ObjectId, refPath: 'roleProfile' },
  roleProfile: { type: String,enum: ['LearnerProfile', 'ContributorProfile', 'MentorProfile']
  },

   // Password reset
  resetToken: String,
  resetTokenExpiry: Date,

  // Outh loin
  googleId: String,
  linkedinId: String,
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);

 