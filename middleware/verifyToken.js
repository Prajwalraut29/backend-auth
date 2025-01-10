const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
        return res.status(404).json({ message: "No cookies found" });
    }

    // Parse token from cookies
    const token = cookies.split(";").find((c) => c.trim().startsWith("token="));
    // const token = req.cookies?.token;
    if (!token) {
        return res.status(404).json({ message: "No token found" });
    }

    const tokenValue = token.split("=")[1];

    jwt.verify(String(tokenValue), process.env.SEC_KEY, (error, user) => {
        if (error) {
            return res.status(400).json({ message: "Invalid token" });
        }

        // console.log("Decoded User:", user);
        req.id = user.id;
        next(); // Call next only on successful verification
    });
};

module.exports = verifyToken;
