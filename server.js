import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import cryptoRandomString from 'crypto-random-string';  // ES module import
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Users')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// User schema with email verification fields
const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  year: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  interestedDomains: [{ type: String }],
  emailVerified: { type: Boolean, default: false },  // Email verification status
  verificationCode: { type: String },  // 6-digit verification code
  verificationCodeExpires: { type: Date }  // Expiration time for the code
});

// Password hashing before saving user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Password comparison method
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("Credentials", UserSchema, "Credentials");

// Contribution schema with points for contributions
const contributionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  contributionText: { type: String, required: true },
  date: { type: Date, default: Date.now },  // Set default date
  points: { type: Number, default: 2 }  // Default points for each contribution
});

const ContributionModel = mongoose.model("contribute", contributionSchema, "contribute");

// Email transporter for sending verification emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tentkottatce@gmail.com',  // Replace with your email
    pass: 'wxki lesq hdhb gpie',  // Use App-specific password or OAuth2 for better security
  },
});

// Route for user login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(401).send("notauthenticated");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).send("notauthenticated");
    }

    res.send("authenticated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for user registration
app.post('/join', async (req, res) => {
  try {
    const {
      name,
      department,
      username,
      password,
      year,
      email,
      interestedDomains
    } = req.body;

    // Check if username or email already exists
    const existingUser = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send("usernameexists");
    }
    if (existingEmail) {
      return res.status(409).send("emailexists");
    }

    // Generate 6-digit verification code
    const verificationCode = cryptoRandomString({ length: 6, type: 'numeric' });
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes

    // Create new user with verification code
    const newUser = new UserModel({
      name,
      department,
      username,
      password,
      year,
      email,
      interestedDomains,
      verificationCode,
      verificationCodeExpires,
    });

    // Save user to the database
    await newUser.save();

    // Send verification email with the 6-digit code
    const mailOptions = {
      from: 'tentkottatce@gmail.com',
      to: email,
      subject: 'Tentkotta Club Email Verification',
      text: `Hi ${name},\n\nThank you for registering with Tentkotta Visual Arts Club.\n\nPlease use the following code to verify your email: ${verificationCode}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nTentkotta Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send("Error sending email.");
      }
      console.log('Verification email sent:', info.response);
    });

    res.status(201).send("registered");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for verifying email with the 6-digit code
app.post('/verify-email', async (req, res) => {
  try {
    const { username, verificationCode } = req.body;

    // Find user by username and check the verification code
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send("usernotfound");
    }

    if (user.emailVerified) {
      return res.status(400).send("alreadyverified");
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).send("invalidcode");
    }

    // Check if the verification code has expired
    if (new Date() > user.verificationCodeExpires) {
      return res.status(400).send("codeexpired");
    }

    // Set emailVerified to true and clear verification code fields
    user.emailVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;

    // Save the updated user
    await user.save();

    res.send("emailverified");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for contributing and saving points in contributions (only for verified users)
app.post('/contribute', async (req, res) => {
  try {
    const { username, contributionText } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send("usernotfound");
    }

    // Ensure user has verified their email before they can contribute
    if (!user.emailVerified) {
      return res.status(403).send("emailnotverified");
    }

    // Create a new contribution
    const newContribution = new ContributionModel({
      username,
      contributionText,
      points: 2  // Assign default points for the contribution
    });
    await newContribution.save();

    res.status(201).send("contributionadded");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for fetching the leaderboard
// Route for getting the leaderboard
// Route for fetching the leaderboard
// Route for fetching the leaderboard
app.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await ContributionModel.aggregate([
            {
                $group: {
                    _id: "$username",  // Group by username
                    totalPoints: { $sum: "$points" }  // Sum points for each user
                }
            },
            {
                $sort: { totalPoints: -1 }  // Sort in descending order of totalPoints
            }
        ]);

        console.log("Leaderboard Data:", leaderboard);  // Log the aggregated result for debugging
        res.json(leaderboard);  // Send the leaderboard data as a JSON response
    } catch (error) {
        console.error("Error fetching leaderboard:", error);  // Log error for debugging
        res.status(500).send(`Internal Server Error: ${error.message}`);  // Send a 500 response with the error message
    }
});

  

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
