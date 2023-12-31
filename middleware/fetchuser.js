const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next) => {
    // get the user from the jwt token and add id to red object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({console: "Please authenticate using valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch(error) {
        res.status(401).send({console: "Invalid token"})
    }
};

module.exports = fetchuser;