const moment = require("moment");
moment().startOf("day");
moment.locale("fr");

const now = () => moment().format("L, LTS");
const momentNow = () => moment().format("LTS");
const nowInInix = () => moment().unix();
const unix = () => moment().unix();
const refdate = ({ iduser }) => {
    const date = new Date();
    const m = date.getMonth();
    const d = date.getDate();
    const y = date.getFullYear();
    return `${d}.${m}.${y}.${iduser}`;
}

module.exports = { now, nowInInix, momentNow, unix, refdate }