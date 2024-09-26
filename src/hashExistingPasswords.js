const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true });

// Define your schema and model
const UserSchema = mongoose.Schema({
    username: String,
    password: String
});

const UserModel = mongoose.model("Credentials", UserSchema, "Credentials");

async function hashExistingPasswords() {
    const users = await UserModel.find({});
    users.forEach(async (user) => {
        if (!user.password.startsWith('$2b$')) { // Check if password is not already hashed
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
            console.log(`Password for ${user.username} has been hashed.`);
        }
    });
}

hashExistingPasswords();
