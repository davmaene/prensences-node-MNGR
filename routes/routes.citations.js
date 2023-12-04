const express = require('express');
const { ControllerCitations } = require('../controllers/controlle.citations');

const CitationRouters = express.Router();
CitationRouters.get("/citation/byid/:id", ControllerCitations.getOneById)
CitationRouters.get("/list", ControllerCitations.listOfCitations)
CitationRouters.get("/random/citation", ControllerCitations.getOneRandomly)
CitationRouters.post("/citation/add", ControllerCitations.addNewCitation)

module.exports = { CitationRouters }