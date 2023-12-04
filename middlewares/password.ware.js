const bycrypt = require('bcrypt');

const passwordChecker = async ({ plainchaine, cryptedchaine }, cb) => {
   try {
    const varified = await bycrypt.compare(plainchaine, cryptedchaine);
    if(varified) cb(undefined, true)
    else cb(true, undefined)
   } catch (error) {
    cb(error, undefined)
   } 
};

const passwordCrypter = async ({ plainchaine, salt }) => {
    const hashedpassword = await bycrypt.hash(plainchaine, salt ? salt : 10);
    return hashedpassword;
};

module.exports = {
    passwordDecrypt: passwordChecker,
    passwordChecker,
    passwordCrypter
}