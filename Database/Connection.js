const mongoose = require('mongoose')
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.url)
    try {
        if (conn) {
            console.log('database connected successfully ');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB