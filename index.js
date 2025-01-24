const express = require('express')
const cookieParser = require('cookie-parser')
const userRoute = require("./routes/userRoute")
const homeRoute = require("./routes/homeRoute")

const {checkUserlogin} = require('./middleware/authMiddleware')

const app = express()
app.use('/upload', express.static('upload'));
app.use(express.static('public'));
app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(userRoute);

app.use(checkUserlogin,homeRoute);



const port = 8000
app.listen(port, () => console.log(`server run on http://localhost:${port}/`))

