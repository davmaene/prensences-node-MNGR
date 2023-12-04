const { Response } = require("../helpers/helper.message.js");

const AccessValidator = async (req, res, next) => {
    const { apikey, accesskey } = req.headers;
    if(apikey && accesskey){
        if(1){

        }else return Response(res, 403, " Your don't have right access !")
    }else return Response(res, 403, " Your don't have right access !")
};

module.exports = {
    AccessValidator
};