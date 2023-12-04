var jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
    var token = req.headers['authorization'];

    if(token != undefined){
        token = token.split(' ')[1];
        
        let decoded = undefined
        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET_ADMIN);
            return next()
        } catch (error) {
        }

        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET_USER);
            return next()
        } catch (error) {
        }

        return res.sendStatus(403);
    }else{
        return res.sendStatus(403);
    }
}

