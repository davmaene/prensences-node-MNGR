const express = require('express');
const { ControllerNotifications } = require('../controllers/controlle.notifications');

const NotificatiolnsRoutes = express.Router();
NotificatiolnsRoutes.post("/notification/addtouser", ControllerNotifications.pushtouser)

module.exports = { NotificatiolnsRoutes }