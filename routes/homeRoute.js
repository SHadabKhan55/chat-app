const express = require('express')
const {
    sendRequest,
    cancelReq,
    viewHome,
    viewReq,
    rejectReq,
    acceptReq,
    showfriend,
    chats,


} = require("../controller/homeController")
const route = express.Router()


route.get("/home", viewHome)
route.get("/cancel/:id", cancelReq)
route.get("/viewReq",viewReq)
route.get("/showfriend",showfriend)
route.get("/chat",chats)
route.post("/sendRequest", sendRequest)
route.post("/reject", rejectReq)
route.post("/accept", acceptReq)

module.exports = route;
