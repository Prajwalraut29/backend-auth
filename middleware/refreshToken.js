const jwt = require("jsonwebtoken");

exports.refreshToken = (req, res) => {
    const cookies = req.headers.cookie;

    if (!cookies) {
        return res.status(404).json({ message: "No cookies found" });
    }

    // Parse refreshToken from cookies
    const refreshToken = cookies.split(";").find((c) => c.trim().startsWith("refreshToken="));
    if (!refreshToken) {
        return res.status(404).json({ message: "No refresh token found" });
    }

    const tokenValue = refreshToken.split("=")[1];

    jwt.verify(String(tokenValue), process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Generate a new access token
        const newAccessToken = jwt.sign(
            { id: user.id, email: user.email }, // Include any payload from the original refreshToken
            process.env.SEC_KEY,
            { expiresIn: "15m" } // Adjust access token expiry as needed
        );

        // Optionally, re-issue a new refreshToken if required
        const newRefreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "30s" } // Adjust refresh token expiry as needed
        );

        // Set the new tokens in cookies (ensure secure options for production)
        res.cookie("token", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

        return res.status(200).json({ message: "Tokens refreshed successfully", accessToken: newAccessToken });
    });
};

