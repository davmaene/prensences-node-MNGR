const express = require('express');
const { ControllerUsers } = require('../controllers/controller.users.js');

const UserRoutes = express.Router();

UserRoutes.post("/user/signin", ControllerUsers.login)
UserRoutes.post("/user/signup", ControllerUsers.register)
UserRoutes.put("/user/on/pointin", ControllerUsers.onpoint)
UserRoutes.put("/user/on/pointout", ControllerUsers.onpoint)
UserRoutes.get("/user/on/gethistory", ControllerUsers.gethistory)
UserRoutes.put("/user/verify", ControllerUsers.verify)

module.exports = {
    UserRoutes
}