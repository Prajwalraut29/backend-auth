const UserSchema = require('../models/UserSchema')

exports.getUser = async (req, res) => {
    const userId = req.id;

    let user;
    try {
        user = await UserSchema.findById(userId, "-password");
    } catch (error) {
        console.log("Error finding user:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
};
