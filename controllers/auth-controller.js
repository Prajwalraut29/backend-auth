const UserSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// const SEC_KEY = "sdfjkhj";
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let existingUser;
        try {
            existingUser = await UserSchema.findOne({ email })
        } catch (error) {
            console.log(error.message);
        }
        if (existingUser) {
            return res.status(400).json({ message: "user already exists" })
        }
        // hashed the password 
        const hashedPassword = await bcrypt.hash(password, 10)
        const User = new UserSchema({
            name, email, password: hashedPassword
        })
        await User.save()
        res.status(200).json({ status: true, message: "user created successfully", User })
    } catch (error) {
        console.log(error);

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let existingUser = await UserSchema.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign({ id: existingUser._id }, process.env.SEC_KEY, { expiresIn: "30s" });

        // Set token in cookie
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
        });

        return res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.logout = async (req, res) => {
    try {
        const cookies = req.headers.cookie;

        if (!cookies) {
            return res.status(404).json({ message: "No cookies found" });
        }

        const token = cookies.split(";").find((c) => c.trim().startsWith("token="));
        if (!token) {
            return res.status(404).json({ message: "No token found" });
        }

        const tokenValue = token.split("=")[1];

        jwt.verify(String(tokenValue), process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(400).json({ message: "Invalid token" });
            }

            // Clear the user's token by removing the cookie
            res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
            res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" });

            return res.status(200).json({ message: "Successfully logged out" });
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "An error occurred during logout" });
    }
};
