const express = require('express');
const { CitationRouters } = require('./routes.citations');
const { UserRoutes } = require('./routes.users');
const { NotificatiolnsRoutes } = require('./routes.notifications');

const Routers = express.Router();

Routers.use("/users", UserRoutes)
Routers.use("/citations", CitationRouters)
Routers.use("/notifications", NotificatiolnsRoutes)

module.exports = {
    Routers
}