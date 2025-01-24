const express = require('express')
const {showSignUp,logout,showLogin,signUp,login,upload} = require("../controller/userController")
const route = express.Router()


route.get("/",showSignUp)
route.post("/register",upload.single("file"),signUp)
route.get("/logout",logout)
route.get("/showLogin",showLogin)
route.get("/logout",logout)
route.post("/login",login)

module.exports = route;
