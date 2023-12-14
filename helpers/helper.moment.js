const moment = require("moment");
moment.locale("fr");

const now = () => moment().format("L, LTS");
const momentNow = () => moment().format("LTS");
const nowInInix = () => moment().unix();
const unix = () => moment().unix();

const unixToDate = ({ unix, format }) => {
    return moment.unix(unix).format(format)
};

const nextDue = ({ days }) => {
    return moment().add(parseInt(days), 'days').unix()
};

const prevDue = ({ days }) => {
    return moment().subtract(parseInt(days), 'days').unix()
};

const refdate = ({ iduser }) => {
    const n = moment().format('L').toString();
    const unixTimestamp = moment(n, "L").unix();
    console.log("========> Genrated data is ==> ", "Now ==> ", unixToDate({ unix: unixTimestamp }), "Next due ==> ", unixToDate({ unix: nextDue({ days: 1 }) }), "Prev due ==> ", unixToDate({ unix: prevDue({ days: 1 }) }));
    return `${unixTimestamp}.${iduser}`;
};

module.exports = { now, nowInInix, momentNow, unix, refdate, unixToDate, nextDue, prevDue }