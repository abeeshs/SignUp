const express = require('express')
const env = require('dotenv').config()

const app = express()
const userRoute = require('./routes/user')

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRoute)

//server
const port = process.env.PORT || 3000
app.listen(port, () => console.log("server running on port:" + port))

