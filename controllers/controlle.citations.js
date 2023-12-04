const { Response } = require("../helpers/helper.message");
const { Citations } = require("../models/model.citation");
const Sequelize = require('sequelize');

ControllerCitations = {

    getOneById: async (req, res, next) => {
        const { id } = req.params;
        if (!id) return Response(res, 401, "this request must have at least id as param (idCitation)")
        try {
            await Citations.findOne({
                where: {
                    id,
                    status: 1
                }
            })
                .then((result) => {
                    if (result instanceof Citations) return Response(res, 200, result)
                    else return Response(res, 400, {})
                })
                .catch((err) => {
                    return Response(res, 400, err)
                });
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    getOneRandomly: async (req, res, next) => {
        try {
            await Citations.findOne({
                order: Sequelize.literal('rand()'),
                where: {
                    status: 1
                },
            })
                .then((result) => {
                    if (result instanceof Citations) return Response(res, 200, result)
                    else return Response(res, 400, {})
                })
                .catch((err) => {
                    return Response(res, 400, err)
                });
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    addNewCitation: async (req, res, next) => {
        const { citation, category } = req.body;
        try {
            Citations.create({
                citation,
                category
            })
                .then(cit => {
                    if (cit instanceof Citations) return Response(res, 200, cit);
                    else return Response(res, 400, cit)
                })
                .catch(err => {
                    console.log("Error ==> ", err);
                    return Response(res, 503, err)
                })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    listOfCitations: async (req, res, next) => {
        try {
            await Citations.findAndCountAll({
                // order: Sequelize.literal('rand()'),
                limit: 1000,
                where: {
                    status: 1
                },
            })
                .then(({ rows, count }) => {
                    return Response(res, 200, { rows, count })
                })
                .catch((err) => {
                    return Response(res, 400, err)
                });
        } catch (error) {
            return Response(res, 500, error)
        }
    }
}

module.exports = {
    ControllerCitations
}