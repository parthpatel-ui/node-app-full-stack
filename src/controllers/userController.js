const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function userRegistration(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
}

async function userLogin(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "24h" });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
}
module.exports = {
    userRegistration,
    userLogin
};