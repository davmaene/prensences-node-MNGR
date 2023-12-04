const express = require('express');
const { CitationRouters } = require('./routes.citations');
const { UserRoutes } = require('./routes.users');

const Routers = express.Router();

Routers.use("/users", UserRoutes )
Routers.use("/citations", CitationRouters )

module.exports = {
    Routers
}