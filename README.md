# Tentkotta Club App - Gamified Experience

This is a **MERN (MongoDB, Express, React, Node)** gamified application built for **Tentkotta**. The app offers club members an interactive experience, where they can register, log in, verify emails, and contribute to club activities to earn points and climb the leaderboard.

---

## Gamified Features

- **User Registration**: Members create accounts to access the platform.
- **Email Verification**: New users receive a verification email via Nodemailer to confirm their accounts.
- **User Login**: Secure access for registered users to track their progress.
- **Contribution Tracking & Rewards**: Members log contributions, which are stored in a database collection, with each contribution granting 2 points.
- **Leaderboard**: A competitive leaderboard displays members based on their accumulated points.

## Project Status

🚧 **Currently in Development** 🚧

---

## Running the App Locally

To set up the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hrishikesan19/Tentkotta-Gamified.git
   cd Tentkotta-Gamified
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - **Database URI** for MongoDB
   - **Nodemailer credentials** for email verification
   - **JWT Secret** for user authentication

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to start exploring the app.

---

## Technologies Used

- **MongoDB** for storing user and contribution data.
- **Express.js** for server-side handling.
- **React** for building an interactive UI.
- **Node.js** as the backend runtime.
- **Nodemailer** for email verification.
  
---

## Future Enhancements

- **New Routes**: 
  - **Works Route**: Display a gallery or list of the club’s work and activities.
  - **Officebearers Route**: Show current office bearers with their respective roles.
  
- **Social Sharing**: Allow users to share achievements on social media when they reach certain points milestones, increasing engagement and visibility.

---

## Author

Created by Hrishikesan, Tentkotta Club
