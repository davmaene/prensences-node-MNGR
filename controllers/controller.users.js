const { Users } = require("../models/model.users.js");
const dotenv = require('dotenv');
const { Response } = require("../helpers/helper.message.js");
const { passwordChecker, passwordCrypter } = require("../middlewares/password.ware.js");
const { fillphone } = require("../helpers/helper.fillphonenumber.js");
const { Op } = require("sequelize");
const { Service } = require("../services/service.presence.js");
const { Presences } = require("../models/model.presences.js");
const { unix, refdate, now } = require("../helpers/helper.moment.js");
// const { randomLongNumber } = require("../helpers/helper.random.js");
const { Text } = require("../helpers/helper.text.js");
const { randomLongNumber } = require("../helpers/helper.random.js");
const moment = require("moment");

dotenv.config();

const ControllerUsers = {

    login: async (req, res, next) => {
        const { email, password, phone } = req.body;
        if (!email || !password) return Response(res, 401, "This request must have at least !email || !password")
        try {
            Users.findOne({
                where: {
                    [Op.or]: [
                        { phone: fillphone({ phone: email }) },
                        { email: email.toString().toLowerCase() }
                    ]
                },
                // attributes: {
                //     exclude: ['password']
                // },
            })
                .then(user => {
                    if (user instanceof Users) {
                        passwordChecker({ plainchaine: password, cryptedchaine: user && user['password'] }, (err, verified) => {
                            if (verified) {
                                let __user = user.toJSON();
                                delete __user['password'];
                                return Response(res, 200, __user);
                            } else return Response(res, 203, "Invalides cridentials !")
                        })
                    } else {
                        return Response(res, 203, "Invalides cridentials !")
                    }
                })
                .catch(eer => {
                    return Response(res, 500, eer)
                })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    register: async (req, res, next) => {
        const { fsname, lsname, nickname, email, phone, password, idconfig, matricule } = req.body;
        if (!fsname || !lsname || !email || !phone || !password) return Response(res, 401, "this request must have at least !fsname || !lsname || !email || !phone || !password");

        const crytptedpassword = await passwordCrypter({ plainchaine: password, salt: 10 });

        try {
            Users.create(
                {
                    email: email.toString().toLowerCase(),
                    phone: fillphone({ phone }),
                    fsname,
                    lsname,
                    nickname: nickname ? nickname : process.env.APPESCAPESTRING,
                    password: crytptedpassword
                })
                .then(user => {
                    if (user instanceof Users) return Response(res, 200, user)
                    else return Response(res, 400, {})
                })
                .catch(err => {
                    return Response(res, 500, err)
                })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    onpoint: async (req, res, next) => {

        let { phone, id, idconfig, ref } = req.body;
        if (!id || !idconfig) return Response(res, 401, "This request must have at least !phone || !iduser")
        try {
            ref = (refdate({ iduser: id })) || ref || 0;
            const n = unix();

            const currentDate = moment(); // current date and time

            const _startOfTheDay = moment().startOf('day');
            const _endOfTheDay = moment().endOf('day');

            console.log("Generated ref is ===> ", ref);

            Presences.findOrCreate({
                defaults: {
                    idconfigs: idconfig,
                    iduser: id,
                    ref,
                    dayin: n,
                    createdon: now(),
                    updateon: now()
                },
                where: {
                    ref,
                    iduser: id,
                    // dayin: {
                    //     [Op.lte]: now
                    // }
                },
            })
                .then(([record, isnew]) => {
                    if (isnew) {
                        return Response(res, 200, record);
                    } else {
                        if (parseInt(record.dayclosed) === 1) {
                            return Response(res, 405, record)
                        } else {
                            if (currentDate.isSameOrBefore(_endOfTheDay)) {
                                record.update({
                                    appdecision: 1,
                                    dayout: n,
                                    dayclosed: 1,
                                    ellapsedtowork: parseInt(now) - parseInt(record.dayin),
                                    observation: `OK`
                                })
                                return Response(res, 200, record)
                            } else {
                                record.update({
                                    appdecision: 4,
                                    dayout: n,
                                    dayclosed: 1,
                                    ellapsedtowork: parseInt(now) - parseInt(record.dayin),
                                    observation: `OK`
                                })
                                return Response(res, 406, record)
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log('====================================');
                    console.log(err);
                    console.log('====================================');
                    return Response(res, 503, err)
                })

        } catch (error) {
            console.log(error);
            return Response(res, 500, error)
        }
    },

    gethistory: async (req, res, next) => {
        try {
            Presences.findAndCountAll({
                where: {
                    status: 1
                }
            })
                .then(({ count, rows }) => {
                    return Response(res, 200, { count, rows })
                })
                .catch(err => {
                    return Response(res, 500, err)
                })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    gethistorybyuser: async (req, res, next) => {
        const { id } = req.params;
        try {
            Presences.findAndCountAll({
                where: {
                    status: 1,
                    iduser: id
                }
            })
                .then(({ count, rows }) => {
                    return Response(res, 200, { count, rows })
                })
                .catch(err => {
                    return Response(res, 500, err)
                })
        } catch (error) {
            return Response(res, 500, error)
        }
    },

    verify: async (req, res, next) => {
        const { iduser, code, phone } = req.body;
        try {
            return Response(res, 200, req.body)
        } catch (error) {
            return Response(res, 500, error)
        }
    }
};

module.exports = {
    ControllerUsers
}