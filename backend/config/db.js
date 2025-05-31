const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.yellow('MongoDB connected'));
  } catch (error) {
    console.error(chalk.red('Connection Failed:', error.message));
    process.exit(1);
  }
};

module.exports = connectDB;
