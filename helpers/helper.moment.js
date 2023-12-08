const moment = require("moment");
moment.locale("fr");

const now = () => moment().format("L, LTS");
const momentNow = () => moment().format("LTS");
const nowInInix = () => moment().unix();
const unix = () => moment().unix();
const refdate = ({ iduser }) => {
    const unixTimestamp = moment(moment().format('L')).unix()
    return `${unixTimestamp}.${iduser}`;
}

module.exports = { now, nowInInix, momentNow, unix, refdate }