const jwt = require("jsonwebtoken");

const generateToken = (id) => { //it takes user id and return jwt made from id
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
};
module.exports = generateToken;