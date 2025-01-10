const express = require('express')
const connectDB = require('./Database/Connection')
const cors = require('cors')
const router = require('./routes/user-routes')
const app = express()
const port = 5000
require('dotenv').config();
const cookieParser = require('cookie-parser')

connectDB()
app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/api", router)
app.listen(port, () => {
    console.log('server running at ', port);
})